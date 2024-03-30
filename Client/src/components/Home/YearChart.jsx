import React, { useState, useEffect } from 'react';
import LineChart from '../charts/LineChart';

const YearChart = () => {
    const [startYearData, setStartYearData] = useState(null);
    const [endYearData, setEndYearData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [minValue, setMinValue] = useState(null);
    const [maxValue, setMaxValue] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const responseEnd = await fetch('http://localhost:3000/graph/endyears');
                if (!responseEnd.ok) {
                    throw new Error('Network response was not ok');
                }
                const dataEnd = await responseEnd.json();
                setEndYearData(dataEnd);

                const responseStart = await fetch('http://localhost:3000/graph/startyears');
                if (!responseStart.ok) {
                    throw new Error('Network response was not ok');
                }
                const dataStart = await responseStart.json();
                setStartYearData(dataStart);

                const endYearValues = Object.keys(endYearData);
                const startYearValues = Object.keys(startYearData);

                const min = Math.min(...startYearValues, ...endYearValues);
                const max = Math.max(...startYearValues, ...endYearValues);
                
                setMinValue(min);
                setMaxValue(max);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="year-chart second-section-item">
            <div className="header">
                <div className="year"> Year: <span>from {minValue} ~ {maxValue}</span></div>
            </div>
            <div className="chart-container">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <LineChart startYearData={startYearData} endYearData={endYearData} />
                )}
            </div>
        </div>
    );
}

export default YearChart;
