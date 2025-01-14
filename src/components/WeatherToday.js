import "../styles.css";
import WeatherChart from "./WeatherChart";

export default function WeatherToday({groupedForecasts}) {
    return (
        <div>
            <WeatherChart todaysForecast={groupedForecasts!== undefined ? groupedForecasts["Today"] : []}></WeatherChart>
        </div>
    );
}