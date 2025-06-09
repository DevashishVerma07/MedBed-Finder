import React from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Search } from './components/Search';
import { HospitalResults } from './components/HospitalResults';
import { BedTypes } from './components/BedTypes';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { RealTimeUpdates } from './components/RealTimeUpdates';
import { HospitalProvider, useHospitals } from './context/HospitalContext';

function AppContent() {
  const { selectedCity } = useHospitals();

  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <main className="pt-16 lg:pt-20">
        <Hero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <Search />
              <HospitalResults />
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Sidebar selectedCity={selectedCity} />
              </div>
            </div>
          </div>
        </div>
        <BedTypes />
        <About />
      </main>
      <Footer />
      <RealTimeUpdates />
    </motion.div>
  );
}

function App() {
  return (
    <HospitalProvider>
      <AppContent />
    </HospitalProvider>
  );
}

export default App;