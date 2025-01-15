import React from "react";
import "../styles.css";
import WeatherChart from "./WeatherChart";

interface WeatherTodayProps {
  groupedForecasts: {[key: string]: ForecastEntry[];}
}

export default function WeatherToday({ groupedForecasts }: WeatherTodayProps) {
  return (
    <div>
      <WeatherChart todaysForecast={ groupedForecasts !== undefined ? groupedForecasts["Today"] : [] }></WeatherChart>
    </div>
  );
}