import { Hospital } from '../types/Hospital';

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';
const API_KEY = 'YOUR_GOOGLE_SHEETS_API_KEY';

export async function fetchHospitalData(): Promise<Hospital[]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Skip the header row and map the data to our Hospital interface
    return data.values.slice(1).map((row: string[]) => ({
      id: row[0],
      name: row[1],
      city: row[2],
      freeBeds: parseInt(row[3]),
      icuBeds: parseInt(row[4]),
      oxygenBeds: parseInt(row[5]),
      address: row[6],
      phone: row[7],
      coordinates: row[8] ? {
        lat: parseFloat(row[8].split(',')[0]),
        lng: parseFloat(row[8].split(',')[1])
      } : undefined
    }));
  } catch (error) {
    console.error('Error fetching hospital data:', error);
    return [];
  }
}

// Mock data for development
export const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'AIIMS Delhi',
    city: 'Delhi',
    freeBeds: 45,
    icuBeds: 12,
    oxygenBeds: 20,
    address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi',
    phone: '011-26588500'
  },
  {
    id: '2',
    name: 'Safdarjung Hospital',
    city: 'Delhi',
    freeBeds: 32,
    icuBeds: 8,
    oxygenBeds: 15,
    address: 'Ansari Nagar West, New Delhi',
    phone: '011-26707444'
  },
  {
    id: '3',
    name: 'KEM Hospital',
    city: 'Mumbai',
    freeBeds: 55,
    icuBeds: 15,
    oxygenBeds: 25,
    address: 'Acharya Donde Marg, Parel, Mumbai',
    phone: '022-24107000'
  },
  {
    id: '4',
    name: 'Victoria Hospital',
    city: 'Bangalore',
    freeBeds: 40,
    icuBeds: 10,
    oxygenBeds: 18,
    address: 'K.R. Market, Bangalore',
    phone: '080-26701150'
  },
  {
    id: '5',
    name: 'Medical College Kolkata',
    city: 'Kolkata',
    freeBeds: 38,
    icuBeds: 9,
    oxygenBeds: 16,
    address: '88, College Street, Kolkata',
    phone: '033-22123333'
  },
  {
    id: '6',
    name: 'Rajiv Gandhi GH',
    city: 'Chennai',
    freeBeds: 42,
    icuBeds: 11,
    oxygenBeds: 22,
    address: 'Gandhi Irwin Rd, Chennai',
    phone: '044-25305000'
  },
  {
    id: '7',
    name: 'Gandhi Hospital',
    city: 'Hyderabad',
    freeBeds: 35,
    icuBeds: 8,
    oxygenBeds: 14,
    address: 'Musheerabad, Hyderabad',
    phone: '040-27505566'
  },
  {
    id: '8',
    name: 'SMS Hospital',
    city: 'Jaipur',
    freeBeds: 48,
    icuBeds: 13,
    oxygenBeds: 21,
    address: 'Jawahar Lal Nehru Marg, Jaipur',
    phone: '0141-2518380'
  }
];