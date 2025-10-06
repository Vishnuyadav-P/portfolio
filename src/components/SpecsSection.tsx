
import React from "react";

const SpecsSection = () => {
  const skills = [
    {
      category: "Programming Languages",
      items: [
        { name: "Python", level: "Advanced", color: "bg-blue-500" },
        { name: "Java", level: "Intermediate", color: "bg-orange-500" },
        { name: "C", level: "Intermediate", color: "bg-gray-600" }
      ]
    },
    {
      category: "AI/ML Technologies",
      items: [
        { name: "Machine Learning", level: "Advanced", color: "bg-purple-500" },
        { name: "Computer Vision", level: "Advanced", color: "bg-indigo-500" },
        { name: "Data Analytics", level: "Advanced", color: "bg-green-500" }
      ]
    },
    {
      category: "Tools & Frameworks",
      items: [
        { name: "OpenCV", level: "Advanced", color: "bg-red-500" },
        { name: "PyTorch", level: "Intermediate", color: "bg-pink-500" },
        { name: "Tensorflow", level: "Intermediate", color: "bg-teal-500" }
      ]
    }
  ];

  return (
    <section className="w-full py-12 sm:py-16 bg-gray-50 hover:bg-gray-100 transition-colors duration-500" id="skills">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto opacity-0 animate-on-scroll">
        {/* Header with badge and line */}
        <div className="flex items-center gap-4 mb-8 sm:mb-16">
          <div className="pulse-chip hover:scale-105 transition-transform duration-300">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">💻</span>
            <span>Technical Skills</span>
          </div>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-4 hover:text-pulse-500 transition-colors duration-500 hover:scale-105 transform">
            Technical Expertise
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto hover:text-gray-800 transition-all duration-300 hover:scale-105">
            Proficient in multiple programming languages and cutting-edge AI/ML technologies, 
            with hands-on experience in computer vision and data analytics.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, groupIndex) => (
              <div key={groupIndex} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group hover:-translate-y-2 hover:bg-white/95">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center group-hover:text-pulse-500 transition-colors duration-300">
                  {skillGroup.category}
                </h3>
                <div className="space-y-4">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2 hover:scale-105 transition-transform duration-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800 group-hover:text-gray-900 transition-colors duration-200">{skill.name}</span>
                        <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200">{skill.level}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 group-hover:bg-gray-300 transition-colors duration-200">
                        <div 
                          className={`h-2 rounded-full ${skill.color} transition-all duration-1000 ease-out group-hover:scale-105`}
                          style={{ 
                            width: skill.level === 'Advanced' ? '90%' : '70%'
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group hover:-translate-y-2">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center group-hover:text-pulse-500 transition-colors duration-300">Additional Competencies</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 hover:scale-110 transition-all duration-300 group">
                <div className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-300">🐧</div>
                <div className="font-medium group-hover:text-pulse-500 transition-colors duration-300">Linux</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 hover:scale-110 transition-all duration-300 group">
                <div className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-300">🪟</div>
                <div className="font-medium group-hover:text-pulse-500 transition-colors duration-300">Windows</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 hover:scale-110 transition-all duration-300 group">
                <div className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-300">🌍</div>
                <div className="font-medium group-hover:text-pulse-500 transition-colors duration-300">Multilingual</div>
                <div className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Telugu, Hindi, English</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 hover:scale-110 transition-all duration-300 group">
                <div className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-300">🔧</div>
                <div className="font-medium group-hover:text-pulse-500 transition-colors duration-300">CLI Tools</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;
