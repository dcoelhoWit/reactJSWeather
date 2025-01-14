import "../styles.css";

import React, {useState, useEffect, useContext} from "react";
import APIContext from "../context/APIContext";
import DailyWeather from "./DailyWeather";

export default function WeatherForecast({city}) {
    
    const [forecasts, setForecasts] = useState([]);
    const [groupedForecasts, setGroupedForecasts] = useState({});
    const [groupedForecastsIndices, setGroupedForecastsIndices] = useState([]);
    
    const apiDefaults = useContext(APIContext);

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${apiDefaults.unit}&appid=${apiDefaults.apiKey}`)
        .then(
            response => response.json()
        )
        .then(responseJson => updateForecast(responseJson.list));
        }
    );

    function updateForecast(responseJson) {
        setForecasts(responseJson)
        groupForecastByDays()
    }

    function formatEpochToUTCDate(epochTimestamp) {
        const currentDate = new Date();
        const targetDate = new Date(epochTimestamp * 1000); 
        const differenceInTime = targetDate.getTime() - currentDate.getTime();
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

        
        if (differenceInDays === 0) {
            return 'Today'; 
        } else if (differenceInDays === 1) {
            return 'Tomorrow'; 
        } else {
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                timeZone: 'UTC' 
            };
            return targetDate.toLocaleString('en-GB', options).replace(',', ''); 
        }
    }

    function groupForecastByDays() {
        const days = {};
        if(forecasts !== undefined) { 
            forecasts.forEach(entry => {
                const day = formatEpochToUTCDate(entry.dt)
                console.log("DAY: " + day)
                if (!days[day]) {
                    days[day] = [];
                    
                }
                days[day].push(entry);
            });
        }
        
        setGroupedForecastsIndices(Object.keys(days));
        setGroupedForecasts(days);
        
    }

    return (
        <div>
        {
            groupedForecastsIndices.map(item => (         
                <DailyWeather key={item} day={item} forecasts={groupedForecasts[item]}></DailyWeather>
            ))
        }
        </div>
    );
}