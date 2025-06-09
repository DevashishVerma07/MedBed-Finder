import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Code, Mail, Github, Linkedin, Coffee, Star, 
  MapPin, Database, ArrowRight, ExternalLink
} from 'lucide-react';

export function About() {
  const handleContactDeveloper = () => {
    window.location.href = 'mailto:devashishverma39@gmail.com';
  };

  const handleViewGitHub = () => {
    window.open('https://github.com/devashishverma39', '_blank', 'noopener,noreferrer');
  };

  const handleViewLinkedIn = () => {
    window.open('https://linkedin.com/in/devashishverma39', '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="about-section" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full text-primary-700 text-sm font-medium mb-8 border border-primary-200"
          >
            <Heart className="w-5 h-5 mr-2 text-red-500" />
            About the Developer
            <Code className="w-5 h-5 ml-2 text-blue-500" />
          </motion.div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-secondary-900 mb-6">
            Meet the{' '}
            <span className="gradient-text">Developer</span>
          </h1>
          <p className="text-xl lg:text-2xl text-secondary-600 max-w-4xl mx-auto leading-relaxed">
            Built with passion for healthcare technology and commitment to saving lives through innovation.
          </p>
        </motion.div>

        {/* Developer Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-secondary-900 to-primary-900 rounded-3xl p-8 lg:p-16 text-white mb-16"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white/90 text-sm font-medium mb-6"
            >
              <Code className="w-4 h-4 mr-2" />
              Web Developer
              <Coffee className="w-4 h-4 ml-2" />
            </motion.div>
            
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Built with <span className="text-primary-300">Passion</span> for Healthcare
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Developer Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-40 h-40 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-primary-300/30">
                <span className="text-5xl font-bold text-white">DV</span>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border-2 border-dashed border-primary-300/30 rounded-full"
              />
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
            </motion.div>

            {/* Developer Info */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">Devashish Verma</h3>
              <p className="text-primary-200 text-xl font-medium mb-6">
               web Developer & Healthcare Technology Enthusiast
              </p>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                Passionate about leveraging technology to solve real-world healthcare challenges. 
                This project represents my commitment to making healthcare more accessible through 
                innovative web solutions and open-source development. With expertise in modern web 
                technologies and a deep understanding of healthcare needs, I've built MedBed Finder 
                to help save lives by connecting patients with available hospital beds in real-time.
              </p>

              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <motion.button
                  onClick={handleContactDeveloper}
                  className="btn-primary bg-white text-secondary-900 hover:bg-primary-50 text-lg px-8 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Developer
                </motion.button>
                <motion.button
                  onClick={handleViewGitHub}
                  className="btn-secondary border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="h-5 w-5 mr-2" />
                  View GitHub
                  <ExternalLink className="h-4 w-4 ml-1" />
                </motion.button>
              </div>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start space-x-6">
                <motion.button
                  onClick={handleViewGitHub}
                  className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title="GitHub Profile"
                >
                  <Github className="h-6 w-6" />
                </motion.button>
                <motion.button
                  onClick={handleViewLinkedIn}
                  className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title="LinkedIn Profile"
                >
                  <Linkedin className="h-6 w-6" />
                </motion.button>
                <motion.button
                  onClick={handleContactDeveloper}
                  className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title="Send Email"
                >
                  <Mail className="h-6 w-6" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Developer Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { label: 'APIs Integrated', value: '13+', icon: Database },
              { label: 'Cities Covered', value: '45+', icon: MapPin },
              { label: 'Technologies Used', value: '8+', icon: Code },
              { label: 'Coffee Consumed', value: '∞', icon: Coffee }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <stat.icon className="h-8 w-8 text-primary-300 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">Developer's Mission</h3>
              <p className="text-white/90 text-lg leading-relaxed max-w-3xl mx-auto">
                "To democratize healthcare access through technology. Every line of code in MedBed Finder 
                is written with the hope that it will help someone find the medical care they need when 
                they need it most. This project is my contribution to making healthcare more accessible 
                and efficient for everyone."
              </p>
              <div className="mt-6 flex items-center justify-center space-x-2 text-primary-300">
                <Heart className="h-5 w-5" />
                <span className="font-medium">Built with love for humanity</span>
                <Heart className="h-5 w-5" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-6">
            Ready to Find <span className="gradient-text">Available Beds</span>?
          </h2>
          <p className="text-lg text-secondary-600 mb-8 max-w-2xl mx-auto">
            Start searching for hospital beds in your city and get real-time availability information.
          </p>
          <motion.button
            onClick={() => {
              const searchElement = document.getElementById('search-section');
              if (searchElement) {
                searchElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-primary text-lg px-8 py-4"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Searching
            <ArrowRight className="h-5 w-5 ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}