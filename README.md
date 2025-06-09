# MedBed Finder - Hospital Bed Availability System

A modern, real-time hospital bed finder application built with React, TypeScript, and integrated with multiple free APIs for enhanced functionality.

## 🚀 Features

### Core Features
- **Real-time Bed Availability**: Live tracking of hospital beds across multiple cities
- **Advanced Search**: Filter by city, bed type, and availability
- **Interactive UI**: Modern design with smooth animations using Framer Motion
- **Responsive Design**: Optimized for all device sizes

### Integrated Free APIs
- **OpenStreetMap Integration**: Real hospital data from the world's largest open mapping project
- **Weather Information**: Current weather conditions for selected cities
- **Health & Tech News**: Latest articles from multiple free sources
- **Emergency Services**: Quick access to emergency contact numbers
- **Location Detection**: Automatic user location detection
- **Real-time Notifications**: Live updates on bed availability changes

## 🔧 Free APIs Integrated

### 1. OpenStreetMap Overpass API ⭐ **NEW**
- **Purpose**: Real hospital data from OpenStreetMap
- **Free**: Unlimited requests (with fair use)
- **Data**: Hospital locations, names, addresses, contact info
- **Documentation**: [overpass-api.de](https://overpass-api.de/)

### 2. Nominatim Geocoding API ⭐ **NEW**
- **Purpose**: Free geocoding and reverse geocoding
- **Free**: Unlimited requests (with fair use)
- **Data**: Address to coordinates conversion
- **Documentation**: [nominatim.org](https://nominatim.org/)

### 3. Disease.sh API ⭐ **NEW**
- **Purpose**: COVID-19 and health statistics
- **Free**: Unlimited requests
- **Data**: Real-time health data for India
- **Documentation**: [disease.sh](https://disease.sh/)

### 4. World Health Organization (WHO) API ⭐ **NEW**
- **Purpose**: Global health indicators
- **Free**: Unlimited requests
- **Data**: Health statistics and indicators
- **Documentation**: [who.int/data/gho](https://www.who.int/data/gho)

### 5. OpenWeatherMap API
- **Purpose**: Weather information for hospital locations
- **Free Tier**: 1,000 calls/day
- **Sign up**: [openweathermap.org](https://openweathermap.org/api)

### 6. Dev.to API
- **Purpose**: Health and technology articles
- **Free**: No API key required
- **Documentation**: [dev.to/api](https://developers.forem.com/api)

### 7. Reddit API
- **Purpose**: Health discussions and community posts
- **Free**: No API key required for public posts
- **Documentation**: [reddit.com/dev/api](https://www.reddit.com/dev/api/)

### 8. Guardian API
- **Purpose**: Healthcare news
- **Free Tier**: 5,000 calls/day
- **Documentation**: [open-platform.theguardian.com](https://open-platform.theguardian.com/)

### 9. Hacker News API ⭐ **NEW**
- **Purpose**: Technology and health news
- **Free**: No API key required
- **Documentation**: [github.com/HackerNews/API](https://github.com/HackerNews/API)

### 10. IPGeolocation API
- **Purpose**: User location detection
- **Free Tier**: 1,000 requests/month
- **Sign up**: [ipgeolocation.io](https://ipgeolocation.io/)

### 11. OpenCage Geocoding API
- **Purpose**: Address to coordinates conversion
- **Free Tier**: 2,500 requests/day
- **Sign up**: [opencagedata.com](https://opencagedata.com/)

### 12. REST Countries API
- **Purpose**: Country information (No API key required)
- **Free**: Unlimited requests
- **Documentation**: [restcountries.com](https://restcountries.com/)

### 13. JSONPlaceholder API
- **Purpose**: Mock data generation for testing
- **Free**: Unlimited requests
- **Documentation**: [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/)

## 🛠️ Setup Instructions

### 1. Clone and Install
```bash
git clone <repository-url>
cd medbed-finder
npm install
```

### 2. Environment Setup
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your API keys (optional - app works without them)
```

### 3. Get Free API Keys (Optional)

#### OpenWeatherMap
1. Visit [openweathermap.org](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add to `.env`: `VITE_WEATHER_API_KEY=your_key_here`

#### Guardian API
1. Visit [open-platform.theguardian.com](https://open-platform.theguardian.com/)
2. Register for a developer key
3. Add to `.env`: `VITE_GUARDIAN_API_KEY=your_key_here`

#### IPGeolocation
1. Visit [ipgeolocation.io](https://ipgeolocation.io/)
2. Sign up for free
3. Get your API key
4. Add to `.env`: `VITE_GEOLOCATION_API_KEY=your_key_here`

#### OpenCage Geocoding
1. Visit [opencagedata.com](https://opencagedata.com/)
2. Create a free account
3. Get your API key
4. Add to `.env`: `VITE_GEOCODING_API_KEY=your_key_here`

### 4. Run the Application
```bash
npm run dev
```

## 📱 Features Overview

### Main Dashboard
- Hospital search by city (45+ major Indian cities)
- Real-time bed availability from OpenStreetMap
- Weather widget for selected city
- Emergency services quick access
- Latest health and tech news from multiple sources

### Hospital Information
- **Real Data**: Hospitals from OpenStreetMap database
- **Bed availability**: General, ICU, Oxygen-supported beds
- **Contact Information**: Phone numbers and addresses
- **Location Services**: GPS coordinates and directions
- **Real-time Updates**: Live status updates

### News Sources
- **Dev.to**: Health and technology articles
- **Reddit**: Health community discussions
- **Guardian**: Healthcare news
- **Hacker News**: Technology discussions
- **WHO**: Global health updates
- **Disease.sh**: COVID-19 and health statistics
- **Mock Data**: Professional health news when APIs are unavailable

### Enhanced Features ⭐ **NEW**
- **OpenStreetMap Integration**: Real hospital data from the world's largest open mapping project
- **45+ Indian Cities**: Comprehensive city coverage using REST Countries API
- **Health Statistics**: Real-time COVID-19 and health data for India
- **Enhanced Geocoding**: Free address-to-coordinates conversion
- **Multiple Data Sources**: Fallback systems ensure data availability

## 🔮 Future Enhancements

### Backend Integration Possibilities
- **Real Hospital APIs**: Connect with actual hospital management systems
- **Government Health APIs**: Integration with national health databases
- **Insurance APIs**: Real-time insurance verification
- **Ambulance Services**: Direct booking and tracking
- **Telemedicine**: Video consultation integration
- **Payment Gateways**: Online payment processing
- **SMS/WhatsApp APIs**: Automated notifications

### Additional Free APIs to Consider
- **Twilio**: Free SMS notifications (trial credits)
- **SendGrid**: Email notifications (free tier)
- **Firebase**: Real-time database and authentication
- **Supabase**: Backend as a service (free tier)
- **Mapbox**: Advanced mapping features (free tier)

## 🌟 What Makes This Special

### Real Data Integration
- **OpenStreetMap**: Actual hospital locations and data
- **Multiple Fallbacks**: Ensures data availability even if one source fails
- **Live Updates**: Real-time information from verified sources
- **Comprehensive Coverage**: 45+ major Indian cities

### Production-Ready Features
- **Error Handling**: Graceful fallbacks for all API failures
- **Performance**: Optimized API calls and caching
- **Responsive Design**: Works on all devices
- **Accessibility**: Screen reader friendly
- **SEO Optimized**: Proper meta tags and structure

## 🚀 Deployment

The application is ready for deployment on platforms like:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Note**: The application includes comprehensive fallback mock data and real OpenStreetMap integration, so it provides actual hospital data while maintaining full functionality even without API keys for demonstration purposes. All primary data sources are free and don't require authentication.

### Key Advantages of Free APIs Used:

1. **OpenStreetMap**: World's largest open mapping database with real hospital data
2. **No Rate Limits**: Most APIs have generous free tiers or no limits
3. **No Authentication**: Many APIs work without API keys
4. **Global Coverage**: Data available for locations worldwide
5. **Community Maintained**: Constantly updated by global community
6. **Production Ready**: Used by major applications worldwide