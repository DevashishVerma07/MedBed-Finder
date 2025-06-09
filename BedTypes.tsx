import React from 'react';
import { motion } from 'framer-motion';
import { Bed, Heart, Wind, Shield, Clock, Users } from 'lucide-react';

export function BedTypes() {
  const bedTypes = [
    {
      icon: Bed,
      title: 'General Beds',
      description: 'Standard hospital beds for patients requiring regular medical care and monitoring',
      features: ['24/7 Nursing Care', 'Basic Monitoring', 'Visitor Access'],
      color: 'primary',
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      icon: Heart,
      title: 'ICU Beds',
      description: 'Intensive Care Unit beds equipped with advanced life support systems',
      features: ['Advanced Monitoring', 'Life Support', 'Specialist Care'],
      color: 'error',
      gradient: 'from-error-500 to-error-600'
    },
    {
      icon: Wind,
      title: 'Oxygen-Supported',
      description: 'Specialized beds with integrated oxygen delivery systems for respiratory care',
      features: ['Oxygen Support', 'Respiratory Care', 'Pulse Monitoring'],
      color: 'success',
      gradient: 'from-success-500 to-success-600'
    }
  ];

  const stats = [
    { icon: Shield, label: 'Safety Standards', value: '100%' },
    { icon: Clock, label: 'Availability', value: '24/7' },
    { icon: Users, label: 'Patients Served', value: '50K+' }
  ];

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-6"
          >
            <Heart className="w-4 h-4 mr-2" />
            Quality Healthcare Services
          </motion.div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-secondary-900 mb-6">
            Types of{' '}
            <span className="gradient-text">Hospital Beds</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Understanding different bed types helps you find the right care for your medical needs
          </p>
        </motion.div>

        {/* Bed Types Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {bedTypes.map((bedType, index) => (
            <motion.div
              key={bedType.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="card p-8 text-center group"
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Icon */}
              <motion.div
                className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${bedType.gradient} flex items-center justify-center shadow-large`}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <bedType.icon className="h-10 w-10 text-white" />
              </motion.div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-secondary-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                {bedType.title}
              </h3>
              <p className="text-secondary-600 mb-6 leading-relaxed">
                {bedType.description}
              </p>

              {/* Features */}
              <div className="space-y-3">
                {bedType.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (index * 0.2) + (featureIndex * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center text-sm text-secondary-700"
                  >
                    <div className={`w-2 h-2 rounded-full bg-${bedType.color}-500 mr-3`} />
                    {feature}
                  </motion.div>
                ))}
              </div>

              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${bedType.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-secondary-900 mb-4">
              Our Commitment to{' '}
              <span className="gradient-text">Quality Care</span>
            </h3>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              We ensure all listed hospitals meet the highest standards of medical care and safety
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-soft flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-secondary-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-secondary-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}