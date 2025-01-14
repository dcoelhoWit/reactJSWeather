import "../styles.css";

import React from "react";
import WeatherPreviewCard from "./WeatherCard";
import { formatEpochToUTCTime } from "../utils/DateUtils.js";

export default function DailyWeather({day, forecasts}) {
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