import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

import { formatEpochToUTCTime } from "../utils/DateUtils";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

interface WeatherChartProps {
  todaysForecast?: ForecastEntry[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ todaysForecast }) => {
  const chartInput =
    todaysForecast !== undefined
      ? todaysForecast.map((forecastEntry) => forecastEntry.main.temp)
      : [];
  const labelsInput =
    todaysForecast !== undefined
      ? todaysForecast.map((forecastEntry) =>
          formatEpochToUTCTime(forecastEntry.dt)
        )
      : [];

  const chartData = {
    labels: labelsInput,
    datasets: [
      {
        label: "",
        data: chartInput,
        borderColor: "#f49d0f",
        backgroundColor: "rgb(24, 26, 27)",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: todaysForecast !== undefined,
          text: "Time (hh:mm)",
        },
      },
      y: {
        title: {
          display: todaysForecast !== undefined,
          text: "Temperature (ºC)",
        },
      },
    },
    plugins: {
      title: {
        display: todaysForecast !== undefined,
        text: "Temperature",
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default WeatherChart;
