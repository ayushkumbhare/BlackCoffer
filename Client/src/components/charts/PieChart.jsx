import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ countryData }) => {
    
    const labels = Object.keys(countryData);
    const dataValues = Object.values(countryData);

    // Function to generate background colors dynamically
    const generateBackgroundColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const r = (255 + i * 111) % 256;
            const g = (99 + i * 111) % 256;
            const b = (49 + i * 111) % 256;
            colors.push(`rgb(${r}, ${g}, ${b})`);
        }
        return colors;
    };

    const numDataPoints = dataValues.length;
    const backgroundColors = generateBackgroundColors(numDataPoints);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'News covered Country wise',
                data: dataValues,
                backgroundColor: backgroundColors,
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

    return <Pie data={chartData} options={options} />;
};

export default PieChart;
