import React, { useEffect, useRef, useState } from "react";
import search from "../assets/search.png";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzele from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import humidity from "../assets/humidity.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const inputRef = useRef();

  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzele,
    "04n": drizzele,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const searchWeather = async (city) => {
    if (!city) {
      alert("⚠️ Please enter the city name");
      setWeatherData(null);
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=21f54b0e1093040e68b88f22a217c91f`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === "404") {
        setError("❌ This city name is not found");
        setWeatherData(null);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
      setError(""); // clear previous error
    } catch (error) {
      setError("⚠️ Something went wrong. Try again.");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    searchWeather("Singapore");
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 md:p-8 lg:p-[30px] rounded-2xl bg-gradient-to-tr from-blue-900 to-indigo-950 flex flex-col">
      <div className="w-full">
        {/* Search Box */}
        <div className="px-4 sm:px-6 md:px-8 rounded-full flex py-2 sm:py-3 items-center justify-center gap-3 sm:gap-4 md:gap-5">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            className="border-none outline-none bg-white px-3 sm:px-4 md:px-5 py-2 rounded-full flex-1 text-sm sm:text-base"
          />
          <img
            onClick={() => searchWeather(inputRef.current.value)}
            src={search}
            alt="search"
            className="bg-white p-2 sm:p-3 rounded-full shadow-md cursor-pointer w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mt-3 sm:mt-4 font-medium text-sm sm:text-base">
            {error}
          </p>
        )}

        {/* Weather Details */}
        {weatherData && (
          <>
            <div className="flex flex-col items-center justify-center mt-4 sm:mt-6">
              <img
                src={weatherData.icon}
                alt=""
                className="w-24 sm:w-32 md:w-40"
              />
              <p className="text-white text-2xl sm:text-3xl md:text-4xl line-clamp-2 font-medium text-center">
                {weatherData.temperature}°C
              </p>
              <p className="text-white mt-2 sm:mt-3 md:mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-center">
                {weatherData.location}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
              <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
                <img
                  src={humidity}
                  alt="humidity"
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
                <div>
                  <p className="text-white font-medium text-sm sm:text-base">
                    {weatherData.humidity} %
                  </p>
                  <span className="text-white font-medium text-xs sm:text-sm">
                    Humidity
                  </span>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
                <img
                  src={wind}
                  alt="wind"
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
                <div>
                  <p className="text-white font-medium text-sm sm:text-base">
                    {weatherData.windspeed} Km/h
                  </p>
                  <span className="text-white font-medium text-xs sm:text-sm">
                    Wind Speed
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
