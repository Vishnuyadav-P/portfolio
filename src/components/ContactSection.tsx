
import React from "react";

const ContactSection = () => {
  return (
    <section id="contact" className="bg-white py-16">
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="pulse-chip">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">📧</span>
              <span>Get In Touch</span>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
              I'm always interested in discussing new opportunities, collaborations, 
              or just connecting with fellow developers and tech enthusiasts.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-pulse-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📧</span>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">Email</h3>
                  <a 
                    href="mailto:vishnuyadavpullagura@gmail.com" 
                    className="text-pulse-600 hover:text-pulse-700 transition-colors text-sm"
                  >
                    vishnuyadavpullagura@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-pulse-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💼</span>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">LinkedIn</h3>
                  <a 
                    href="https://linkedin.com/in/vishnu-pullagura" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pulse-600 hover:text-pulse-700 transition-colors text-sm"
                  >
                    linkedin.com/in/vishnu-pullagura
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-pulse-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">Status</h3>
                  <p className="text-gray-600 text-sm">Open to internship or job opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
