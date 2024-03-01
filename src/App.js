import React, { useState } from 'react';
import './App.css';

function App() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = '5dc0c57ba5144cc19ab131319240103';

  const searchWeather = () => {
    setLoading(true);
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        return response.json();
      })
      .then(data => {
        setLoading(false);
        setWeatherData(data);
      })
      .catch(error => {
        setLoading(false);
        alert(error.message);
      });
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input 
        type="text" 
        placeholder="Enter city name" 
        value={cityName} 
        onChange={(e) => setCityName(e.target.value)} 
      />
      <button onClick={searchWeather}>Search</button>
      {loading && <p>Loading data...</p>}
      {weatherData && (
        <div>
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
