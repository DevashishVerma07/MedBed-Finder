import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Ambulance, Shield, Flame, Heart, MapPin, Clock } from 'lucide-react';
import { getEmergencyServices, EmergencyService } from '../services/apiService';

interface EmergencyServicesProps {
  city: string;
}

export function EmergencyServices({ city }: EmergencyServicesProps) {
  const [services, setServices] = useState<EmergencyService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      if (!city) return;
      
      setLoading(true);
      const data = await getEmergencyServices(city);
      setServices(data);
      setLoading(false);
    };

    fetchServices();
  }, [city]);

  const getServiceIcon = (type: EmergencyService['type']) => {
    switch (type) {
      case 'ambulance': return Ambulance;
      case 'police': return Shield;
      case 'fire': return Flame;
      case 'medical': return Heart;
      default: return Phone;
    }
  };

  const getServiceColor = (type: EmergencyService['type']) => {
    switch (type) {
      case 'ambulance': return 'text-blue-600 bg-blue-50 hover:bg-blue-100';
      case 'police': return 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100';
      case 'fire': return 'text-red-600 bg-red-50 hover:bg-red-100';
      case 'medical': return 'text-green-600 bg-green-50 hover:bg-green-100';
      default: return 'text-gray-600 bg-gray-50 hover:bg-gray-100';
    }
  };

  const handleEmergencyCall = (phone: string, serviceName: string) => {
    // Confirm before calling emergency services
    const confirmed = window.confirm(`Call ${serviceName} at ${phone}?`);
    if (confirmed) {
      window.location.href = `tel:${phone}`;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Emergency Services</h3>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse bg-gray-100 rounded-lg p-3 h-16"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl p-6 shadow-soft"
    >
      <div className="flex items-center mb-4">
        <Phone className="h-5 w-5 text-error-600 mr-2" />
        <h3 className="text-lg font-semibold text-secondary-900">Emergency Services</h3>
      </div>
      
      <div className="flex items-center text-xs text-secondary-600 mb-4">
        <MapPin className="h-3 w-3 mr-1" />
        <span>{city}</span>
        <Clock className="h-3 w-3 ml-3 mr-1" />
        <span>24/7 Available</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {services.map((service, index) => {
          const ServiceIcon = getServiceIcon(service.type);
          const colorClass = getServiceColor(service.type);
          
          return (
            <motion.button
              key={service.phone}
              onClick={() => handleEmergencyCall(service.phone, service.name)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${colorClass} rounded-lg p-3 text-center transition-all duration-200 hover:shadow-md border border-transparent hover:border-current/20`}
            >
              <ServiceIcon className="h-6 w-6 mx-auto mb-1" />
              <div className="text-xs font-medium">{service.name}</div>
              <div className="text-lg font-bold">{service.phone}</div>
              {service.available && (
                <div className="text-xs opacity-75">Available Now</div>
              )}
            </motion.button>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
        <p className="text-xs text-red-800 text-center">
          <strong>Emergency:</strong> Call immediately for life-threatening situations
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <motion.button
          onClick={() => {
            const message = `Emergency in ${city}. Need immediate medical assistance.`;
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
          }}
          className="btn-secondary text-xs py-2 bg-green-50 text-green-700 hover:bg-green-100"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Share Location
        </motion.button>
        <motion.button
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                  window.open(mapsUrl, '_blank', 'noopener,noreferrer');
                },
                (error) => {
                  console.error('Geolocation error:', error);
                  alert('Unable to get your location. Please enable location services.');
                }
              );
            } else {
              alert('Geolocation is not supported by this browser.');
            }
          }}
          className="btn-secondary text-xs py-2 bg-blue-50 text-blue-700 hover:bg-blue-100"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          My Location
        </motion.button>
      </div>
    </motion.div>
  );
}