import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ endYearData, startYearData }) => {
    const endYearLabels = Object.keys(endYearData);
    
    const data = {
        labels: endYearLabels,
        datasets: [
            {
                label: 'End Year Data',
                data: endYearData,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'Start Year Data',
                data: startYearData,
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }
        ]
    };

    const options = {
        scales: {
            x: {
                type: 'category' 
            },
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <Line data={data} options={options} />
    );
};

export default LineChart;
