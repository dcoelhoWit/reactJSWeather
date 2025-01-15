import styled from "styled-components";
import React from "react";
import WeatherCard from "./WeatherCard";
import { formatEpochToUTCTime } from "../utils/DateUtils";

interface DailyWeatherProps {
  day: string;
  forecasts: ForecastEntry[];
}

const Container = styled.div`
  text-align: center;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 80px);
  gap: 2rem 2rem;  
  padding: 1rem;
  justify-content: center;
`;
const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const DailyWeather: React.FC<DailyWeatherProps> = ({ day, forecasts }) => {
  return (
    <Container>
      <Title>{day}</Title> <br />
      <Grid>
        {forecasts.map((forecastEntry) => (
          <WeatherCard
            key={forecastEntry.dt_txt}
            time={formatEpochToUTCTime(forecastEntry.dt)}
            weather={forecastEntry.weather}
            maxTemp={forecastEntry.main.temp_max}
            minTemp={forecastEntry.main.temp_min}
          />
        ))}
      </Grid>
    </Container>
  );
}

export default DailyWeather