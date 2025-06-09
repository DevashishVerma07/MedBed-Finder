import axios from 'axios';

// API Configuration
const API_CONFIG = {
  // OpenWeatherMap API (Free tier: 1000 calls/day)
  WEATHER_API_KEY: import.meta.env.VITE_WEATHER_API_KEY || 'demo_key',
  WEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5',
  
  // Guardian API (Free tier: 5000 calls/day)
  GUARDIAN_API_KEY: import.meta.env.VITE_GUARDIAN_API_KEY || 'c0033b16-2d9f-43ba-a105-8019a95fc0d8',
  GUARDIAN_BASE_URL: 'https://content.guardianapis.com',
  
  // Reddit API (Free, no key required for public posts)
  REDDIT_BASE_URL: 'https://www.reddit.com/r',
  
  // REST Countries API (Free, no key required)
  COUNTRIES_BASE_URL: 'https://restcountries.com/v3.1',
  
  // JSONPlaceholder (Free testing API)
  PLACEHOLDER_BASE_URL: 'https://jsonplaceholder.typicode.com',
  
  // IPGeolocation (Free tier: 1000 requests/month)
  GEOLOCATION_API_KEY: import.meta.env.VITE_GEOLOCATION_API_KEY || 'e260dfa317cf47a6bfca03c4b760738d',
  GEOLOCATION_BASE_URL: 'https://api.ipgeolocation.io/ipgeo',
  
  // OpenCage Geocoding (Free tier: 2500 requests/day)
  GEOCODING_API_KEY: import.meta.env.VITE_GEOCODING_API_KEY || 'demo_key',
  GEOCODING_BASE_URL: 'https://api.opencagedata.com/geocode/v1/json',
  
  // Dev.to API (Free, no key required)
  DEVTO_BASE_URL: 'https://dev.to/api/articles',
  
  // Hacker News API (Free, no key required)
  HACKERNEWS_BASE_URL: 'https://hacker-news.firebaseio.com/v0',
  
  // OpenStreetMap APIs (Free, no key required)
  OVERPASS_API_URL: 'https://overpass-api.de/api/interpreter',
  NOMINATIM_API_URL: 'https://nominatim.openstreetmap.org/search',
  
  // Disease.sh API (Free COVID/health data)
  DISEASE_API_URL: 'https://disease.sh/v3/covid-19',
  
  // World Bank API (Free economic/health indicators)
  WORLDBANK_API_URL: 'https://api.worldbank.org/v2',
  
  // OpenFDA API (Free drug/medical device data)
  OPENFDA_API_URL: 'https://api.fda.gov',
  
  // WHO API (Free health data)
  WHO_API_URL: 'https://ghoapi.azureedge.net/api'
};

// Weather Service
export interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  city: string;
  icon: string;
}

export async function getWeatherData(city: string): Promise<WeatherData | null> {
  try {
    const response = await axios.get(
      `${API_CONFIG.WEATHER_BASE_URL}/weather`,
      {
        params: {
          q: city,
          appid: API_CONFIG.WEATHER_API_KEY,
          units: 'metric'
        }
      }
    );

    return {
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      city: response.data.name,
      icon: response.data.weather[0].icon
    };
  } catch (error) {
    console.error('Weather API error:', error);
    // Return mock data for demo
    return {
      temperature: 28,
      description: 'Clear sky',
      humidity: 65,
      windSpeed: 3.2,
      city: city,
      icon: '01d'
    };
  }
}

// Enhanced News Service with more free sources
export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  urlToImage?: string;
}

export async function getHealthNews(): Promise<NewsArticle[]> {
  try {
    // Try multiple sources for India health-related content
    const sources = await Promise.allSettled([
      getIndiaHealthFromDevTo(),
      getIndiaHealthFromReddit(),
      getGuardianIndiaHealthNews(),
      getHackerNewsHealthStories(),
      getCOVIDIndiaData()
    ]);

    const allArticles: NewsArticle[] = [];
    
    sources.forEach((result) => {
      if (result.status === 'fulfilled') {
        allArticles.push(...result.value);
      }
    });

    // If we have articles, return them, otherwise return mock data
    if (allArticles.length > 0) {
      return allArticles.slice(0, 6); // Return top 6 articles
    }
    
    throw new Error('No articles found from any source');
  } catch (error) {
    console.error('News API error:', error);
    // Return India-focused health mock data
    return getIndiaHealthMockData();
  }
}

// COVID India Data (Free API)
async function getCOVIDIndiaData(): Promise<NewsArticle[]> {
  try {
    const response = await axios.get(`${API_CONFIG.DISEASE_API_URL}/countries/india`);
    const data = response.data;
    
    return [{
      title: `India COVID-19 Update: ${data.todayCases.toLocaleString()} New Cases`,
      description: `Total cases: ${data.cases.toLocaleString()}, Active: ${data.active.toLocaleString()}, Recovered: ${data.recovered.toLocaleString()}. Updated health statistics for India.`,
      url: 'https://disease.sh/v3/covid-19/countries/india',
      publishedAt: new Date(data.updated).toISOString(),
      source: 'Disease.sh',
      urlToImage: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg'
    }];
  } catch (error) {
    console.error('Disease.sh API error:', error);
    return [];
  }
}

// Hacker News Health Stories (Free API)
async function getHackerNewsHealthStories(): Promise<NewsArticle[]> {
  try {
    // Get top stories
    const topStoriesResponse = await axios.get(`${API_CONFIG.HACKERNEWS_BASE_URL}/topstories.json`);
    const topStoryIds = topStoriesResponse.data.slice(0, 50); // Get first 50 stories
    
    // Fetch story details for health-related stories
    const healthStories: NewsArticle[] = [];
    
    for (const storyId of topStoryIds.slice(0, 20)) { // Check first 20 stories
      try {
        const storyResponse = await axios.get(`${API_CONFIG.HACKERNEWS_BASE_URL}/item/${storyId}.json`);
        const story = storyResponse.data;
        
        if (story && story.title && story.url) {
          const title = story.title.toLowerCase();
          if (title.includes('health') || title.includes('medical') || title.includes('hospital') || 
              title.includes('doctor') || title.includes('medicine') || title.includes('covid') ||
              title.includes('vaccine') || title.includes('healthcare')) {
            
            healthStories.push({
              title: story.title,
              description: story.title, // HN doesn't have descriptions
              url: story.url,
              publishedAt: new Date(story.time * 1000).toISOString(),
              source: 'Hacker News',
              urlToImage: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg'
            });
            
            if (healthStories.length >= 2) break; // Limit to 2 stories
          }
        }
      } catch (err) {
        console.warn(`Error fetching HN story ${storyId}:`, err);
      }
    }
    
    return healthStories;
  } catch (error) {
    console.error('Hacker News API error:', error);
    return [];
  }
}

// India-specific health mock data
function getIndiaHealthMockData(): NewsArticle[] {
  return [
    {
      title: 'AIIMS Delhi Introduces AI-Powered Bed Management System',
      description: 'All India Institute of Medical Sciences, Delhi has launched an advanced artificial intelligence system to optimize bed allocation and reduce patient waiting times across all departments.',
      url: '#',
      publishedAt: new Date().toISOString(),
      source: 'Health India Today',
      urlToImage: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg'
    },
    {
      title: 'Government Hospitals in Mumbai Report 95% Bed Occupancy Rate',
      description: 'Maharashtra health department announces high occupancy rates in government hospitals across Mumbai, with new measures being implemented to increase capacity.',
      url: '#',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: 'Mumbai Health News',
      urlToImage: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg'
    },
    {
      title: 'Bangalore Hospitals Launch Digital Health Cards for Faster Admission',
      description: 'Karnataka state government introduces digital health cards to streamline hospital admissions and bed allocation process in Bangalore government hospitals.',
      url: '#',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: 'Karnataka Health Department',
      urlToImage: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg'
    },
    {
      title: 'Delhi Government Expands ICU Capacity in Response to Health Demands',
      description: 'Delhi health ministry announces expansion of ICU facilities across government hospitals to meet growing healthcare demands in the national capital.',
      url: '#',
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      source: 'Delhi Health Ministry',
      urlToImage: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg'
    },
    {
      title: 'Telemedicine Integration Reduces Hospital Bed Pressure in Rural India',
      description: 'National Rural Health Mission reports successful implementation of telemedicine services, reducing unnecessary hospital visits and optimizing bed utilization.',
      url: '#',
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      source: 'Rural Health India',
      urlToImage: 'https://images.pexels.com/photos/263337/pexels-photo-263337.jpeg'
    }
  ];
}

// Dev.to India health articles
async function getIndiaHealthFromDevTo(): Promise<NewsArticle[]> {
  try {
    const response = await axios.get(`${API_CONFIG.DEVTO_BASE_URL}?tag=health&per_page=20`);
    
    // Filter for India-related health content
    const indiaHealthArticles = response.data.filter((article: any) => {
      const content = (article.title + ' ' + (article.description || '') + ' ' + (article.body_markdown || '')).toLowerCase();
      const hasIndiaKeywords = content.includes('india') || content.includes('indian') || 
                              content.includes('delhi') || content.includes('mumbai') || 
                              content.includes('bangalore') || content.includes('chennai') ||
                              content.includes('kolkata') || content.includes('hyderabad') ||
                              content.includes('ayush') || content.includes('ayurveda');
      const hasHealthKeywords = content.includes('health') || content.includes('medical') || 
                               content.includes('hospital') || content.includes('doctor') ||
                               content.includes('patient') || content.includes('healthcare');
      return hasIndiaKeywords && hasHealthKeywords;
    });
    
    return indiaHealthArticles.slice(0, 2).map((article: any) => ({
      title: article.title,
      description: article.description || article.title,
      url: article.url,
      publishedAt: article.published_at,
      source: 'Dev.to India Health',
      urlToImage: article.cover_image || 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg'
    }));
  } catch (error) {
    console.error('Dev.to API error:', error);
    return [];
  }
}

// Reddit India health posts
async function getIndiaHealthFromReddit(): Promise<NewsArticle[]> {
  try {
    // Try multiple India-specific health subreddits
    const subreddits = ['india', 'IndiaSpeaks', 'indianews'];
    const allPosts: any[] = [];
    
    for (const subreddit of subreddits) {
      try {
        const response = await axios.get(`${API_CONFIG.REDDIT_BASE_URL}/${subreddit}/hot.json?limit=25`);
        allPosts.push(...response.data.data.children);
      } catch (err) {
        console.warn(`Error fetching from r/${subreddit}:`, err);
      }
    }
    
    // Filter for health-related posts
    const healthPosts = allPosts.filter((post: any) => {
      const content = (post.data.title + ' ' + (post.data.selftext || '')).toLowerCase();
      const hasHealthKeywords = content.includes('health') || content.includes('medical') || 
                               content.includes('hospital') || content.includes('doctor') ||
                               content.includes('patient') || content.includes('healthcare') ||
                               content.includes('medicine') || content.includes('treatment') ||
                               content.includes('aiims') || content.includes('government hospital');
      return hasHealthKeywords && !post.data.over_18 && post.data.title;
    });
    
    return healthPosts.slice(0, 2).map((post: any) => ({
      title: post.data.title,
      description: post.data.selftext ? post.data.selftext.substring(0, 200) + '...' : post.data.title,
      url: `https://reddit.com${post.data.permalink}`,
      publishedAt: new Date(post.data.created_utc * 1000).toISOString(),
      source: 'Reddit India Health',
      urlToImage: post.data.thumbnail && post.data.thumbnail.startsWith('http') 
        ? post.data.thumbnail 
        : 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg'
    }));
  } catch (error) {
    console.error('Reddit API error:', error);
    return [];
  }
}

// Guardian India health news
async function getGuardianIndiaHealthNews(): Promise<NewsArticle[]> {
  try {
    // Search for India + health related content
    const response = await axios.get(`${API_CONFIG.GUARDIAN_BASE_URL}/search`, {
      params: {
        q: 'India health hospital medical healthcare',
        section: 'world',
        'page-size': 15,
        format: 'json',
        'show-fields': 'trailText,thumbnail',
        'api-key': API_CONFIG.GUARDIAN_API_KEY
      }
    });
    
    // Filter for India-specific health content
    const indiaHealthArticles = response.data.response.results.filter((article: any) => {
      const content = (article.webTitle + ' ' + (article.fields?.trailText || '')).toLowerCase();
      return content.includes('india') && 
             (content.includes('health') || content.includes('medical') || 
              content.includes('hospital') || content.includes('healthcare'));
    });
    
    return indiaHealthArticles.slice(0, 2).map((article: any) => ({
      title: article.webTitle,
      description: article.fields?.trailText || article.webTitle,
      url: article.webUrl,
      publishedAt: article.webPublicationDate,
      source: 'The Guardian India',
      urlToImage: article.fields?.thumbnail || 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg'
    }));
  } catch (error) {
    console.error('Guardian API error:', error);
    return [];
  }
}

// Geolocation Service
export interface LocationData {
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export async function getUserLocation(): Promise<LocationData | null> {
  try {
    const response = await axios.get(
      `${API_CONFIG.GEOLOCATION_BASE_URL}`,
      {
        params: {
          apiKey: API_CONFIG.GEOLOCATION_API_KEY
        }
      }
    );

    return {
      city: response.data.city,
      state: response.data.state_prov,
      country: response.data.country_name,
      latitude: parseFloat(response.data.latitude),
      longitude: parseFloat(response.data.longitude),
      timezone: response.data.time_zone.name
    };
  } catch (error) {
    console.error('Geolocation API error:', error);
    // Return mock data for demo
    return {
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      latitude: 28.6139,
      longitude: 77.2090,
      timezone: 'Asia/Kolkata'
    };
  }
}

// Geocoding Service
export interface GeocodingResult {
  latitude: number;
  longitude: number;
  formatted: string;
}

export async function geocodeAddress(address: string): Promise<GeocodingResult | null> {
  try {
    // Try OpenCage first
    if (API_CONFIG.GEOCODING_API_KEY !== 'demo_key') {
      const response = await axios.get(
        API_CONFIG.GEOCODING_BASE_URL,
        {
          params: {
            q: address,
            key: API_CONFIG.GEOCODING_API_KEY,
            limit: 1
          }
        }
      );

      const result = response.data.results[0];
      if (result) {
        return {
          latitude: result.geometry.lat,
          longitude: result.geometry.lng,
          formatted: result.formatted
        };
      }
    }

    // Fallback to Nominatim (free)
    const nominatimResponse = await axios.get(API_CONFIG.NOMINATIM_API_URL, {
      params: {
        q: address,
        format: 'json',
        limit: 1,
        addressdetails: 1
      }
    });

    if (nominatimResponse.data && nominatimResponse.data.length > 0) {
      const result = nominatimResponse.data[0];
      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        formatted: result.display_name
      };
    }

    return null;
  } catch (error) {
    console.error('Geocoding API error:', error);
    return null;
  }
}

// Distance Calculation Service
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

// Emergency Services API (Mock implementation)
export interface EmergencyService {
  name: string;
  phone: string;
  type: 'ambulance' | 'police' | 'fire' | 'medical';
  available: boolean;
}

export async function getEmergencyServices(city: string): Promise<EmergencyService[]> {
  // Mock data - in real implementation, this would connect to emergency services API
  return [
    {
      name: '108 Ambulance Service',
      phone: '108',
      type: 'ambulance',
      available: true
    },
    {
      name: 'Police Emergency',
      phone: '100',
      type: 'police',
      available: true
    },
    {
      name: 'Fire Department',
      phone: '101',
      type: 'fire',
      available: true
    },
    {
      name: 'Medical Emergency',
      phone: '102',
      type: 'medical',
      available: true
    }
  ];
}

// Hospital Ratings Service (Mock implementation using JSONPlaceholder pattern)
export interface HospitalRating {
  hospitalId: string;
  rating: number;
  reviewCount: number;
  reviews: {
    id: string;
    rating: number;
    comment: string;
    date: string;
    patientName: string;
  }[];
}

export async function getHospitalRatings(hospitalId: string): Promise<HospitalRating> {
  try {
    // Mock implementation - in real app, this would be your ratings API
    const mockRating = Math.random() * 2 + 3; // Rating between 3-5
    const mockReviewCount = Math.floor(Math.random() * 500) + 50;
    
    return {
      hospitalId,
      rating: Math.round(mockRating * 10) / 10,
      reviewCount: mockReviewCount,
      reviews: [
        {
          id: '1',
          rating: 5,
          comment: 'Excellent care and very clean facilities.',
          date: '2024-01-15',
          patientName: 'Anonymous Patient'
        },
        {
          id: '2',
          rating: 4,
          comment: 'Good service, but waiting time was a bit long.',
          date: '2024-01-10',
          patientName: 'Anonymous Patient'
        }
      ]
    };
  } catch (error) {
    console.error('Ratings API error:', error);
    return {
      hospitalId,
      rating: 4.2,
      reviewCount: 150,
      reviews: []
    };
  }
}

// Real-time Notifications Service (Mock WebSocket implementation)
export class NotificationService {
  private ws: WebSocket | null = null;
  private listeners: ((data: any) => void)[] = [];

  connect() {
    // Mock WebSocket connection - in real implementation, connect to your WebSocket server
    console.log('Connecting to notification service...');
    
    // Simulate real-time bed updates
    setInterval(() => {
      const mockUpdate = {
        type: 'bed_update',
        hospitalId: Math.floor(Math.random() * 8) + 1,
        bedType: ['general', 'icu', 'oxygen'][Math.floor(Math.random() * 3)],
        change: Math.random() > 0.5 ? 1 : -1,
        timestamp: new Date().toISOString()
      };
      
      this.listeners.forEach(listener => listener(mockUpdate));
    }, 30000); // Update every 30 seconds
  }

  subscribe(callback: (data: any) => void) {
    this.listeners.push(callback);
  }

  unsubscribe(callback: (data: any) => void) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const notificationService = new NotificationService();