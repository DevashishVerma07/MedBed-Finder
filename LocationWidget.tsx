import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Loader, ExternalLink, RefreshCw } from 'lucide-react';
import { getUserLocation, LocationData } from '../services/apiService';

interface LocationWidgetProps {
  onLocationDetected?: (location: LocationData) => void;
}

export function LocationWidget({ onLocationDetected }: LocationWidgetProps) {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectLocation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Try browser geolocation first
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            // Use IP-based location as fallback with coordinates
            const locationData = await getUserLocation();
            if (locationData) {
              const updatedLocation = {
                ...locationData,
                latitude,
                longitude
              };
              setLocation(updatedLocation);
              onLocationDetected?.(updatedLocation);
            }
            setLoading(false);
          },
          async (error) => {
            console.warn('Geolocation error:', error);
            // Fallback to IP-based location
            const locationData = await getUserLocation();
            setLocation(locationData);
            if (locationData) {
              onLocationDetected?.(locationData);
            }
            setLoading(false);
          }
        );
      } else {
        // Fallback to IP-based location
        const locationData = await getUserLocation();
        setLocation(locationData);
        if (locationData) {
          onLocationDetected?.(locationData);
        }
        setLoading(false);
      }
    } catch (err) {
      setError('Unable to detect location');
      setLoading(false);
    }
  };

  const openInMaps = () => {
    if (location) {
      const mapsUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
      window.open(mapsUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const shareLocation = () => {
    if (location) {
      const message = `My current location: ${location.city}, ${location.state}, ${location.country}. Coordinates: ${location.latitude}, ${location.longitude}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Auto-detect location on component mount
  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <MapPin className="h-4 w-4 text-green-600 mr-2" />
          <h3 className="text-sm font-semibold text-green-900">Your Location</h3>
        </div>
        <div className="flex space-x-1">
          <motion.button
            onClick={detectLocation}
            disabled={loading}
            className="p-1 rounded-lg bg-green-200 hover:bg-green-300 transition-colors duration-200 disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Refresh location"
          >
            {loading ? (
              <Loader className="h-4 w-4 text-green-700 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 text-green-700" />
            )}
          </motion.button>
          {location && (
            <motion.button
              onClick={openInMaps}
              className="p-1 rounded-lg bg-green-200 hover:bg-green-300 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Open in maps"
            >
              <Navigation className="h-4 w-4 text-green-700" />
            </motion.button>
          )}
        </div>
      </div>
      
      {location ? (
        <div className="text-xs text-green-800">
          <div className="font-medium">{location.city}, {location.state}</div>
          <div className="opacity-75">{location.country}</div>
          <div className="opacity-75 mt-1">{location.timezone}</div>
          <div className="opacity-75 text-xs mt-1">
            {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </div>
          
          {/* Action Buttons */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <motion.button
              onClick={shareLocation}
              className="text-xs bg-green-200 hover:bg-green-300 text-green-800 px-2 py-1 rounded transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="h-3 w-3 inline mr-1" />
              Share
            </motion.button>
            <motion.button
              onClick={openInMaps}
              className="text-xs bg-green-200 hover:bg-green-300 text-green-800 px-2 py-1 rounded transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MapPin className="h-3 w-3 inline mr-1" />
              Maps
            </motion.button>
          </div>
        </div>
      ) : error ? (
        <div className="text-xs text-red-600">{error}</div>
      ) : (
        <div className="text-xs text-green-600">
          {loading ? 'Detecting your location...' : 'Click refresh to detect your location'}
        </div>
      )}
    </motion.div>
  );
}