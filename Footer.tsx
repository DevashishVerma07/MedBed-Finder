import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin, Clock, Shield, Github, Twitter, Linkedin, Code, Coffee, Star } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    'Quick Links': [
      { name: 'Find Beds', href: '#search-section', action: 'scroll' },
      { name: 'Emergency', href: 'tel:+91108', action: 'call' },
      { name: 'About Us', href: 'https://github.com/devashishverma39', action: 'external' },
      { name: 'Contact', href: 'mailto:devashishverma39@gmail.com', action: 'email' }
    ],
    'Resources': [
      { name: 'Hospital Directory', href: '#results-section', action: 'scroll' },
      { name: 'Health Tips', href: 'https://www.who.int/health-topics', action: 'external' },
      { name: 'Emergency Guide', href: 'tel:108', action: 'call' },
      { name: 'FAQ', href: '#search-section', action: 'scroll' }
    ],
    'Support': [
      { name: 'Help Center', href: 'mailto:devashishverma39@gmail.com', action: 'email' },
      { name: 'Privacy Policy', href: 'https://github.com/devashishverma39', action: 'external' },
      { name: 'Terms of Service', href: 'https://github.com/devashishverma39', action: 'external' },
      { name: 'Feedback', href: 'mailto:devashishverma39@gmail.com', action: 'email' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/devashishverma39', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/in/devashishverma39', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/devashishverma39', label: 'GitHub' }
  ];

  const handleLinkClick = (href: string, action: string) => {
    switch (action) {
      case 'scroll':
        const elementId = href.replace('#', '');
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        break;
      case 'call':
        if (href.includes('108')) {
          const confirmed = window.confirm('Call Emergency Services (108)?');
          if (confirmed) {
            window.location.href = href;
          }
        } else {
          window.location.href = href;
        }
        break;
      case 'email':
        window.location.href = href;
        break;
      case 'external':
        window.open(href, '_blank', 'noopener,noreferrer');
        break;
      default:
        window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <Heart className="h-8 w-8 text-primary-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-success-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold gradient-text">MedBed Finder</h3>
                  <p className="text-xs text-secondary-400 font-medium">Real-time bed availability</p>
                </div>
              </div>
              <p className="text-secondary-300 mb-6 leading-relaxed">
                Connecting patients with available hospital beds across India. 
                Real-time data, verified sources, saving lives every day.
              </p>
              
              {/* Emergency Contact */}
              <div className="bg-error-900/50 rounded-xl p-4 border border-error-800">
                <div className="flex items-center mb-2">
                  <Phone className="h-4 w-4 text-error-400 mr-2" />
                  <span className="text-sm font-semibold text-error-300">Emergency Helpline</span>
                </div>
                <button 
                  onClick={() => handleLinkClick('tel:108', 'call')}
                  className="text-lg font-bold text-white hover:text-error-300 transition-colors duration-200"
                >
                  108
                </button>
                <p className="text-xs text-error-400 mt-1">Available 24/7</p>
              </div>
            </motion.div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([title, links], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-white mb-6">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <motion.button
                        onClick={() => handleLinkClick(link.href, link.action)}
                        className="text-secondary-300 hover:text-primary-400 transition-colors duration-200 text-sm text-left"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.name}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Developer Spotlight Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-12 border-t border-secondary-800"
          id="about-section"
        >
          <div className="bg-gradient-to-r from-primary-900/30 to-secondary-800/30 rounded-2xl p-8 border border-primary-800/30">
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center px-4 py-2 bg-primary-900/50 rounded-full text-primary-300 text-sm font-medium mb-4 border border-primary-700/50"
              >
                <Code className="w-4 h-4 mr-2" />
                Developed with passion for healthcare
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-2xl lg:text-3xl font-bold text-white mb-4"
              >
                Meet the{' '}
                <span className="bg-gradient-to-r from-primary-300 to-primary-100 bg-clip-text text-transparent">
                  Developer
                </span>
              </motion.h3>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              {/* Developer Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-primary-400/30">
                  <span className="text-2xl font-bold text-white">DV</span>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 border-2 border-dashed border-primary-400/30 rounded-full"
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-white" />
                </div>
              </motion.div>

              {/* Developer Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <h4 className="text-xl font-bold text-white mb-2">Devashish Verma</h4>
                <p className="text-primary-300 font-medium mb-3">Web Developer & Healthcare Enthusiast</p>
                <div className="flex items-center justify-center lg:justify-start text-secondary-300 text-sm mb-4">
                  <Mail className="h-4 w-4 mr-2 text-primary-400" />
                  <button
                    onClick={() => handleLinkClick('mailto:devashishverma39@gmail.com', 'email')}
                    className="hover:text-primary-300 transition-colors duration-200"
                  >
                    devashishverma39@gmail.com
                  </button>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-xs text-secondary-400">
                  <Coffee className="h-3 w-3 text-amber-400" />
                  <span>Powered by coffee and passion for saving lives</span>
                </div>
              </motion.div>

              {/* Animated Code Snippet */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-secondary-900/80 rounded-lg p-4 border border-secondary-700 font-mono text-xs"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="ml-2 text-secondary-400">medbed-finder.js</span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 2, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="overflow-hidden"
                >
                  <div className="text-primary-300">
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-blue-300">mission</span> = {'{'}
                  </div>
                  <div className="text-secondary-300 ml-4">
                    goal: <span className="text-green-300">'Save Lives'</span>,
                  </div>
                  <div className="text-secondary-300 ml-4">
                    method: <span className="text-green-300">'Technology'</span>
                  </div>
                  <div className="text-primary-300">{'}'}</div>
                </motion.div>
              </motion.div>
            </div>

            {/* Achievement Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {[
                { label: 'APIs Integrated', value: '13+', icon: Code },
                { label: 'Cities Covered', value: '45+', icon: MapPin },
                { label: 'Free Sources', value: '100%', icon: Heart },
                { label: 'Coffee Consumed', value: '∞', icon: Coffee }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-3 bg-secondary-800/50 rounded-lg border border-secondary-700/50"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <stat.icon className="h-5 w-5 text-primary-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-secondary-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-8 border-t border-secondary-800"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: 'Verified Hospitals', value: '500+' },
              { icon: Clock, label: 'Real-time Updates', value: '24/7' },
              { icon: MapPin, label: 'Cities Covered', value: '50+' },
              { icon: Heart, label: 'Lives Helped', value: '10K+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <stat.icon className="h-6 w-6 text-primary-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-secondary-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-secondary-800">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <p className="text-secondary-400 text-sm">
                © 2025 MedBed Finder. Made with{' '}
                <Heart className="inline h-4 w-4 text-error-400 mx-1" />
                by{' '}
                <motion.button
                  onClick={() => handleLinkClick('mailto:devashishverma39@gmail.com', 'email')}
                  className="text-primary-400 font-semibold hover:text-primary-300 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Devashish Verma
                </motion.button>
                {' '}for India
              </p>
              <div className="flex items-center justify-center lg:justify-start mt-2 text-secondary-500 text-xs">
                <Mail className="h-3 w-3 mr-1" />
                <button
                  onClick={() => handleLinkClick('mailto:devashishverma39@gmail.com', 'email')}
                  className="hover:text-primary-400 transition-colors duration-200"
                >
                  devashishverma39@gmail.com
                </button>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex space-x-4"
            >
              {socialLinks.map((social) => (
                <motion.button
                  key={social.label}
                  onClick={() => handleLinkClick(social.href, 'external')}
                  className="w-10 h-10 bg-secondary-800 rounded-xl flex items-center justify-center text-secondary-400 hover:text-primary-400 hover:bg-secondary-700 transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}