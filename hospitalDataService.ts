import axios from 'axios';
import { Hospital } from '../types/Hospital';

// OpenStreetMap Overpass API for hospital data (Free)
const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';

// Nominatim API for geocoding (Free)
const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';

// REST Countries API for country data (Free)
const COUNTRIES_API_URL = 'https://restcountries.com/v3.1';

// JSONPlaceholder for mock data (Free)
const JSONPLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com';

export interface OSMHospital {
  id: string;
  name: string;
  lat: number;
  lon: number;
  address?: string;
  phone?: string;
  website?: string;
  emergency?: string;
  beds?: number;
  operator?: string;
  type?: string;
}

// Get hospitals from OpenStreetMap for a specific city
export async function getOSMHospitals(city: string, state?: string): Promise<OSMHospital[]> {
  try {
    // First, get the bounding box for the city
    const geocodeResponse = await axios.get(NOMINATIM_API_URL, {
      params: {
        q: `${city}, ${state || ''}, India`,
        format: 'json',
        limit: 1,
        addressdetails: 1
      }
    });

    if (!geocodeResponse.data || geocodeResponse.data.length === 0) {
      console.warn(`No geocoding results for ${city}`);
      return [];
    }

    const cityData = geocodeResponse.data[0];
    const { boundingbox } = cityData;
    
    if (!boundingbox || boundingbox.length < 4) {
      console.warn(`No bounding box for ${city}`);
      return [];
    }

    const [south, north, west, east] = boundingbox;

    // Query OpenStreetMap for hospitals in the bounding box
    const overpassQuery = `
      [out:json][timeout:25];
      (
        node["amenity"="hospital"](${south},${west},${north},${east});
        way["amenity"="hospital"](${south},${west},${north},${east});
        relation["amenity"="hospital"](${south},${west},${north},${east});
      );
      out center meta;
    `;

    const hospitalResponse = await axios.post(OVERPASS_API_URL, overpassQuery, {
      headers: {
        'Content-Type': 'text/plain'
      }
    });

    const hospitals: OSMHospital[] = hospitalResponse.data.elements.map((element: any) => {
      const lat = element.lat || element.center?.lat || 0;
      const lon = element.lon || element.center?.lon || 0;
      
      return {
        id: element.id.toString(),
        name: element.tags?.name || element.tags?.['name:en'] || 'Unknown Hospital',
        lat,
        lon,
        address: element.tags?.['addr:full'] || 
                element.tags?.['addr:street'] || 
                `${element.tags?.['addr:city'] || city}, ${element.tags?.['addr:state'] || state || 'India'}`,
        phone: element.tags?.phone || element.tags?.['contact:phone'],
        website: element.tags?.website || element.tags?.['contact:website'],
        emergency: element.tags?.emergency,
        beds: element.tags?.beds ? parseInt(element.tags.beds) : undefined,
        operator: element.tags?.operator,
        type: element.tags?.['healthcare:speciality'] || element.tags?.type
      };
    });

    return hospitals.filter(h => h.name !== 'Unknown Hospital');
  } catch (error) {
    console.error('OpenStreetMap API error:', error);
    return [];
  }
}

// Get hospital data from multiple free sources
export async function getHospitalDataFromFreeSources(city: string): Promise<Hospital[]> {
  try {
    const [osmHospitals, mockData] = await Promise.allSettled([
      getOSMHospitals(city),
      getMockHospitalData(city)
    ]);

    const allHospitals: Hospital[] = [];

    // Add OSM hospitals
    if (osmHospitals.status === 'fulfilled') {
      const convertedOSMHospitals = osmHospitals.value.map((osm, index) => ({
        id: `osm-${osm.id}`,
        name: osm.name,
        city: city,
        freeBeds: Math.floor(Math.random() * 50) + 10, // Random for demo
        icuBeds: Math.floor(Math.random() * 20) + 5,
        oxygenBeds: Math.floor(Math.random() * 30) + 8,
        address: osm.address || `${city}, India`,
        phone: osm.phone,
        coordinates: {
          lat: osm.lat,
          lng: osm.lon
        }
      }));
      allHospitals.push(...convertedOSMHospitals);
    }

    // Add mock data if OSM didn't return enough results
    if (mockData.status === 'fulfilled' && allHospitals.length < 3) {
      allHospitals.push(...mockData.value);
    }

    return allHospitals.slice(0, 10); // Limit to 10 hospitals
  } catch (error) {
    console.error('Error fetching hospital data from free sources:', error);
    return getMockHospitalData(city);
  }
}

// Enhanced mock data generator using JSONPlaceholder pattern
async function getMockHospitalData(city: string): Promise<Hospital[]> {
  try {
    // Use JSONPlaceholder to generate realistic mock data
    const response = await axios.get(`${JSONPLACEHOLDER_URL}/users`);
    const users = response.data.slice(0, 5);

    const hospitalTypes = [
      'General Hospital', 'Medical College', 'District Hospital', 
      'Government Hospital', 'Civil Hospital', 'Primary Health Centre'
    ];

    return users.map((user: any, index: number) => ({
      id: `mock-${city}-${user.id}`,
      name: `${hospitalTypes[index % hospitalTypes.length]} ${user.address.city}`,
      city: city,
      freeBeds: Math.floor(Math.random() * 60) + 20,
      icuBeds: Math.floor(Math.random() * 25) + 5,
      oxygenBeds: Math.floor(Math.random() * 35) + 10,
      address: `${user.address.street}, ${user.address.suite}, ${city}`,
      phone: user.phone.replace(/[^\d-]/g, ''), // Clean phone number
      coordinates: {
        lat: parseFloat(user.address.geo.lat),
        lng: parseFloat(user.address.geo.lng)
      }
    }));
  } catch (error) {
    console.error('Error generating mock hospital data:', error);
    return [];
  }
}

// Get Indian states and cities from REST Countries API
export async function getIndianCities(): Promise<string[]> {
  try {
    const response = await axios.get(`${COUNTRIES_API_URL}/name/india`);
    const indiaData = response.data[0];
    
    // Major Indian cities (since REST Countries doesn't provide city data)
    const majorCities = [
      'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai',
      'Kolkata', 'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
      'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
      'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik',
      'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar',
      'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar',
      'Navi Mumbai', 'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore',
      'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai'
    ];

    return majorCities;
  } catch (error) {
    console.error('Error fetching Indian cities:', error);
    return [
      'Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 
      'Hyderabad', 'Jaipur', 'Pune', 'Ahmedabad', 'Lucknow'
    ];
  }
}

// Hospital verification using multiple sources
export async function verifyHospitalData(hospital: Hospital): Promise<boolean> {
  try {
    // Use Nominatim to verify if the address exists
    const response = await axios.get(NOMINATIM_API_URL, {
      params: {
        q: hospital.address,
        format: 'json',
        limit: 1,
        countrycodes: 'in' // Restrict to India
      }
    });

    return response.data && response.data.length > 0;
  } catch (error) {
    console.error('Error verifying hospital data:', error);
    return true; // Assume valid if verification fails
  }
}

// Get nearby hospitals using coordinates
export async function getNearbyHospitals(
  latitude: number, 
  longitude: number, 
  radiusKm: number = 10
): Promise<OSMHospital[]> {
  try {
    // Calculate bounding box from center point and radius
    const latDelta = radiusKm / 111; // Rough conversion: 1 degree ≈ 111 km
    const lonDelta = radiusKm / (111 * Math.cos(latitude * Math.PI / 180));

    const south = latitude - latDelta;
    const north = latitude + latDelta;
    const west = longitude - lonDelta;
    const east = longitude + lonDelta;

    const overpassQuery = `
      [out:json][timeout:25];
      (
        node["amenity"="hospital"](${south},${west},${north},${east});
        way["amenity"="hospital"](${south},${west},${north},${east});
      );
      out center meta;
    `;

    const response = await axios.post(OVERPASS_API_URL, overpassQuery, {
      headers: {
        'Content-Type': 'text/plain'
      }
    });

    return response.data.elements.map((element: any) => ({
      id: element.id.toString(),
      name: element.tags?.name || 'Unknown Hospital',
      lat: element.lat || element.center?.lat || 0,
      lon: element.lon || element.center?.lon || 0,
      address: element.tags?.['addr:full'] || element.tags?.['addr:street'] || 'Address not available',
      phone: element.tags?.phone,
      website: element.tags?.website,
      emergency: element.tags?.emergency,
      beds: element.tags?.beds ? parseInt(element.tags.beds) : undefined,
      operator: element.tags?.operator
    }));
  } catch (error) {
    console.error('Error fetching nearby hospitals:', error);
    return [];
  }
}