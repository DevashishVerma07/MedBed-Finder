export interface Hospital {
  id: string;
  name: string;
  city: string;
  freeBeds: number;
  icuBeds: number;
  oxygenBeds: number;
  address: string;
  phone?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export type City = 'Delhi' | 'Mumbai' | 'Bangalore' | 'Kolkata' | 'Chennai' | 'Hyderabad' | 'Jaipur';