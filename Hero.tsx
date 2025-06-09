import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Shield, Clock, MapPin, TrendingUp, Code, Heart, Phone } from 'lucide-react';

export function Hero() {
  const scrollToSearch = () => {
    const searchElement = document.getElementById('search-section');
    searchElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEmergencyCall = () => {
    const confirmed = window.confirm('Call Emergency Services (108)?');
    if (confirmed) {
      window.location.href = 'tel:108';
    }
  };

  const handleDeveloperContact = () => {
    window.location.href = 'mailto:devashishverma39@gmail.com';
  };

  const stats = [
    { icon: Shield, label: 'Verified Hospitals', value: '500+' },
    { icon: Clock, label: 'Real-time Updates', value: '24/7' },
    { icon: MapPin, label: 'Cities Covered', value: '50+' },
    { icon: TrendingUp, label: 'Lives Helped', value: '10K+' },
  ];

  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg"
          alt="Modern hospital corridor"
        />
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 bg-primary-400/20 rounded-full blur-2xl"
          animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg"
          animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/30"
          >
            <div className="w-2 h-2 bg-success-400 rounded-full mr-2 animate-pulse"></div>
            Live bed availability across India
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight"
          >
            Find Available{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-primary-300 to-primary-100 bg-clip-text text-transparent">
                Hospital Beds
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-300 to-primary-100 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              />
            </span>
            {' '}Near You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto font-medium leading-relaxed"
          >
            Real-time bed availability in government hospitals across India. 
            Get instant access to ICU, general, and oxygen-supported beds with verified data.
          </motion.p>

          {/* Developer Credit Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600/30 to-primary-700/30 backdrop-blur-sm rounded-full text-white/80 text-sm border border-primary-400/30"
          >
            <Code className="w-4 h-4 mr-2 text-primary-300" />
            <span>Developed by </span>
            <motion.button
              onClick={handleDeveloperContact}
              className="ml-1 font-semibold text-primary-200 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Devashish Verma
            </motion.button>
            <Heart className="w-4 h-4 ml-2 text-red-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={scrollToSearch}
              className="btn-primary text-lg px-8 py-4 shadow-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Find Beds Now
              <ArrowDown className="ml-2 h-5 w-5 animate-bounce-gentle" />
            </motion.button>
            
            <motion.button
              onClick={handleEmergencyCall}
              className="btn-secondary text-lg px-8 py-4 bg-error-600/90 backdrop-blur-sm border-error-400/30 text-white hover:bg-error-700/90"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="mr-2 h-5 w-5" />
              Emergency: 108
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              className="glass-effect rounded-2xl p-6 text-center border-white/20 cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <stat.icon className="h-8 w-8 text-primary-300 mx-auto mb-3" />
              <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/80 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToSearch}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}