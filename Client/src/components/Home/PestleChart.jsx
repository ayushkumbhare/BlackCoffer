import React, { useState, useEffect } from 'react';
import DoughnutChart from '../charts/DoughnutChart';

const PestleChart = () => {
    const [pestleData, setPestleData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/graph/pestles');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPestleData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="pestle-chart third-section-item">
            <div className="header">
                <div className="topic">Pestle</div>
                <div className="description">
                    Pestle comparison 
                </div>
            </div>
            <div className="chart-container">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <DoughnutChart pestleData={pestleData} />
                )}
            </div>
        </div>
    );
}

export default PestleChart;
