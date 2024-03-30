import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ topicData }) => {

    const labels = Object.keys(topicData);
    const dataValues = Object.values(topicData);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'My Dataset',
                data: dataValues,
                backgroundColor: 'rgb(54, 162, 235)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: 'x',
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false, 
                },
            },
            x: {
                beginAtZero: true,
                ticks: {
                    font: {
                        size: 10
                    },
                    maxRotation: 180,
                    autoSkip: true,
                    maxTicksLimit: 50,
                },
                grid: {
                    display: false, 
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <Bar data={data} options={options} height={'300px'} />
    );
};

export default BarChart;
