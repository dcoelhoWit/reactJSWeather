import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { formatEpochToUTCTime } from "../utils/DateUtils.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function WeatherChart({todaysForecast}) {

    const chartInput = todaysForecast !== undefined ? todaysForecast.map(forecastEntry => (forecastEntry.main.temp)) : [];
    const labelsInput = todaysForecast !== undefined ? todaysForecast.map(forecastEntry => (formatEpochToUTCTime(forecastEntry.dt))) : [];

    const chartData = {
        labels: labelsInput,
        datasets: [ 
            {
                label: 'Sample Data',
                data: chartInput,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true 
            }
        ]
    };

    const chartOptions = {
        scales: {
            x: {
                title: {
                    display: todaysForecast !== undefined,
                    text: 'Time (hh:mm)'
                }
            },
            y: {
                title: {
                    display: todaysForecast !== undefined,
                    text: 'Temperature (ºC)'
                }
            }
        },
        plugins: {
            title: {
                display: todaysForecast !== undefined,
                text: 'Temperature'
            }
        }
    };

    return (
        <Line data={chartData} options={chartOptions}/>
    )
}