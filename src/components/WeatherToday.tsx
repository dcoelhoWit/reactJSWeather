import React from "react";
import WeatherChart from "./WeatherChart";

interface WeatherTodayProps {
  groupedForecasts: { [key: string]: ForecastEntry[] };
}

export default function WeatherToday({ groupedForecasts }: WeatherTodayProps) {
  return (
    <WeatherChart todaysForecast={ groupedForecasts !== undefined ? groupedForecasts["Today"] : [] }></WeatherChart>
  );
}
