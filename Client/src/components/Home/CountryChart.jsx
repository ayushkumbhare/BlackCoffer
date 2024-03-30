import React, { useState, useEffect } from 'react';
import PieChart from '../charts/PieChart';

const CountryChart = () => {
    const [countryData, setCountryData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/graph/countries');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCountryData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="country-chart third-section-item">
            <div className="header">
                <div className="topic">Countries</div>
                <div className="description">
                    Just showing ttop 20 Countries 
                </div>
            </div>
            <div className="chart-container">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <PieChart countryData={countryData} />
                )}
            </div>
        </div>
    );
};

export default CountryChart;
