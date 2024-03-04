import { useState, useEffect } from "react";
import axios from "axios";

interface Location {
  lat: number;
  lon: number;
}

interface WeatherResponse {
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  alerts: Alert[];
}
interface CurrentWeather {
  dt: number;
  temp: number;
  weather: WeatherCondition[];
}

interface HourlyWeather {
  dt: number;
  temp: number;
  weather: WeatherCondition[];
}

interface DailyWeather {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
  };
  weather: WeatherCondition[];
}

interface WeatherCondition {
  main: string;
  description: string;
}

interface Alert {
  sender_name: string;
  event: string;
  description: string;
}

const WeatherWidget: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [inputAddress, setInputAddress] = useState<string>("");

  // Get user location
  useEffect(() => {
    const fetchCurrentLocationWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            // get weather data
            await fetchWeather({ lat: latitude, lon: longitude });
          },
          (error) => console.error(error),
          { timeout: 10000 }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    fetchCurrentLocationWeather();
  }, []);

  const fetchWeather = async (data: {
    lat?: number;
    lon?: number;
    address?: string;
  }) => {
    const response = await axios.post(`/api/weather`, data);
    setWeather(response.data);
  };

  const handleSearchClick = async () => {
    if (inputAddress) {
      // if their is address
      await fetchWeather({ address: inputAddress });
    } else if (location) {
      await fetchWeather({ lat: location.lat, lon: location.lon });
    } else {
      alert("No location data available");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter the City"
        value={inputAddress}
        onChange={(e) => setInputAddress(e.target.value)}
      />
      <button onClick={handleSearchClick}>Search Weather</button>
      {weather ? (
        <div>
          <h2 className="mb-10 mt-4 px-4 text-2xl font-medium sm:text-4xl">
            Current Weather
          </h2>
          <p>Temperature: {weather.current.temp}°K</p>
          <p>Condition: {weather.current.weather[0].description}</p>

          <h2>Hourly Forecast</h2>
          {weather.hourly.slice(0, 5).map((hour) => (
            <div key={hour.dt}>
              <p>Time: {new Date(hour.dt * 1000).toLocaleTimeString()}</p>
              <p>Temperature: {hour.temp}°K</p>
              <p>Condition: {hour.weather[0].description}</p>
            </div>
          ))}

          <h2>Daily Forecast</h2>
          {weather.daily.map((day) => (
            <div key={day.dt}>
              <p>Date: {new Date(day.dt * 1000).toDateString()}</p>
              <p>
                Temperature: {day.temp.day}°K - {day.temp.min}°K to{" "}
                {day.temp.max}°K
              </p>
              <p>Condition: {day.weather[0].description}</p>
            </div>
          ))}

          {weather.alerts && weather.alerts.length > 0 && (
            <>
              <h2>Alerts</h2>
              {weather.alerts.map((alert) => (
                <div key={alert.event}>
                  <p>Sender: {alert.sender_name}</p>
                  <p>Event: {alert.event}</p>
                  <p>Description: {alert.description}</p>
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};
export default WeatherWidget;
