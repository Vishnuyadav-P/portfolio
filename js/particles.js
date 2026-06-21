export function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Respect users who prefer reduced motion: render static particles instead of animating
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let pts = [];
  
  // Optimize count on mobile to improve performance
  const COUNT = window.innerWidth < 768 ? 35 : 80;

  // 3D Perspective settings
  const FOV = 300;
  let angleX = 0.0005;
  let angleY = 0.0008;
  let targetAngleX = 0.0005;
  let targetAngleY = 0.0008;

  // Helper to parse dynamic CSS variable hex colors to RGB
  function hexToRgb(hex) {
    if (!hex || typeof hex !== 'string') return { r: 245, g: 60, b: 39 };
    const cleanHex = hex.trim();
    if (!cleanHex.startsWith('#')) return { r: 245, g: 60, b: 39 };
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = cleanHex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 245, g: 60, b: 39 }; // Fallback to primary accent red
  }

  // Get accent color dynamically from root CSS variables with robust fallback
  let accentHex = '#f53c27';
  try {
    const computed = getComputedStyle(document.documentElement);
    if (computed) {
      const val = computed.getPropertyValue('--accent');
      if (val) accentHex = val.trim();
    }
  } catch (e) {
    console.warn('Error reading --accent CSS variable, using fallback:', e);
  }
  const rgb = hexToRgb(accentHex);

  // 3D Shape templates (local vertices relative to shape center)
  const SHAPES = {
    cube: {
      vertices: [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1],  [1, -1, 1],  [1, 1, 1],  [-1, 1, 1]
      ],
      faces: [
        [0, 1, 2, 3], // Back
        [4, 5, 6, 7], // Front
        [0, 1, 5, 4], // Bottom
        [2, 3, 7, 6], // Top
        [0, 3, 7, 4], // Left
        [1, 2, 6, 5]  // Right
      ],
      edges: [
        [0, 1], [1, 2], [2, 3], [3, 0], // Back face
        [4, 5], [5, 6], [6, 7], [7, 4], // Front face
        [0, 4], [1, 5], [2, 6], [3, 7]  // Connectors
      ]
    },
    tetrahedron: {
      vertices: [
        [1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]
      ],
      faces: [
        [0, 1, 2],
        [0, 2, 3],
        [0, 3, 1],
        [1, 2, 3]
      ],
      edges: [
        [0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]
      ]
    },
    octahedron: {
      vertices: [
        [0, 1, 0], [0, -1, 0],
        [1, 0, 0], [-1, 0, 0],
        [0, 0, 1], [0, 0, -1]
      ],
      faces: [
        [0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2],
        [1, 2, 4], [1, 4, 3], [1, 3, 5], [1, 5, 2]
      ],
      edges: [
        [0, 2], [0, 3], [0, 4], [0, 5],
        [1, 2], [1, 3], [1, 4], [1, 5],
        [2, 4], [4, 3], [3, 5], [5, 2]
      ]
    }
  };

  // Helper function to rotate a 3D point around local X, Y, Z axes
  function rotate3D(x, y, z, rx, ry, rz) {
    // X-axis rotation
    const cx = Math.cos(rx), sx = Math.sin(rx);
    const y1 = y * cx - z * sx;
    const z1 = z * cx + y * sx;

    // Y-axis rotation
    const cy = Math.cos(ry), sy = Math.sin(ry);
    const x2 = x * cy - z1 * sy;
    const z2 = z1 * cy + x * sy;

    // Z-axis rotation
    const cz = Math.cos(rz), sz = Math.sin(rz);
    const x3 = x2 * cz - y1 * sz;
    const y3 = y1 * cz + x2 * sz;

    return [x3, y3, z2];
  }

  function Pt() {
    // Initialize in 3D box centered at origin
    this.x = (Math.random() - 0.5) * canvas.width;
    this.y = (Math.random() - 0.5) * canvas.height;
    this.z = (Math.random() - 0.5) * 400;
    
    // Slow drifting velocities
    this.vx = (Math.random() - 0.5) * 0.15;
    this.vy = (Math.random() - 0.5) * 0.15;
    this.vz = (Math.random() - 0.5) * 0.15;
    
    // Local rotation angles
    this.rx = Math.random() * Math.PI * 2;
    this.ry = Math.random() * Math.PI * 2;
    this.rz = Math.random() * Math.PI * 2;
    
    // Local rotation velocities (making them spin on their own)
    this.rvx = (Math.random() - 0.5) * 0.02;
    this.rvy = (Math.random() - 0.5) * 0.02;
    this.rvz = (Math.random() - 0.5) * 0.02;
    
    // Dimensions
    this.size = Math.random() * 4.5 + 3.5; // size radius between 3.5 and 8.0 pixels
    this.baseO = Math.random() * 0.35 + 0.35; // Base opacity between 0.35 and 0.70
    
    // Random 3D shape assignment
    const shapes = ['cube', 'tetrahedron', 'octahedron'];
    this.shapeType = shapes[Math.floor(Math.random() * shapes.length)];
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. Draw connections between particles (Constellation network)
    for (let i = 0; i < pts.length; i++) {
      const ptA = pts[i];
      // Skip connections if offscreen
      if (ptA.projX < 0 || ptA.projX > canvas.width || ptA.projY < 0 || ptA.projY > canvas.height) continue;

      for (let j = i + 1; j < pts.length; j++) {
        const ptB = pts[j];

        // Calculate 3D distance
        const dx = ptA.x - ptB.x;
        const dy = ptA.y - ptB.y;
        const dz = ptA.z - ptB.z;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (d < 125) {
          const avgScale = (ptA.projScale + ptB.projScale) / 2;
          const alpha = (1 - d / 125) * 0.12 * avgScale;
          
          ctx.beginPath();
          ctx.moveTo(ptA.projX, ptA.projY);
          ctx.lineTo(ptB.projX, ptB.projY);
          ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
          ctx.lineWidth = 0.5 * avgScale;
          ctx.stroke();
        }
      }
    }

    // 2. Draw 3D shapes sorted by depth Z descending (far to near)
    const sortedPts = [...pts].sort((a, b) => b.z - a.z);
    
    sortedPts.forEach(p => {
      // Skip drawing if center is way offscreen
      if (p.projX < -50 || p.projX > canvas.width + 50 || p.projY < -50 || p.projY > canvas.height + 50) return;

      const template = SHAPES[p.shapeType];
      const projectedVertices = [];
      const worldVertices = [];

      // Calculate all vertex projections
      for (let v of template.vertices) {
        // Rotate vertex locally around particle center
        const [rx, ry, rz] = rotate3D(v[0], v[1], v[2], p.rx, p.ry, p.rz);
        
        // Offset by global particle center
        const wx = p.x + rx * p.size;
        const wy = p.y + ry * p.size;
        const wz = p.z + rz * p.size;
        
        worldVertices.push([wx, wy, wz]);

        // Perspective project
        const scale = FOV / (FOV + wz);
        const sx = canvas.width / 2 + wx * scale;
        const sy = canvas.height / 2 + wy * scale;

        projectedVertices.push({ sx, sy, scale, z: wz });
      }

      // Draw faces (with Painter's algorithm for internal depth)
      const facesWithDepth = template.faces.map(faceIndices => {
        const avgZ = faceIndices.reduce((sum, idx) => sum + worldVertices[idx][2], 0) / faceIndices.length;
        return { indices: faceIndices, z: avgZ };
      });
      facesWithDepth.sort((a, b) => b.z - a.z);

      facesWithDepth.forEach(face => {
        ctx.beginPath();
        const first = projectedVertices[face.indices[0]];
        ctx.moveTo(first.sx, first.sy);
        for (let k = 1; k < face.indices.length; k++) {
          const v = projectedVertices[face.indices[k]];
          ctx.lineTo(v.sx, v.sy);
        }
        ctx.closePath();

        // Fill faces semi-transparently to create a solid 3D feel
        const fillAlpha = p.baseO * p.projScale * 0.1;
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${fillAlpha})`;
        ctx.fill();
      });

      // Draw wireframe edges
      ctx.beginPath();
      template.edges.forEach(edge => {
        const vA = projectedVertices[edge[0]];
        const vB = projectedVertices[edge[1]];
        ctx.moveTo(vA.sx, vA.sy);
        ctx.lineTo(vB.sx, vB.sy);
      });
      const edgeAlpha = p.baseO * p.projScale * 0.4;
      ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${edgeAlpha})`;
      ctx.lineWidth = 0.7 * p.projScale;
      ctx.stroke();

      // Draw glowing vertices
      projectedVertices.forEach(v => {
        ctx.beginPath();
        ctx.arc(v.sx, v.sy, 1.2 * v.scale, 0, Math.PI * 2);
        const vertAlpha = p.baseO * v.scale * 0.8;
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${vertAlpha})`;
        ctx.fill();
      });
    });
  }

  function resize() {
    // Ensure we have a valid width and height, fallback to viewport fractions if not laid out
    const newWidth = canvas.offsetWidth || window.innerWidth / 2;
    const newHeight = canvas.offsetHeight || window.innerHeight;
    
    canvas.width = newWidth;
    canvas.height = newHeight;

    if (pts && pts.length > 0) {
      pts.forEach(p => {
        // Clamp positions to new bounds on window resize to avoid drifting offscreen
        if (Math.abs(p.x) > canvas.width / 2) p.x = (Math.random() - 0.5) * canvas.width;
        if (Math.abs(p.y) > canvas.height / 2) p.y = (Math.random() - 0.5) * canvas.height;
      });
      
      // If reduced motion is active, redraw statically upon resize
      if (isReducedMotion) {
        pts.forEach(p => {
          const scale = FOV / (FOV + p.z);
          p.projX = canvas.width / 2 + p.x * scale;
          p.projY = canvas.height / 2 + p.y * scale;
          p.projScale = scale;
        });
        render();
      }
    }
  }

  // Initial layout sizing
  resize();
  window.addEventListener('resize', resize);

  // Initialize particle positions after initial sizing
  for (let i = 0; i < COUNT; i++) pts.push(new Pt());

  function draw() {
    // Dynamically resize and redistribute particles if canvas layout changes
    if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
      resize();
    }
    
    // Smoothly interpolate rotation angles towards target (constellation field rotation)
    if (!isReducedMotion) {
      angleX += (targetAngleX - angleX) * 0.05;
      angleY += (targetAngleY - angleY) * 0.05;
    }

    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);

    // Update and project particles
    pts.forEach(p => {
      // 1. Apply drift velocities in 3D
      if (!isReducedMotion) {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        
        // Apply individual spin (rotating 3D particles)
        p.rx += p.rvx;
        p.ry += p.rvy;
        p.rz += p.rvz;
      }

      // 2. Rotate around X-axis (global field rotation)
      const y1 = p.y * cosX - p.z * sinX;
      const z1 = p.z * cosX + p.y * sinX;

      // 3. Rotate around Y-axis (global field rotation)
      const x2 = p.x * cosY - z1 * sinY;
      const z2 = z1 * cosY + p.x * sinY;

      p.x = x2;
      p.y = y1;
      p.z = z2;

      // 4. Boundary checks in 3D box (wrap around)
      const w = canvas.width / 2;
      const h = canvas.height / 2;
      
      if (p.x < -w) p.x = w;
      if (p.x > w) p.x = -w;
      if (p.y < -h) p.y = h;
      if (p.y > h) p.y = -h;
      if (p.z < -200) p.z = 200;
      if (p.z > 200) p.z = -200;

      // 5. Calculate center screen projection coordinates
      const scale = FOV / (FOV + p.z);
      p.projX = canvas.width / 2 + p.x * scale;
      p.projY = canvas.height / 2 + p.y * scale;
      p.projScale = scale;
    });

    render();

    if (!isReducedMotion) {
      requestAnimationFrame(draw);
    }
  }

  // Draw once for static display or start animation loop
  if (isReducedMotion) {
    pts.forEach(p => {
      const scale = FOV / (FOV + p.z);
      p.projX = canvas.width / 2 + p.x * scale;
      p.projY = canvas.height / 2 + p.y * scale;
      p.projScale = scale;
    });
    render();
  } else {
    draw();
  }

  const hero = document.getElementById('hero');
  if (hero && !isReducedMotion) {
    hero.addEventListener('mousemove', e => {
      // Mouse position controls rotation target speed/direction
      const dx = (e.clientX / window.innerWidth - 0.5);
      const dy = (e.clientY / window.innerHeight - 0.5);
      targetAngleY = dx * 0.015;
      targetAngleX = dy * 0.015;
    });
    
    // Slow down when mouse leaves
    hero.addEventListener('mouseleave', () => {
      targetAngleX = 0.0005;
      targetAngleY = 0.0008;
    });
  }
}
