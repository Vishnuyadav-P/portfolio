export function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Respect users who prefer reduced motion: render static particles instead of animating
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let pts = [];
  
  // Optimize count: AI/ML structures are detailed, so lower count looks cleaner and prevents overcrowding
  const COUNT = window.innerWidth < 768 ? 12 : 25;

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

  // 3D AI & Machine Learning structures
  const SHAPES = {
    neural_network: {
      vertices: [
        // Input Layer (0, 1, 2)
        [-1.2, -0.8, 0], [-1.2, 0, 0], [-1.2, 0.8, 0],
        // Hidden Layer (3, 4, 5, 6)
        [0, -1.0, -0.5], [0, -0.3, 0.5], [0, 0.3, -0.5], [0, 1.0, 0.5],
        // Output Layer (7, 8)
        [1.2, -0.5, 0], [1.2, 0.5, 0]
      ],
      faces: [],
      edges: [
        // Input to Hidden
        [0, 3], [0, 4], [0, 5], [0, 6],
        [1, 3], [1, 4], [1, 5], [1, 6],
        [2, 3], [2, 4], [2, 5], [2, 6],
        // Hidden to Output
        [3, 7], [3, 8],
        [4, 7], [4, 8],
        [5, 7], [5, 8],
        [6, 7], [6, 8]
      ]
    },
    decision_tree: {
      vertices: [
        // Root Node (0)
        [0, -1.2, 0],
        // Level 1 Nodes (1, 2)
        [-0.7, -0.2, 0], [0.7, -0.2, 0],
        // Level 2 Leaves (3, 4, 5, 6)
        [-1.2, 0.8, -0.4], [-0.3, 0.8, 0.4], [0.3, 0.8, -0.4], [1.2, 0.8, 0.4]
      ],
      faces: [],
      edges: [
        [0, 1], [0, 2],
        [1, 3], [1, 4],
        [2, 5], [2, 6]
      ]
    },
    knn_cluster: {
      vertices: [
        // Query Instance Center (0)
        [0, 0, 0],
        // Neighbor Points (1 to 6)
        [-0.9, -0.8, 0.5],
        [0.8, -0.9, -0.6],
        [-0.7, 0.9, -0.7],
        [0.9, 0.7, 0.6],
        [0.1, 1.0, 0.8],
        [-1.0, 0.1, -0.4]
      ],
      faces: [],
      edges: [
        [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]
      ]
    },
    svm_hyperplane: {
      vertices: [
        // SVM Boundary Bounding Box (0 to 7)
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1],  [1, -1, 1],  [1, 1, 1],  [-1, 1, 1],
        // Separating Hyperplane Plane (8 to 11)
        [-1, -0.5, -1], [1, -0.5, -1], [1, 0.5, 1], [-1, 0.5, 1],
        // Support Vectors / Classification Points (12, 13)
        [-0.4, -0.8, 0.2], [0.4, 0.8, -0.2]
      ],
      faces: [
        [8, 9, 10, 11] // Separating plane
      ],
      edges: [
        // Box Outline
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
        // Hyperplane Outline
        [8, 9], [9, 10], [10, 11], [11, 8]
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
    this.vx = (Math.random() - 0.5) * 0.12;
    this.vy = (Math.random() - 0.5) * 0.12;
    this.vz = (Math.random() - 0.5) * 0.12;
    
    // Local rotation angles
    this.rx = Math.random() * Math.PI * 2;
    this.ry = Math.random() * Math.PI * 2;
    this.rz = Math.random() * Math.PI * 2;
    
    // Local rotation velocities (making them spin on their own)
    this.rvx = (Math.random() - 0.5) * 0.015;
    this.rvy = (Math.random() - 0.5) * 0.015;
    this.rvz = (Math.random() - 0.5) * 0.015;
    
    // Dimensions
    this.size = Math.random() * 5 + 12; // Size scale between 12 and 17 pixels (for visibility of detail)
    this.baseO = Math.random() * 0.35 + 0.4; // Base opacity between 0.4 and 0.75
    
    // Random AI/ML structure assignment
    const shapes = ['neural_network', 'decision_tree', 'knn_cluster', 'svm_hyperplane'];
    this.shapeType = shapes[Math.floor(Math.random() * shapes.length)];
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. Draw connections between particle centers (Constellation data network)
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

        if (d < 160) {
          const avgScale = (ptA.projScale + ptB.projScale) / 2;
          const alpha = (1 - d / 160) * 0.08 * avgScale;
          
          ctx.beginPath();
          ctx.moveTo(ptA.projX, ptA.projY);
          ctx.lineTo(ptB.projX, ptB.projY);
          ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
          ctx.lineWidth = 0.4 * avgScale;
          ctx.stroke();
        }
      }
    }

    // 2. Draw 3D structures sorted by depth Z descending (far to near)
    const sortedPts = [...pts].sort((a, b) => b.z - a.z);
    
    sortedPts.forEach(p => {
      // Skip drawing if center is way offscreen
      if (p.projX < -60 || p.projX > canvas.width + 60 || p.projY < -60 || p.projY > canvas.height + 60) return;

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

      // Draw faces (translucent plane fills, like in SVM)
      if (template.faces && template.faces.length > 0) {
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

          // Soft translucent fill for separating hyperplane
          const fillAlpha = p.baseO * p.projScale * 0.15;
          ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${fillAlpha})`;
          ctx.fill();
        });
      }

      // Draw wireframe edges
      ctx.beginPath();
      template.edges.forEach(edge => {
        const vA = projectedVertices[edge[0]];
        const vB = projectedVertices[edge[1]];
        ctx.moveTo(vA.sx, vA.sy);
        ctx.lineTo(vB.sx, vB.sy);
      });
      const edgeAlpha = p.baseO * p.projScale * 0.35;
      ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${edgeAlpha})`;
      ctx.lineWidth = 0.65 * p.projScale;
      ctx.stroke();

      // Draw glowing vertices (nodes)
      projectedVertices.forEach((v, index) => {
        ctx.beginPath();
        
        // SVM Support Vectors (indices 12 and 13) are emphasized
        const isSvmVector = (p.shapeType === 'svm_hyperplane' && index >= 12);
        const radius = isSvmVector ? 2.5 * v.scale : 1.2 * v.scale;
        
        ctx.arc(v.sx, v.sy, radius, 0, Math.PI * 2);
        
        let vertAlpha = p.baseO * v.scale * 0.8;
        if (isSvmVector) {
          vertAlpha = p.baseO * v.scale * 1.0;
          if (index === 12) {
            ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${vertAlpha})`; // Accent Red support vector
          } else {
            ctx.fillStyle = `rgba(38,198,218,${vertAlpha})`; // Cyan-blue support vector
          }
        } else {
          ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${vertAlpha})`;
        }
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
      targetAngleY = dx * 0.012;
      targetAngleX = dy * 0.012;
    });
    
    // Slow down when mouse leaves
    hero.addEventListener('mouseleave', () => {
      targetAngleX = 0.0005;
      targetAngleY = 0.0008;
    });
  }
}
