import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Menu, X, Phone, MapPin, Clock, Code, ExternalLink } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEmergencyCall = () => {
    const confirmed = window.confirm('Call Emergency Services (108)?');
    if (confirmed) {
      window.location.href = 'tel:108';
    }
  };

  const scrollToSection = (sectionId: string) => {
    console.log(`Attempting to scroll to: ${sectionId}`);
    const element = document.getElementById(sectionId);
    if (element) {
      console.log(`Found element: ${sectionId}, scrolling...`);
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
      setIsMobileMenuOpen(false);
    } else {
      console.error(`Element with ID '${sectionId}' not found`);
      // If element not found, try alternative approach
      if (sectionId === 'search-section') {
        window.scrollTo({ top: 800, behavior: 'smooth' });
      } else if (sectionId === 'results-section') {
        window.scrollTo({ top: 1200, behavior: 'smooth' });
      } else if (sectionId === 'about-section') {
        window.scrollTo({ top: 2000, behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    }
  };

  const handleDeveloperContact = () => {
    window.location.href = 'mailto:devashishverma39@gmail.com';
  };

  const handleAboutClick = () => {
    console.log('About button clicked');
    scrollToSection('about-section');
  };

  const handleSearchClick = () => {
    console.log('Search button clicked');
    scrollToSection('search-section');
  };

  const handleResultsClick = () => {
    console.log('Results button clicked');
    scrollToSection('results-section');
  };

  const handleHomeClick = () => {
    console.log('Home button clicked');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-medium' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            onClick={handleHomeClick}
          >
            <div className="relative">
              <Heart className="h-8 w-8 text-primary-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">
                MedBed Finder
              </h1>
              <div className="flex items-center text-xs text-secondary-600 font-medium">
                <span>Real-time bed availability</span>
                <span className="mx-2">•</span>
                <Code className="h-3 w-3 mr-1" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeveloperContact();
                  }}
                  className="hover:text-primary-600 transition-colors duration-200"
                >
                  by Devashish Verma
                </button>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6 text-sm font-medium">
              <motion.button 
                onClick={handleHomeClick}
                className="text-secondary-700 hover:text-primary-600 transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Home
              </motion.button>
              <motion.button 
                onClick={handleSearchClick}
                className="text-secondary-700 hover:text-primary-600 transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Search
              </motion.button>
              <motion.button 
                onClick={handleResultsClick}
                className="text-secondary-700 hover:text-primary-600 transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Results
              </motion.button>
              <motion.button
                onClick={handleAboutClick}
                className="text-secondary-700 hover:text-primary-600 transition-colors duration-200 flex items-center"
                whileHover={{ y: -2 }}
              >
                About
              </motion.button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-secondary-600">
                <Clock className="h-4 w-4" />
                <span className="font-medium">24/7 Live</span>
              </div>
              <motion.button
                onClick={handleEmergencyCall}
                className="btn-primary text-sm px-4 py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="h-4 w-4 mr-2" />
                Emergency
              </motion.button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg text-secondary-700 hover:bg-secondary-100 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            height: isMobileMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md rounded-2xl mt-2 shadow-large"
        >
          <div className="px-4 py-6 space-y-4">
            <button 
              onClick={handleHomeClick}
              className="block w-full text-left text-secondary-700 hover:text-primary-600 font-medium"
            >
              Home
            </button>
            <button 
              onClick={handleSearchClick}
              className="block w-full text-left text-secondary-700 hover:text-primary-600 font-medium"
            >
              Search
            </button>
            <button 
              onClick={handleResultsClick}
              className="block w-full text-left text-secondary-700 hover:text-primary-600 font-medium"
            >
              Results
            </button>
            <button
              onClick={handleAboutClick}
              className="block w-full text-left text-secondary-700 hover:text-primary-600 font-medium flex items-center"
            >
              About Developer
            </button>
            <div className="pt-4 border-t border-secondary-200">
              <button
                onClick={handleEmergencyCall}
                className="btn-primary w-full text-center"
              >
                <Phone className="h-4 w-4 mr-2" />
                Emergency Helpline
              </button>
              <div className="mt-3 text-center text-xs text-secondary-500">
                <Code className="h-3 w-3 inline mr-1" />
                Developed by{' '}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeveloperContact();
                  }}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Devashish Verma
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}