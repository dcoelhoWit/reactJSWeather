import "../styles.css";

import DailyWeather from "./DailyWeather";

export default function WeatherForecast({groupedForecastsIndices, groupedForecasts}) {

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