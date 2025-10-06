import React from "react";

const HumanoidSection = () => {
  return (
    <section className="w-full py-8 sm:py-12 bg-white hover:bg-gray-50 transition-colors duration-500" id="about">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto opacity-0 animate-on-scroll">
        {/* Header with badge and line */}
        <div className="flex items-center gap-4 mb-8 sm:mb-12">
          <div className="pulse-chip hover:scale-105 transition-transform duration-300">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">🎓</span>
            <span>Education & Background</span>
          </div>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 group hover:-translate-y-2 hover:bg-gradient-to-br hover:from-blue-100 hover:to-indigo-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pulse-500 transition-colors duration-300">Current Education</h3>
              <p className="text-gray-700 mb-1 group-hover:text-gray-900 transition-colors duration-300"><strong>Bachelor of Technology in CSE-AI</strong></p>
              <p className="text-gray-600 mb-2 group-hover:text-gray-800 transition-colors duration-300">CBIT Proddatur, Andhra Pradesh (2022-Present)</p>
              <p className="text-pulse-600 font-medium group-hover:scale-110 transition-transform duration-300">GPA: 7.97 (up to 6th Semester)</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 group hover:-translate-y-2 hover:bg-gradient-to-br hover:from-green-100 hover:to-emerald-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pulse-500 transition-colors duration-300">Previous Education</h3>
              <p className="text-gray-700 mb-1 group-hover:text-gray-900 transition-colors duration-300"><strong>Pre-University Course</strong></p>
              <p className="text-gray-600 mb-2 group-hover:text-gray-800 transition-colors duration-300">RGUKT Srikakulam, Andhra Pradesh (2021-2022)</p>
              <p className="text-emerald-600 font-medium group-hover:scale-110 transition-transform duration-300">GPA: 7.6</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-amber-100 p-6 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 group hover:-translate-y-2 hover:bg-gradient-to-br hover:from-yellow-100 hover:to-amber-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pulse-500 transition-colors duration-300">Perfect Achievement</h3>
              <p className="text-gray-700 mb-1 group-hover:text-gray-900 transition-colors duration-300"><strong>SSC</strong></p>
              <p className="text-gray-600 mb-2 group-hover:text-gray-800 transition-colors duration-300">ZPHS Duvvur, Andhra Pradesh (2020)</p>
              <p className="text-amber-600 font-medium group-hover:scale-110 transition-transform duration-300">Perfect Score: 600/600</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 leading-tight hover:text-pulse-500 transition-colors duration-500 hover:scale-105 transform">
              Final-year Computer Science Student Specializing in 
              <span className="text-pulse-500"> Artificial Intelligence</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed hover:text-gray-900 transition-all duration-300 hover:scale-105">
              Currently pursuing my Bachelor's degree in Computer Science and Engineering with a specialization in AI. 
              My academic journey has been marked by consistent excellence and a deep passion for understanding 
              the intricacies of artificial intelligence and machine learning.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="text-center hover:scale-110 transition-transform duration-300 group">
                <div className="text-2xl font-bold text-pulse-500 group-hover:scale-125 transition-transform duration-300">7.97</div>
                <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Current GPA</div>
              </div>
              <div className="text-center hover:scale-110 transition-transform duration-300 group">
                <div className="text-2xl font-bold text-pulse-500 group-hover:scale-125 transition-transform duration-300">3+</div>
                <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Years of Study</div>
              </div>
              <div className="text-center hover:scale-110 transition-transform duration-300 group">
                <div className="text-2xl font-bold text-pulse-500 group-hover:scale-125 transition-transform duration-300">600/600</div>
                <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Perfect SSC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HumanoidSection;
