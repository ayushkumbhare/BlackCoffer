import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({ pestleData }) => {
    const labels = Object.keys(pestleData);
    const dataValues = Object.values(pestleData);
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'News covered Pestle wise',
                data: dataValues,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                ],
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    font: {
                        size: 12,
                    },
                    boxWidth: 12,
                },
            },
        },
    };

    return (
        <Doughnut data={data} options={options}/>
    );
};

export default DoughnutChart;
