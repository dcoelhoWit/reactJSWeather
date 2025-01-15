import React from "react";
import styled from "styled-components"

interface WeatherCardProps {
  time: string;
  weather: Weather[];
  maxTemp: number;
  minTemp: number;
}

const Card = styled.div`
  border-radius: 8px;
  padding: 16px 0;
  margin: 16px 0;
  background: #272727;
  overflow: hidden;
`;
const CardImg = styled.img`
  width: 70px;
  height: 70px;
  object-position: center;
`;
const CardInfo = styled.div`
  margin-top: 8px;
`;
const CardTitle = styled.h3`
  margin: 0;
`;
const CardTempMax = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  color: rgb(255, 120, 120);
`;
const CardTempMin = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  color: rgb(131, 131, 255);
`;

export default function WeatherCard({
  time,
  weather,
  maxTemp,
  minTemp,
}: WeatherCardProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEaYTaC-q-QWUu2g7QgVvRKkJkqXjXtjBU2w&s";
  };

  function imageForWeather(weather: string) {
    var weatherImage = "";
    switch (weather) {
      case "Rain":
        weatherImage =
          "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_16-1024.png";
        break;
      case "Clear":
        weatherImage =
          "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_3-1024.png";
        break;
      case "Clouds":
        weatherImage =
          "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_1-1024.png";
        break;
      default:
        weatherImage =
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEaYTaC-q-QWUu2g7QgVvRKkJkqXjXtjBU2w&s";
    }
    return weatherImage;
  }

  return (
    <Card key={weather[0].id}>
      {weather.map((entry) => (
        <CardImg
          key={entry.id}
          src={imageForWeather(entry.main)}
          alt={entry.main}
          onError={handleError}
        />
      ))}
      <CardInfo>
        <CardTitle>{time}</CardTitle>{" "}
        <div>
          <CardTempMax>{maxTemp}ºC</CardTempMax>{" "}
          <CardTempMin>{minTemp}ºC</CardTempMin>{" "}
        </div>
      </CardInfo>
    </Card>
  );
}
