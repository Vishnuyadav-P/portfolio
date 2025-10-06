
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Download } from "lucide-react";
import ProfileImage from "./ProfileImage";
import MouseTracker from "./MouseTracker";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleResumeClick = () => {
    // This will be used when resume PDF is added
    console.log("Resume clicked - PDF will be displayed here");
    window.open('/VishnuResume.pdf', '_blank');
  };
  
  useEffect(() => {
    if (isMobile) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll('.parallax');
      elements.forEach(el => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || '0.1');
        const yPos = -scrollY * speed;
        element.style.setProperty('--parallax-y', `${yPos}px`);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);
  
  return (
    <section 
      className="overflow-hidden relative section-transition bg-gradient-to-br from-blue-50 via-white to-purple-50" 
      id="hero" 
      style={{
        padding: isMobile ? '100px 12px 40px' : '120px 20px 60px'
      }}
    >
      <MouseTracker />
      
      {/* Floating AI elements in background */}
      <div className="absolute top-10 left-10 w-8 h-8 bg-blue-400/20 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-32 right-16 w-6 h-6 bg-purple-400/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-20 w-10 h-10 bg-cyan-400/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 right-10 w-4 h-4 bg-pink-400/20 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
      
      <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-pulse-gradient opacity-20 blur-3xl rounded-full animate-pulse-glow"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8 section-content-hover" ref={containerRef}>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <div 
              className="pulse-chip mb-3 sm:mb-6 opacity-0 animate-fade-in hover:scale-110 transition-all duration-300 hover:rotate-1" 
              style={{ animationDelay: "0.1s" }}
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2 animate-pulse">👋</span>
              <span>Welcome to my Portfolio</span>
            </div>
            
            <h1 
              className="section-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight opacity-0 animate-fade-in hover:text-pulse-500 transition-all duration-500 hover:scale-105" 
              style={{ animationDelay: "0.3s" }}
            >
              Vishnu Vardhan<br className="hidden sm:inline" />Pullagura
            </h1>
            
            <p 
              style={{ animationDelay: "0.5s" }} 
              className="section-subtitle mt-3 sm:mt-6 mb-4 sm:mb-8 leading-relaxed opacity-0 animate-fade-in text-gray-950 font-normal text-base sm:text-lg text-left hover:text-gray-700 transition-all duration-300 hover:scale-105"
            >
              AI/ML Developer & Data Scientist passionate about building intelligent solutions that automate processes and extract insights from data.
            </p>

            {/* Status Badge */}
            <div 
              className="pulse-chip mb-4 sm:mb-6 opacity-0 animate-fade-in hover:scale-110 transition-all duration-300 hover:rotate-1" 
              style={{ animationDelay: "0.6s" }}
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white mr-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </span>
              <span>Open to internships or job opportunities</span>
            </div>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.7s" }}
            >
              <a 
                href="#projects" 
                className="flex items-center justify-center group w-full sm:w-auto text-center hover:scale-110 hover:shadow-xl hover:rotate-1 transition-all duration-300" 
                style={{
                  backgroundColor: '#FE5C02',
                  borderRadius: '1440px',
                  boxSizing: 'border-box',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '14px',
                  lineHeight: '20px',
                  padding: '16px 24px',
                  border: '1px solid white',
                }}
              >
                View My Work
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2 group-hover:scale-125" />
              </a>
              <button 
                onClick={handleResumeClick}
                className="flex items-center justify-center group w-full sm:w-auto text-center bg-white text-gray-900 px-6 py-4 rounded-full border-2 border-gray-200 hover:border-pulse-500 hover:scale-110 hover:shadow-xl hover:-rotate-1 transition-all duration-300"
              >
                <Download className="mr-2 w-4 h-4 transition-transform group-hover:scale-125 group-hover:rotate-12" />
                Resume
              </button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative mt-6 lg:mt-0 flex justify-center items-center">
            <div className="relative transition-all duration-500 ease-out overflow-hidden hover:scale-105">
              <ProfileImage />
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-pulse-100/30 rounded-full blur-3xl -z-10 parallax animate-float" data-speed="0.05"></div>
    </section>
  );
};

export default Hero;
