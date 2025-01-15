import styled from "styled-components";
import React from "react";
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

const Container = styled.div`
  text-align: center;
`;

export default function WeatherForecastWeatherForecast({
  groupedForecastsIndices,
  groupedForecasts,
}: WeatherForecastProps) {
  return (
    <Container>
      {groupedForecastsIndices.map((item) => (
        <DailyWeather key={item} day={item} forecasts={groupedForecasts[item]}></DailyWeather>
      ))}
    </Container>
  );
}