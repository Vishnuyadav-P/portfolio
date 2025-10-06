
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Automatic Attendance System",
      description: "Designed and implemented an automated attendance system using facial recognition technology for student tracking",
      technologies: ["Python", "OpenCV", "face_recognition", "CSV"],
      features: [
        "Real-time video processing",
        "Facial data detection and matching", 
        "Structured data management",
        "User-friendly CLI interface"
      ],
      impact: "Reduced administrative workload by 50% through automation",
      icon: "👤"
    },
    {
      title: "Accenture Data Analytics Simulation",
      description: "Completed simulation focused on advising a social media client as a Data Analyst",
      technologies: ["Data Analysis", "PowerBI", "Excel", "Statistical Modeling"],
      features: [
        "Cleaned and modeled 7 datasets",
        "Uncovered content trends insights",
        "Created PowerPoint presentation",
        "Delivered video presentation"
      ],
      impact: "Demonstrated strategic decision-making skills through data-driven insights",
      icon: "📊",
      date: "September 2024"
    }
  ];

  return (
    <section className="w-full py-12 sm:py-16 bg-white hover:bg-gray-50 transition-colors duration-500" id="projects">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto opacity-0 animate-on-scroll">
        {/* Header with badge and line */}
        <div className="flex items-center gap-4 mb-8 sm:mb-16">
          <div className="pulse-chip hover:scale-105 transition-transform duration-300">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">🛠️</span>
            <span>Key Projects</span>
          </div>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-4 hover:text-pulse-500 transition-colors duration-500 hover:scale-105 transform">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto hover:text-gray-800 transition-all duration-300 hover:scale-105">
            A showcase of my technical expertise through practical applications in AI/ML, 
            data analytics, and automated solutions.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="h-full hover:shadow-xl hover:scale-105 transition-all duration-300 group hover:-translate-y-2 hover:bg-white/95">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">{project.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900 leading-tight group-hover:text-pulse-500 transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                      {project.date && (
                        <div className="text-sm text-pulse-500 font-medium mt-1">{project.date}</div>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-pulse-600 transition-colors duration-300">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-pulse-100 text-pulse-700 rounded-full text-sm font-medium hover:bg-pulse-200 hover:scale-110 transition-all duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-pulse-600 transition-colors duration-300">Key Features:</h4>
                    <ul className="space-y-1">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 hover:translate-x-2">
                          <span className="text-pulse-500 mr-2 mt-1 group-hover:scale-125 transition-transform duration-300">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 group-hover:border-pulse-200 transition-colors duration-300">
                    <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-pulse-600 transition-colors duration-300">Impact:</h4>
                    <p className="text-sm text-gray-700 italic hover:text-gray-900 transition-colors duration-200">{project.impact}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
