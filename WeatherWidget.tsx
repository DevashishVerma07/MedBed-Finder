import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, RefreshCw, ExternalLink } from 'lucide-react';
import { getWeatherData, WeatherData } from '../services/apiService';

interface WeatherWidgetProps {
  city: string;
}

export function WeatherWidget({ city }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    if (!city) return;
    
    setLoading(true);
    const data = await getWeatherData(city);
    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const getWeatherIcon = (description: string) => {
    if (description.includes('rain')) return CloudRain;
    if (description.includes('cloud')) return Cloud;
    return Sun;
  };

  const handleRefreshWeather = () => {
    fetchWeather();
  };

  const openWeatherDetails = () => {
    if (weather) {
      const weatherUrl = `https://www.google.com/search?q=weather+${encodeURIComponent(weather.city)}`;
      window.open(weatherUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
        <div className="flex items-center justify-between mb-2">
          <div className="animate-pulse">
            <div className="h-4 bg-blue-200 rounded w-20 mb-2"></div>
            <div className="h-8 bg-blue-200 rounded w-16"></div>
          </div>
          <RefreshCw className="h-6 w-6 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const WeatherIcon = getWeatherIcon(weather.description);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-blue-900">Weather in {weather.city}</h3>
          <p className="text-xs text-blue-600 capitalize">{weather.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <WeatherIcon className="h-8 w-8 text-blue-600" />
          <div className="flex flex-col space-y-1">
            <motion.button
              onClick={handleRefreshWeather}
              className="p-1 rounded-lg bg-blue-200 hover:bg-blue-300 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Refresh weather"
            >
              <RefreshCw className="h-3 w-3 text-blue-700" />
            </motion.button>
            <motion.button
              onClick={openWeatherDetails}
              className="p-1 rounded-lg bg-blue-200 hover:bg-blue-300 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="View detailed weather"
            >
              <ExternalLink className="h-3 w-3 text-blue-700" />
            </motion.button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center">
          <Thermometer className="h-3 w-3 text-blue-500 mr-1" />
          <span className="text-blue-800 font-medium">{weather.temperature}°C</span>
        </div>
        <div className="flex items-center">
          <Droplets className="h-3 w-3 text-blue-500 mr-1" />
          <span className="text-blue-800">{weather.humidity}%</span>
        </div>
        <div className="flex items-center col-span-2">
          <Wind className="h-3 w-3 text-blue-500 mr-1" />
          <span className="text-blue-800">{weather.windSpeed} m/s</span>
        </div>
      </div>

      {/* Weather Actions */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <motion.button
          onClick={() => {
            const message = `Current weather in ${weather.city}: ${weather.temperature}°C, ${weather.description}. Humidity: ${weather.humidity}%, Wind: ${weather.windSpeed} m/s`;
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
          }}
          className="text-xs bg-blue-200 hover:bg-blue-300 text-blue-800 px-2 py-1 rounded transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Share Weather
        </motion.button>
        <motion.button
          onClick={openWeatherDetails}
          className="text-xs bg-blue-200 hover:bg-blue-300 text-blue-800 px-2 py-1 rounded transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Full Forecast
        </motion.button>
      </div>
    </motion.div>
  );
}