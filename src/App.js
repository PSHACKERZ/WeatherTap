import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, Sun, Cloud, Moon, Wind, Droplet, Eye, Thermometer, 
  Sunrise, Sunset, MapPin, ArrowRight, AlertTriangle, 
  RefreshCw,
} from 'lucide-react';

// Reusable Dark Mode Toggle Component
const DarkModeToggle = ({ isDark, onToggle }) => (
  <div 
    onClick={onToggle}
    className={`relative h-6 w-12 cursor-pointer rounded-full p-0.5 transition-colors duration-500 ease-in-out ${
      isDark ? 'bg-blue-600' : 'bg-gray-200'
    }`}
    role="button"
    aria-pressed={isDark}
    aria-label="Toggle dark mode"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onToggle();
      }
    }}
  >
    {/* Sun Icon */}
    <Sun 
      className={`absolute left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 transform text-yellow-400 transition-all duration-500 ${
        isDark ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
      }`}
    />
    {/* Moon Icon */}
    <Moon 
      className={`absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 transform text-yellow-100 transition-all duration-500 ${
        isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}
    />
    {/* Toggle Circle */}
    <div
      className={`h-5 w-5 transform rounded-full bg-white shadow-md transition-all duration-500 ease-in-out
        ${isDark ? 'translate-x-6' : 'translate-x-0'}
      `}
    />
  </div>
);


// Weather Detail Item Component
const WeatherDetailItem = ({ icon: Icon, label, value, isDarkMode, color = 'text-blue-500' }) => (
  <div className={`flex items-center space-x-2 p-2 rounded-lg ${
    isDarkMode ? 'bg-gray-700/50' : 'bg-white/50'
  }`}>
    <Icon className={`h-5 w-5 ${color}`} />
    <div className="flex flex-col">
      <span className="text-xs opacity-70">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  </div>
);

// Geolocation Hook
const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(`${position.coords.latitude},${position.coords.longitude}`);
      },
      (err) => {
        setError('Unable to retrieve your location');
        console.error(err);
      }
    );
  }, []);

  return { location, error, getCurrentLocation };
};
// WhatsApp SVG Icon Component
const WhatsAppIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" className={className}>
    <defs>
      <path id="a" d="M1023.941 765.153c0 5.606-.171 17.766-.508 27.159-.824 22.982-2.646 52.639-5.401 66.151-4.141 20.306-10.392 39.472-18.542 55.425-9.643 18.871-21.943 35.775-36.559 50.364-14.584 14.56-31.472 26.812-50.315 36.416-16.036 8.172-35.322 14.426-55.744 18.549-13.378 2.701-42.812 4.488-65.648 5.3-9.402.336-21.564.505-27.15.505l-504.226-.081c-5.607 0-17.765-.172-27.158-.509-22.983-.824-52.639-2.646-66.152-5.4-20.306-4.142-39.473-10.392-55.425-18.542-18.872-9.644-35.775-21.944-50.364-36.56-14.56-14.584-26.812-31.471-36.415-50.314-8.174-16.037-14.428-35.323-18.551-55.744-2.7-13.378-4.487-42.812-5.3-65.649-.334-9.401-.503-21.563-.503-27.148l.08-504.228c0-5.607.171-17.766.508-27.159.825-22.983 2.646-52.639 5.401-66.151 4.141-20.306 10.391-39.473 18.542-55.426C34.154 93.24 46.455 76.336 61.07 61.747c14.584-14.559 31.472-26.812 50.315-36.416 16.037-8.172 35.324-14.426 55.745-18.549 13.377-2.701 42.812-4.488 65.648-5.3 9.402-.335 21.565-.504 27.149-.504l504.227.081c5.608 0 17.766.171 27.159.508 22.983.825 52.638 2.646 66.152 5.401 20.305 4.141 39.472 10.391 55.425 18.542 18.871 9.643 35.774 21.944 50.363 36.559 14.559 14.584 26.812 31.471 36.415 50.315 8.174 16.037 14.428 35.323 18.551 55.744 2.7 13.378 4.486 42.812 5.3 65.649.335 9.402.504 21.564.504 27.15l-.082 504.226z"/>
      <linearGradient id="b" x1="512.001" y1=".978" x2="512.001" y2="1025.023" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#61fd7d" />
        <stop offset="1" stopColor="#2bb826" />
      </linearGradient>
    </defs>
    <use xlinkHref="#a" fill="url(#b)" />
    <path fill="#FFF" d="M783.302 243.246c-69.329-69.387-161.529-107.619-259.763-107.658-202.402 0-367.133 164.668-367.214 367.072-.026 64.699 16.883 127.854 49.017 183.522l-52.096 190.229 194.665-51.047c53.636 29.244 114.022 44.656 175.482 44.682h.151c202.382 0 367.128-164.688 367.21-367.094.039-98.087-38.121-190.319-107.452-259.706zM523.544 808.047h-.125c-54.767-.021-108.483-14.729-155.344-42.529l-11.146-6.612-115.517 30.293 30.834-112.592-7.259-11.544c-30.552-48.579-46.688-104.729-46.664-162.379.066-168.229 136.985-305.096 305.339-305.096 81.521.031 158.154 31.811 215.779 89.482s89.342 134.332 89.312 215.859c-.066 168.243-136.984 305.118-305.209 305.118zm167.415-228.515c-9.177-4.591-54.286-26.782-62.697-29.843-8.41-3.062-14.526-4.592-20.645 4.592-6.115 9.182-23.699 29.843-29.053 35.964-5.352 6.122-10.704 6.888-19.879 2.296-9.176-4.591-38.74-14.277-73.786-45.526-27.275-24.319-45.691-54.359-51.043-63.543-5.352-9.183-.569-14.146 4.024-18.72 4.127-4.109 9.175-10.713 13.763-16.069 4.587-5.355 6.117-9.183 9.175-15.304 3.059-6.122 1.529-11.479-.765-16.07-2.293-4.591-20.644-49.739-28.29-68.104-7.447-17.886-15.013-15.466-20.645-15.747-5.346-.266-11.469-.322-17.585-.322s-16.057 2.295-24.467 11.478-32.113 31.374-32.113 76.521c0 45.147 32.877 88.764 37.465 94.885 4.588 6.122 64.699 98.771 156.741 138.502 21.892 9.45 38.982 15.094 52.308 19.322 21.98 6.979 41.982 5.995 57.793 3.634 17.628-2.633 54.284-22.189 61.932-43.615 7.646-21.427 7.646-39.791 5.352-43.617-2.294-3.826-8.41-6.122-17.585-10.714z"/>
  </svg>
);

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [unit, setUnit] = useState('C');
  const [showAdvancedDetails, setShowAdvancedDetails] = useState(false);
  const [showLocationTooltip, setShowLocationTooltip] = useState(true);
  
  
  useEffect(() => {
    const tooltipTimer = setTimeout(() => {
      setShowLocationTooltip(false);
    }, 6000);

    return () => clearTimeout(tooltipTimer);
  }, []);

  // Use Geolocation Hook
  const { 
    location: geoLocation, 
    getCurrentLocation 
  } = useGeolocation();

  // Apply dark mode to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Auto-fetch weather when geolocation is available
  useEffect(() => {
    if (geoLocation) {
      fetchWeatherData(null, geoLocation);
    }
  }, [geoLocation]);

  const fetchWeatherData = async (e, searchLocation = location) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Current Weather
      const weatherResponse = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${searchLocation}`
      );
      
      // 3-Day Forecast
      const forecastResponse = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${searchLocation}&days=3&alerts=yes`
      );
      
      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error('Unable to fetch weather data');
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      setWeatherData(weatherData);
      setForecast(forecastData);
      setLocation(weatherData.location.name);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError('Unable to fetch weather data. Please check the location and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle temperature unit
  const toggleTemperatureUnit = () => {
    setUnit(prev => prev === 'C' ? 'F' : 'C');
  };

  const getTemperature = (temp) => {
    return unit === 'C' 
      ? `${temp}°C` 
      : `${Math.round(temp * 9/5 + 32)}°F`;
  };

  // Determine weather icon based on conditions
  const getWeatherIcon = (condition) => {
    if (condition.includes('cloudy')) return Cloud;
    if (condition.includes('sunny')) return Sun;
    if (condition.includes('rain')) return Droplet;
    return Sun;
  };

  // Render advanced details with null checks
  const renderAdvancedDetails = () => {
    if (!weatherData || !forecast || !forecast.forecast || !forecast.forecast.forecastday || forecast.forecast.forecastday.length === 0) {
      return null;
    }

    return (
      <div className="grid grid-cols-2 gap-2 mt-4">
        <WeatherDetailItem 
          icon={Sunrise} 
          label="Sunrise" 
          value={forecast.forecast.forecastday[0]?.astro?.sunrise || 'N/A'} 
          isDarkMode={isDarkMode} 
          color="text-orange-500" 
        />
        <WeatherDetailItem 
          icon={Sunset} 
          label="Sunset" 
          value={forecast.forecast.forecastday[0]?.astro?.sunset || 'N/A'} 
          isDarkMode={isDarkMode} 
          color="text-purple-500" 
        />
        <WeatherDetailItem 
          icon={Thermometer} 
          label="Feels Like" 
          value={getTemperature(weatherData.current?.feelslike_c || 0)} 
          isDarkMode={isDarkMode} 
          color="text-red-500" 
        />
        <WeatherDetailItem 
          icon={Wind} 
          label="Wind Direction" 
          value={weatherData.current?.wind_dir || 'N/A'} 
          isDarkMode={isDarkMode} 
          color="text-green-500" 
        />
      </div>
    );
  };
  // Add these functions inside the WeatherApp component, before the return statement
const generateShareMessage = () => {
  if (!weatherData) return '';

  const location = `${weatherData.location.name}, ${weatherData.location.country}`;
  const temperature = getTemperature(weatherData.current.temp_c);
  const condition = weatherData.current.condition.text;
  const wind = `${weatherData.current.wind_kph} km/h`;
  const humidity = `${weatherData.current.humidity}%`;

  return `🌦️ Current Weather in ${location}:
Temperature: ${temperature}
Condition: ${condition}
Wind: ${wind}
Humidity: ${humidity}

Shared via WeatherTap App 📱`;
};

// Function to share via WhatsApp
const shareViaWhatsApp = () => {
  const message = generateShareMessage();
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

  // Add a refresh function
  const refreshWeatherData = () => {
    if (location) {
      fetchWeatherData();
    }
  };

  return (
    <div className={`min-h-screen p-4 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-sky-200 to-blue-300 text-gray-900'
    }`}>
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between relative">
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="38" height="38">
              <defs>
                <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#87CEEB', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'#4682B4', stopOpacity:1}} />
                </linearGradient>
              </defs>
              
              {/* Background circle */}
              <circle cx="100" cy="100" r="95" fill="url(#skyGradient)" />
              
              {/* Sun */}
              <circle cx="100" cy="70" r="30" fill="#FFD700" />
              
              {/* Cloud */}
              <path 
                d="M50,110 
                   C30,110 20,90 40,80 
                   C35,60 60,50 70,60 
                   C80,40 110,50 110,70 
                   C130,80 120,110 100,110 Z" 
                fill="white" 
                opacity="0.8" 
              />
              
              {/* Magnifying Glass */}
              <circle 
                cx="140" 
                cy="140" 
                r="25" 
                fill="none" 
                stroke="#FFFFFF" 
                strokeWidth="10" 
              />
              <line 
                x1="160" 
                y1="160" 
                x2="180" 
                y2="180" 
                stroke="#FFFFFF" 
                strokeWidth="10" 
              />
            </svg>
            <span>WeatherTap</span>
          </h1>
          <div className="flex items-center space-x-3 relative">
            <button 
              onClick={() => {
                getCurrentLocation();
                setShowLocationTooltip(false);
              }}
              className={`p-2 rounded-full transition-colors relative ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-white' 
                  : 'hover:bg-blue-100 text-blue-600'
              }`}
              title="Use My Location"
            >
              {showLocationTooltip && (
                <div className={`absolute z-10 -left-36 top-1/2 -translate-y-1/2
                  px-3 py-2 text-xs rounded-lg 
                  ${isDarkMode 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-white text-gray-800'
                  }
                  shadow-lg
                  before:content-[''] 
                  before:absolute 
                  before:right-[-16px]
                  before:top-1/2 
                  before:-translate-y-1/2 
                  before:w-0 
                  before:h-0 
                  before:border-8
                  ${isDarkMode 
                    ? 'before:border-l-gray-700' 
                    : 'before:border-l-white'
                  }
                  before:border-y-transparent 
                  before:border-r-transparent`}
                >
                  Use Current Location
                </div>
              )}
              <MapPin className="h-5 w-5" />
            </button>
            <DarkModeToggle 
              isDark={isDarkMode} 
              onToggle={() => setIsDarkMode(!isDarkMode)} 
            />
            {/* Refresh Button */}
            <button 
              onClick={refreshWeatherData}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-white' 
                  : 'hover:bg-blue-100 text-blue-600'
              }`}
              title="Refresh Weather Data"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={fetchWeatherData} className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Enter City or Zip Code"
            className={`w-full pl-10 pr-8 py-2 rounded-lg shadow-md transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-800 text-white placeholder-gray-400' 
                : 'bg-white text-gray-900'
            }`}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          {location && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setLocation('')}
            >
              ×
            </button>
          )}
        </form>

        {/* Loading and Error States */}
        {loading ? (
          <div className={`p-6 rounded-lg text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"/>
            </div>
            <p className="mt-2">Fetching weather data...</p>
          </div>
        ) : error ? (
          <div className={`p-4 rounded-lg text-red-500 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {error}
          </div>
        ) : weatherData ? (
          <div>
            {/* Weather Alerts */}
            {forecast?.alerts?.alert?.length > 0 && (
              <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2 text-yellow-600" />
                <div>
                  <p className="font-bold">Weather Alert</p>
                  <p className="text-sm">{forecast.alerts.alert[0].headline}</p>
                </div>
              </div>
            )}

            {/* Main Weather Card */}
            <div className={`overflow-hidden rounded-xl p-6 shadow-lg transition-all duration-300 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <span>{weatherData.location.name}, {weatherData.location.country}</span>
                  </h2>
                  <p className="text-sm opacity-70">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                        {/* WhatsApp Share Button */}
        {weatherData && (
  <button
  onClick={shareViaWhatsApp}
  className={`flex items-center text-sm px-2 py-2 rounded-lg transition-all duration-300 ease-in-out 
    shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      isDarkMode
        ? 'bg-gradient-to-r from-gray-700 via-gray-502 to-gray-700 text-green-400 hover:from-gray-600 hover:to-gray-600 focus:ring-green-400'
        : 'bg-gradient-to-r from-green-400 to-green-400 text-white hover:from-green-300 hover:to-green-500 focus:ring-green-600'
    }`}
  title="Share via WhatsApp"
  aria-label="Share via WhatsApp"
>
  <WhatsAppIcon className="h-5 w-5 mr-2" />
  ShareWeather
</button>
        )}
                <button 
                  onClick={toggleTemperatureUnit}
                  className={`px-2 py-1 rounded-full text-xs ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  °{unit}
                </button>
              </div>

              <div className="flex items-center justify-between mb-4">
                {React.createElement(getWeatherIcon(weatherData.current.condition.text), {
                  className: "h-16 w-16 text-yellow-500"
                })}
                <div className="text-5xl font-bold">
                  {getTemperature(weatherData.current.temp_c)}
                  <p className="text-sm font-normal opacity-70 mt-1">
                    {weatherData.current.condition.text}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                <WeatherDetailItem 
                  icon={Wind} 
                  label="Wind" 
                  value={`${weatherData.current.wind_kph} km/h`} 
                  isDarkMode={isDarkMode} 
                />
                <WeatherDetailItem 
                  icon={Droplet} 
                  label="Humidity" 
                  value={`${weatherData.current.humidity}%`} 
                  isDarkMode={isDarkMode} 
                />
                <WeatherDetailItem 
                  icon={Eye} 
                  label="Visibility" 
                  value={`${weatherData.current.vis_km} km`} 
                  isDarkMode={isDarkMode} 
                />
              </div>

              {/* Advanced Details Button */}
              <button 
                onClick={() => setShowAdvancedDetails(!showAdvancedDetails)}
                className={`flex items-center mt-4 text-sm ${
                  isDarkMode 
                    ? 'text-blue-300 hover:text-blue-200' 
                    : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                {showAdvancedDetails ? 'Hide' : 'Show'} Advanced Details 
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>

              {/* Conditionally render advanced details */}
              {showAdvancedDetails && renderAdvancedDetails()}
            </div>

            {/* 3-Day Forecast */}
            {forecast && (
              <div className={`mt-4 rounded-xl p-4 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white/50'
              }`}>
                <h3 className="text-xl font-semibold mb-3">3-Day Forecast</h3>
                <div className="grid grid-cols-3 gap-2">
                  {forecast.forecast.forecastday.map((day, index) => {
                    const WeatherIcon = getWeatherIcon(day.day.condition.text);
                    return (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg text-center transition-all duration-300 hover:scale-105 ${
                          isDarkMode ? 'bg-gray-700/50 hover:bg-gray-700/70' : 'bg-white/50 hover:bg-white/70'
                        }`}
                      >
                        <p className="text-sm font-medium">
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </p>
                        <WeatherIcon className="mx-auto h-8 w-8 text-blue-500" />
                        <div className="mt-2">
                          <p className="font-semibold">
                            {getTemperature(day.day.maxtemp_c)}
                          </p>
                          <p className="text-xs opacity-70">
                            {getTemperature(day.day.mintemp_c)}
                          </p>
                          <p className="text-xs mt-1 opacity-70">
                            {day.day.condition.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : null}

      {/* Attribution and Share Section */}
<div className="mt-4 sm:mt-6 flex justify-center items-center space-x-2 text-center">
<a
  href="https://t.me/PS_Hacker"
  target="_blank"
  rel="noopener noreferrer"
  className="
    inline-block
    text-xs
    text-blue-700
    px-2 py-1
    bg-gray-50 
    rounded-md
    transition-colors 
    duration-300
    hover:text-red-700
    hover:bg-gray-200
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    focus:ring-blue-700
  "
  title="Contact P.S. Hackerz via Telegram"
  aria-label="Contact P.S. Hackerz via Telegram"
>
  Made By @ P.S. Hackerz (Contact us)
</a>

</div>

    </div>
    </div>
  );
};

export default WeatherApp;
