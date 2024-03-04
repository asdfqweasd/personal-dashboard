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
  weather: WeatherCondition[];
  humidity: number;
  dt: number;
  temp: number;
  wind_speed: number;
}
interface WeatherCondition {
  description: string;
  icon: string;
}

const WeatherWidget: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [inputAddress, setInputAddress] = useState<string>("");
  const [wicon, setWicon] = useState("./clear_icon");

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
  useEffect(() => {
    if (weather) {
      const icon = weather.current.weather[0].icon;
      if (icon === "01d" || icon === "01n") {
        setWicon("/clear.png");
      } else if (icon === "02d" || icon === "02n") {
        setWicon("/cloud.png");
      } else if (
        icon === "03d" ||
        icon === "03n" ||
        icon === "04d" ||
        icon === "04n"
      ) {
        setWicon("/drizzle.png");
      } else if (
        icon === "09d" ||
        icon === "09n" ||
        icon === "10d" ||
        icon === "10n"
      ) {
        setWicon("/rain.png");
      } else if (icon === "13d" || icon === "13n") {
        setWicon("/snow.png");
      } else {
        setWicon("/clear.png");
      }
    }
  }, [weather]);

  const handleSearchClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
      <form className="flex items-center max-w-sm mx-auto w-full ">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 21 21"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
            placeholder="Enter the City"
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          onClick={handleSearchClick}
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search Weather</span>
        </button>
      </form>
      {weather ? (
        <div className="bg-[#a6b7dc] text-white justify-center rounded-2xl  shadow-lg max-w-4xl mx-auto my-8 p-4 sm:p-6 lg:p-8">
          <h2 className="text-3xl font-medium text-center mb-4 mt-2 sm:mb-6 sm:mt-4 sm:text-4xl">
            Current Weather
          </h2>
          <p className=" text-center text-2xl text-red-700 text-opacity-80 mb-2">
            Temperature: {Math.floor(weather.current.temp)}°C
          </p>
          <h3 className="text-xl text-center mb-2">{inputAddress}</h3>
          <p className="text-center text-lg mb-4">
            Condition: {weather.current.weather[0].description}
          </p>
          <div className=" flex justify-center mb-4">
            <img src={wicon} alt="" className="w-20 h-20 sm:w-24 sm:h-24" />
          </div>
          <div className="flex justify-between gap-6 mx-auto max-w-4xl px-4">
            <div className="flex-1">
              <img src={"./humidity.png"} alt="" className=" mt-2 mx-auto" />
              <div className="text-center mt-2">
                <div className="font-bold">{weather.current.humidity}%</div>
                <div className="text-sm">Humidity</div>
              </div>
            </div>
            <div className="flex-1">
              <img src={"./wind.png"} alt="" className="mt-2 mx-auto" />
              <div className="text-center mt-2">
                <div className="font-bold">
                  {weather.current.wind_speed} m/s
                </div>
                <div className="text-sm">Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};
export default WeatherWidget;
