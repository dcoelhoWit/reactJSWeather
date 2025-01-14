import "../styles.css";

import React from "react";
import WeatherPreviewCard from "./WeatherCard";

export default function DailyWeather({day, forecasts}) {

    function formatEpochToUTCTime(epochTimestamp) {
        const date = new Date(epochTimestamp * 1000); 
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC' 
        };
        return date.toLocaleString('en-GB', options).replace(',', ''); 
    }

    return (
        <div>
            <h1>{day}</h1>
            <br/>
            <div className="grid">
                {
                    forecasts.map(forecastEntry => (
                        <WeatherPreviewCard
                                key={forecastEntry.dt_txt}
                                time={formatEpochToUTCTime(forecastEntry.dt)} 
                                weather={forecastEntry.weather} 
                                maxTemp={forecastEntry.main.temp_max} 
                                minTemp={forecastEntry.main.temp_min} 
                                currentTemp={forecastEntry.main.temp} 
                                realFeel={forecastEntry.main.feels_like}/>
                    ))
                }
            </div>
        </div>
    );
}