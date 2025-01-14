import React from "react";
import "../styles.css";

export default function WeatherCard({date, time, weather, maxTemp, minTemp, currentTemp, realFeel}) {

    const handleError = (e) => {
        e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEaYTaC-q-QWUu2g7QgVvRKkJkqXjXtjBU2w&s"
    }

    function imageForWeather(weather) {
        var weatherImage = ""
        switch(weather) {
            case "Rain":
                weatherImage = "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_16-1024.png";
                break;
            case "Clear":
                weatherImage = "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_3-1024.png";
                break;
            case "Clouds":
                weatherImage = "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_1-1024.png";
                break;
            default:
                weatherImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEaYTaC-q-QWUu2g7QgVvRKkJkqXjXtjBU2w&s";
        }
        return weatherImage
    }

    return (
        <div key={weather.id} className="card">
            {
                weather.map(entry => (
                    <img
                        className= "card-img" 
                        src={imageForWeather(entry.main)}
                        alt={entry.main} 
                        onError={handleError}/>
                ))
                
            }
            
            <div className="card-info">
                <h3 className="card-title">{time}</h3>
                <div>
                    <p className="card-temp-max">{minTemp}ºC</p>
                    <p className="card-temp-min">{maxTemp}ºC</p>
                </div>
            </div>
        </div>
    )
}