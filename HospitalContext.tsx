import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Hospital, City } from '../types/Hospital';
import { mockHospitals } from '../services/googleSheetsService';
import { getHospitalDataFromFreeSources } from '../services/hospitalDataService';

interface HospitalContextType {
  hospitals: Hospital[];
  selectedCity: City | '';
  setSelectedCity: (city: City | '') => void;
  filteredHospitals: Hospital[];
  isLoading: boolean;
  refreshHospitalData: () => Promise<void>;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export function HospitalProvider({ children }: { children: ReactNode }) {
  const [hospitals, setHospitals] = useState<Hospital[]>(mockHospitals);
  const [selectedCity, setSelectedCity] = useState<City | ''>('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredHospitals = selectedCity
    ? hospitals.filter(hospital => hospital.city === selectedCity)
    : hospitals;

  const refreshHospitalData = async () => {
    if (!selectedCity) return;
    
    setIsLoading(true);
    try {
      // Try to get real data from free APIs
      const realHospitals = await getHospitalDataFromFreeSources(selectedCity);
      
      if (realHospitals.length > 0) {
        // Merge with existing mock data, prioritizing real data
        const existingMockHospitals = mockHospitals.filter(h => h.city !== selectedCity);
        setHospitals([...existingMockHospitals, ...realHospitals]);
      }
    } catch (error) {
      console.error('Error refreshing hospital data:', error);
      // Keep using mock data if real data fails
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-refresh hospital data when city changes
  useEffect(() => {
    if (selectedCity) {
      refreshHospitalData();
    }
  }, [selectedCity]);

  return (
    <HospitalContext.Provider
      value={{
        hospitals,
        selectedCity,
        setSelectedCity,
        filteredHospitals,
        isLoading,
        refreshHospitalData
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
}

export function useHospitals() {
  const context = useContext(HospitalContext);
  if (context === undefined) {
    throw new Error('useHospitals must be used within a HospitalProvider');
  }
  return context;
}