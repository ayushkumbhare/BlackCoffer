import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const TopicNews = () => {
    const [news, setNews] = useState([]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState('');

    useEffect(() => {
        const fetchTopicNews = async () => {
            try {
                const response = await fetch(`http://localhost:3000/detail/latest?topic=${selectedTopic}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setNews(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        const fetchTopics = async () => {
            try {
                const response = await fetch('http://localhost:3000/graph/topics');

                if (!response.ok) {
                    throw new Error('Failed to fetch topics');
                }
                const data = await response.json();
                const topicsArray = Object.entries(data).map(([topic, value]) => ({ topic, value }));
                setTopics(topicsArray);

            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        };

        fetchTopicNews();
        fetchTopics();
    }, [selectedTopic]);

    const handleTopicChange = (event) => {
        setSelectedTopic(event.target.value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="news-section second-section-item">
            <div className="header">
                <div className="topic">Topic:</div>
                <div className="search">
                    <select name="topic" value={selectedTopic} onChange={handleTopicChange}>
                        <option value="">Select a topic</option>
                        {topics.map((topicData, index) => (
                            <option key={index} value={topicData.topic}>{topicData.topic}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="news-list">
                {news.map((item, index) => (
                    <NavLink to={item.url} className="list-item" key={index}>
                        <div className="heading">
                            <div className="added">{new Date(item.added).toLocaleDateString()}</div>
                            <div className="topic" style={{fontWeight: "700"}}>{item.topic}</div>
                        </div>
                        <div className="news-title">{item.title}</div>
                        <div className="base-line">
                            <div className="country">{item.country}</div>
                            <div className="visit">&rarr;</div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default TopicNews;
