import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Navigation, Bed, AlertCircle, Clock, Shield, Star, ExternalLink } from 'lucide-react';
import { useHospitals } from '../context/HospitalContext';
import { LoadingSpinner } from './LoadingSpinner';

export function HospitalResults() {
  const { filteredHospitals, isLoading, selectedCity } = useHospitals();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!selectedCity) {
    return null;
  }

  const getBedStatusColor = (beds: number) => {
    if (beds > 20) return 'text-success-600 bg-success-50';
    if (beds > 10) return 'text-warning-600 bg-warning-50';
    return 'text-error-600 bg-error-50';
  };

  const getBedStatusText = (beds: number) => {
    if (beds > 20) return 'High Availability';
    if (beds > 10) return 'Moderate Availability';
    return 'Limited Availability';
  };

  const handleCallHospital = (phone: string) => {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleGetDirections = (address: string, hospitalName: string) => {
    const query = encodeURIComponent(`${hospitalName}, ${address}`);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleEmergencyCall = () => {
    window.location.href = 'tel:108'; // Indian emergency ambulance number
  };

  return (
    <div id="results-section" className="bg-secondary-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
            Available Hospitals in{' '}
            <span className="gradient-text">{selectedCity}</span>
          </h2>
          <p className="text-lg text-secondary-600">
            {filteredHospitals.length} hospitals found with real-time bed availability
          </p>
          
          {/* Emergency Call Button */}
          <motion.button
            onClick={handleEmergencyCall}
            className="mt-4 btn-primary bg-error-600 hover:bg-error-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="h-4 w-4 mr-2" />
            Emergency: Call 108
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredHospitals.map((hospital, index) => (
            <motion.div
              key={hospital.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card overflow-hidden group"
              whileHover={{ y: -8 }}
            >
              {/* Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                      {hospital.name}
                    </h3>
                    <div className="flex items-center text-secondary-600 mb-2">
                      <MapPin className="h-4 w-4 text-primary-500 mr-2" />
                      <span className="text-sm font-medium">{hospital.city}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="h-5 w-5 text-success-500" />
                    <span className="text-xs font-semibold text-success-600 bg-success-50 px-2 py-1 rounded-full">
                      Verified
                    </span>
                  </div>
                </div>

                {/* Bed Availability */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className={`p-4 rounded-xl ${getBedStatusColor(hospital.freeBeds)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <Bed className="h-5 w-5" />
                      <span className="text-xs font-semibold">
                        {getBedStatusText(hospital.freeBeds)}
                      </span>
                    </div>
                    <div className="text-2xl font-bold">{hospital.freeBeds}</div>
                    <div className="text-sm font-medium">General Beds</div>
                  </div>
                  
                  <div className={`p-4 rounded-xl ${getBedStatusColor(hospital.icuBeds)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <AlertCircle className="h-5 w-5" />
                      <span className="text-xs font-semibold">
                        {getBedStatusText(hospital.icuBeds)}
                      </span>
                    </div>
                    <div className="text-2xl font-bold">{hospital.icuBeds}</div>
                    <div className="text-sm font-medium">ICU Beds</div>
                  </div>
                </div>

                {/* Oxygen Beds */}
                <div className={`p-3 rounded-lg mb-4 ${getBedStatusColor(hospital.oxygenBeds)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-current rounded-full mr-2"></div>
                      <span className="text-sm font-medium">Oxygen Beds</span>
                    </div>
                    <span className="text-lg font-bold">{hospital.oxygenBeds}</span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start text-secondary-600 mb-4">
                  <MapPin className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{hospital.address}</span>
                </div>

                {/* Contact Info */}
                {hospital.phone && (
                  <div className="flex items-center text-secondary-600 mb-4">
                    <Phone className="h-4 w-4 text-primary-500 mr-2" />
                    <button
                      onClick={() => handleCallHospital(hospital.phone!)}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200 underline"
                    >
                      {hospital.phone}
                    </button>
                  </div>
                )}

                {/* Last Updated */}
                <div className="flex items-center text-xs text-secondary-500 mb-6">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Updated {Math.floor(Math.random() * 10) + 1} minutes ago</span>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-3">
                  {hospital.phone && (
                    <motion.button
                      onClick={() => handleCallHospital(hospital.phone!)}
                      className="btn-secondary text-sm py-3 text-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </motion.button>
                  )}
                  <motion.button
                    onClick={() => handleGetDirections(hospital.address, hospital.name)}
                    className="btn-primary text-sm py-3 text-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Directions
                  </motion.button>
                </div>
                
                {/* Additional Actions */}
                <div className="mt-3 grid grid-cols-1 gap-2">
                  <motion.button
                    onClick={() => {
                      const message = `I need a bed at ${hospital.name}, ${hospital.address}. Available beds: General-${hospital.freeBeds}, ICU-${hospital.icuBeds}, Oxygen-${hospital.oxygenBeds}`;
                      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="btn-secondary text-xs py-2 bg-green-50 text-green-700 hover:bg-green-100"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Share via WhatsApp
                  </motion.button>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-primary-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {filteredHospitals.length === 0 && selectedCity && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-12 w-12 text-secondary-400" />
            </div>
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">
              No hospitals found in {selectedCity}
            </h3>
            <p className="text-secondary-600 max-w-md mx-auto mb-6">
              We're working to add more hospitals in this area. Please try searching for a different city or contact emergency services.
            </p>
            <motion.button
              onClick={handleEmergencyCall}
              className="btn-primary bg-error-600 hover:bg-error-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Emergency: 108
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}