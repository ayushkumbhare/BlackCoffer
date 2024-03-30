import React, { useState, useEffect } from 'react';
import BarChart from '../charts/BarChart';

const TopicChart = () => {
    const [topicData, setTopicData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/graph/topics');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTopicData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="topic-chart third-section-item">
            <div className="header">
                <div className="topic">Topic</div>
                <div className="description">
                    Comparing Intersecting Topics
                </div>
            </div>
            <div className="chart-container">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <BarChart topicData={topicData} />
                )}
            </div>
        </div>
    );
}

export default TopicChart;
