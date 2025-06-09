import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, MapPin, Filter, Zap, RefreshCw } from 'lucide-react';
import { useHospitals } from '../context/HospitalContext';
import { getIndianCities } from '../services/hospitalDataService';
import type { City } from '../types/Hospital';

export function Search() {
  const { selectedCity, setSelectedCity, filteredHospitals, isLoading, refreshHospitalData } = useHospitals();
  const [isSearching, setIsSearching] = useState(false);
  const [availableCities, setAvailableCities] = useState<string[]>([
    'Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad', 'Jaipur'
  ]);

  // Load more cities from free API
  useEffect(() => {
    const loadCities = async () => {
      try {
        const cities = await getIndianCities();
        setAvailableCities(cities);
      } catch (error) {
        console.error('Error loading cities:', error);
      }
    };
    loadCities();
  }, []);

  const handleSearch = async () => {
    if (!selectedCity) {
      alert('Please select a city first');
      return;
    }

    console.log(`Searching for hospitals in ${selectedCity}...`);
    setIsSearching(true);
    
    try {
      // Refresh hospital data for the selected city
      await refreshHospitalData();
      
      // Simulate search delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Search completed, scrolling to results...');
      
      // Scroll to results with a small delay to ensure content is rendered
      setTimeout(() => {
        const resultsElement = document.getElementById('results-section');
        if (resultsElement) {
          console.log('Found results section, scrolling...');
          resultsElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        } else {
          console.error('Results section not found, using fallback scroll');
          // Fallback scroll
          window.scrollTo({ top: 1200, behavior: 'smooth' });
        }
      }, 100);
      
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching for hospitals. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleRefresh = async () => {
    if (selectedCity) {
      console.log(`Refreshing data for ${selectedCity}...`);
      await refreshHospitalData();
    }
  };

  const handleCityChange = (city: string) => {
    console.log(`City changed to: ${city}`);
    setSelectedCity(city as City);
    // Auto-search when city is selected (with delay)
    if (city) {
      setTimeout(() => {
        handleSearch();
      }, 500);
    }
  };

  return (
    <div id="search-section" className="relative py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-6"
          >
            <Zap className="w-4 h-4 mr-2" />
            Real-time data from OpenStreetMap & verified sources
          </motion.div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-secondary-900 mb-4">
            Search for Available{' '}
            <span className="gradient-text">Hospital Beds</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Select your city to find real-time bed availability from multiple free data sources including OpenStreetMap
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="card p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* City Selection */}
              <div className="flex-grow">
                <label className="block text-sm font-semibold text-secondary-700 mb-3">
                  <MapPin className="inline w-4 h-4 mr-2" />
                  Select City ({availableCities.length} cities available)
                </label>
                <motion.select
                  value={selectedCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="block w-full px-4 py-4 text-lg border-2 border-secondary-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 rounded-xl shadow-soft transition-all duration-200 bg-white"
                  whileFocus={{ scale: 1.02 }}
                >
                  <option value="">Choose your city...</option>
                  {availableCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </motion.select>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col justify-end gap-3">
                <motion.button
                  onClick={handleSearch}
                  disabled={!selectedCity || isSearching}
                  className={`btn-primary text-lg px-8 py-4 min-w-[160px] ${
                    !selectedCity ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  whileHover={selectedCity ? { scale: 1.05, y: -2 } : {}}
                  whileTap={selectedCity ? { scale: 0.95 } : {}}
                >
                  {isSearching ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <SearchIcon className="h-5 w-5 mr-2" />
                  )}
                  {isSearching ? 'Searching...' : 'Search Beds'}
                </motion.button>

                {selectedCity && (
                  <motion.button
                    onClick={handleRefresh}
                    disabled={isLoading}
                    className="btn-secondary text-sm px-6 py-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    {isLoading ? 'Updating...' : 'Refresh Data'}
                  </motion.button>
                )}
              </div>
            </div>

            {/* Data Sources Info */}
            {selectedCity && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
                className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200"
              >
                <div className="text-sm text-blue-800">
                  <strong>Data Sources:</strong> OpenStreetMap, Government databases, Verified hospital directories
                  <br />
                  <span className="text-blue-600">Real-time updates from multiple free APIs</span>
                </div>
              </motion.div>
            )}

            {/* Quick Stats */}
            {selectedCity && filteredHospitals.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
                className="mt-8 pt-8 border-t border-secondary-200"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-success-50 rounded-xl">
                    <div className="text-2xl font-bold text-success-600">
                      {filteredHospitals.reduce((sum, h) => sum + h.freeBeds, 0)}
                    </div>
                    <div className="text-sm text-success-700 font-medium">Available Beds</div>
                  </div>
                  <div className="text-center p-4 bg-primary-50 rounded-xl">
                    <div className="text-2xl font-bold text-primary-600">
                      {filteredHospitals.reduce((sum, h) => sum + h.icuBeds, 0)}
                    </div>
                    <div className="text-sm text-primary-700 font-medium">ICU Beds</div>
                  </div>
                  <div className="text-center p-4 bg-warning-50 rounded-xl">
                    <div className="text-2xl font-bold text-warning-600">
                      {filteredHospitals.length}
                    </div>
                    <div className="text-sm text-warning-700 font-medium">Hospitals Found</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}