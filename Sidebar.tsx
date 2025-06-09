import React from 'react';
import { motion } from 'framer-motion';
import { WeatherWidget } from './WeatherWidget';
import { NewsWidget } from './NewsWidget';
import { EmergencyServices } from './EmergencyServices';
import { LocationWidget } from './LocationWidget';

interface SidebarProps {
  selectedCity: string;
}

export function Sidebar({ selectedCity }: SidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <LocationWidget />
      
      {selectedCity && (
        <>
          <WeatherWidget city={selectedCity} />
          <EmergencyServices city={selectedCity} />
        </>
      )}
      
      <NewsWidget />
    </motion.div>
  );
}