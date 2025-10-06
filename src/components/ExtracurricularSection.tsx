
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ExtracurricularSection = () => {
  const activities = [
    {
      title: "Event Organizer, AVINYA-2K25",
      role: "National Level Technical Symposium - Main Organizer",
      organization: "Chaitanya Bharathi Institute of Technology (CBIT), Proddatur",
      dates: "April 10–11, 2025",
      description: "Led the planning and execution of a two-day national-level tech symposium with over 1,200 participants",
      achievements: [
        "Orchestrated 11 technical and non-technical events, including workshops, competitions, and guest lectures",
        "Successfully executed large-scale event with zero major operational issues",
        "Increased participant engagement by 60% compared to previous editions",
        "Managed multidisciplinary team of volunteers, faculty, and industry partners"
      ],
      responsibilities: [
        "Venue setup and scheduling coordination",
        "Guest speaker invitations and resource allocation", 
        "Team leadership and volunteer management",
        "Budget and resource management"
      ],
      skills: ["Leadership", "Strategic Planning", "Project Execution", "Team Management", "Communication", "Budget Management"],
      impact: "Fostered culture of innovation and technical learning among students while strengthening institute's reputation as hub for tech events",
      icon: "🎯"
    },
    {
      title: "Technical Leadership & Community Building",
      role: "Strategy and Tool Researcher at NEXUS Swarm",
      organization: "Student Community",
      description: "Led technical initiatives and community building efforts in student community",
      achievements: [
        "Led Git and open-source contribution workshop (100+ attendees)",
        "Organized personal branding for developers seminar (200+ attendees)",
        "Enhanced team performance through strategic initiatives",
        "Facilitated knowledge sharing across the community"
      ],
      skills: ["Leadership", "Workshop Design", "Community Building", "Technical Mentoring"],
      impact: "Enhanced technical skills development across student community",
      icon: "🚀"
    }
  ];

  return (
    <section className="w-full py-12 sm:py-16 bg-gray-50 hover:bg-gray-100 transition-colors duration-500" id="extracurricular">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto opacity-0 animate-on-scroll">
        <div className="flex items-center gap-4 mb-8 sm:mb-16">
          <div className="pulse-chip hover:scale-105 transition-transform duration-300">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">🎯</span>
            <span>Leadership & Activities</span>
          </div>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-4 hover:text-pulse-500 transition-colors duration-500 hover:scale-105 transform">
            Extracurricular Activities
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto hover:text-gray-800 transition-all duration-300 hover:scale-105">
            Leadership roles and community contributions that showcase my commitment to 
            knowledge sharing and team development.
          </p>
          
          <div className="grid grid-cols-1 gap-8">
            {activities.map((activity, index) => (
              <Card key={index} className="hover:shadow-xl hover:scale-105 transition-all duration-300 group hover:-translate-y-2 hover:bg-white/95">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">{activity.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900 leading-tight group-hover:text-pulse-500 transition-colors duration-300">
                        {activity.title}
                      </CardTitle>
                      <div className="text-sm text-pulse-500 font-medium mt-1">{activity.role}</div>
                      {activity.organization && (
                        <div className="text-sm text-gray-600 mt-1">{activity.organization}</div>
                      )}
                      {activity.dates && (
                        <div className="text-sm text-gray-500 font-medium mt-1">{activity.dates}</div>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                    {activity.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-pulse-600 transition-colors duration-300">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {activity.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 hover:translate-x-2">
                          <span className="text-pulse-500 mr-2 mt-1 group-hover:scale-125 transition-transform duration-300">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {activity.responsibilities && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-pulse-600 transition-colors duration-300">Key Responsibilities:</h4>
                      <ul className="space-y-2">
                        {activity.responsibilities.map((responsibility, respIndex) => (
                          <li key={respIndex} className="flex items-start text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 hover:translate-x-2">
                            <span className="text-pulse-500 mr-2 mt-1 group-hover:scale-125 transition-transform duration-300">•</span>
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-pulse-600 transition-colors duration-300">Skills Developed:</h4>
                    <div className="flex flex-wrap gap-2">
                      {activity.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="px-3 py-1 bg-pulse-100 text-pulse-700 rounded-full text-sm font-medium hover:bg-pulse-200 hover:scale-110 transition-all duration-200 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 group-hover:border-pulse-200 transition-colors duration-300">
                    <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-pulse-600 transition-colors duration-300">Impact:</h4>
                    <p className="text-sm text-gray-700 italic hover:text-gray-900 transition-colors duration-200">{activity.impact}</p>
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

export default ExtracurricularSection;
