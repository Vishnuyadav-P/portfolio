
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MouseTracker from "./MouseTracker";
      <MouseTracker />

const CertificatesSection = () => {
  const certificates = [
    {
      title: "Accenture Data Analytics Simulation",
      issuer: "Accenture North America",
      date: "September 2024",
      description: "Completed comprehensive simulation focused on data analytics and strategic decision-making",
      skills: ["Data Analysis", "PowerBI", "Statistical Modeling", "Client Communication"],
      icon: "🏆",
      imageSpace: true // Space for certificate image
    }
  ];

  const achievements = [
    {
      title: "3rd Prize in ProjectEXPO",
      description: "Secured third position in project exhibition conducted at CBIT Proddatur",
      year: "Engineers Day Celebration",
      institution: "CBIT Proddatur, Andhra Pradesh",
      icon: "🥉"
    },
    {
      title: "Perfect SSC Score",
      description: "Achieved perfect score of 600/600 in Secondary School Certificate",
      year: "2020",
      institution: "ZPHS Duvvur, Andhra Pradesh",
      icon: "🎯"
    },
    {
      title: "Consistent Academic Excellence",
      description: "Maintained strong GPA throughout academic journey",
      details: "Current GPA: 8.06 (BTech), Previous GPA: 7.6 (PUC)",
      icon: "📚"
    }
  ];

  return (
    <section className="w-full py-12 sm:py-16 bg-white hover:bg-gray-50 transition-colors duration-500" id="certificates">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto opacity-0 animate-on-scroll">
        <div className="flex items-center gap-4 mb-8 sm:mb-16">
          <div className="pulse-chip hover:scale-105 transition-transform duration-300">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">🏅</span>
            <span>Certificates & Achievements</span>
          </div>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-4 hover:text-pulse-500 transition-all duration-500 hover:scale-105 transform">
            Certificates & Achievements
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto hover:text-gray-800 transition-all duration-300 hover:scale-105">
            Recognition of my technical skills, academic excellence, and professional development.
          </p>
          
          <div className="space-y-12">
            {/* Certificates */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 hover:text-pulse-500 transition-colors duration-300">Certificates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert, index) => (
                  <Card key={index} className="hover:shadow-xl hover:scale-105 transition-all duration-300 group hover:-translate-y-2 hover:bg-white/95">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-2xl group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">{cert.icon}</div>
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-pulse-500 transition-colors duration-300">
                            {cert.title}
                          </CardTitle>
                          <div className="text-sm text-pulse-500 font-medium">{cert.issuer}</div>
                        </div>
                        <div className="text-sm text-gray-500">{cert.date}</div>
                      </div>
                      <CardDescription className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
                        {cert.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Space for certificate image */}
                      {cert.imageSpace && (
                        <div className="w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-pulse-300 transition-colors duration-300">
                          <div className="text-center text-gray-500">
                            <div className="text-2xl mb-2">📄</div>
                            <p className="text-sm">Certificate Image</p>
                            <p className="text-xs opacity-70">(To be added)</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium hover:bg-green-200 hover:scale-110 transition-all duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 hover:text-pulse-500 transition-colors duration-300">Academic Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="hover:shadow-xl hover:scale-105 transition-all duration-300 group hover:-translate-y-2 hover:bg-white/95">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-2xl group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">{achievement.icon}</div>
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-pulse-500 transition-colors duration-300">
                            {achievement.title}
                          </CardTitle>
                          {achievement.year && (
                            <div className="text-sm text-pulse-500 font-medium">{achievement.year}</div>
                          )}
                        </div>
                      </div>
                      <CardDescription className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
                        {achievement.description}
                      </CardDescription>
                    </CardHeader>
                    {(achievement.institution || achievement.details) && (
                      <CardContent>
                        <p className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200">
                          {achievement.institution || achievement.details}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
