import React from "react";
import "../styles.css";

import DailyWeather from "./DailyWeather";

interface ForecastEntry {
  dt: number;
  dt_txt: string;
  weather: any;
  main: {
    temp_max: number;
    temp_min: number;
    temp: number;
    feels_like: number;
  };
}

interface WeatherForecastProps {
  groupedForecastsIndices: string[];
  groupedForecasts: {[key: string]: ForecastEntry[];};
}

export default function WeatherForecastWeatherForecast({
  groupedForecastsIndices,
  groupedForecasts,
}: WeatherForecastProps) {
  return (
    <div>
      {groupedForecastsIndices.map((item) => (
        <DailyWeather key={item} day={item} forecasts={groupedForecasts[item]}></DailyWeather>
      ))}
    </div>
  );
}