import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const News = () => {
    const [news, setNews] = useState([]);
    const [topics, setTopics] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([]);
    const [endYears, setEndYears] = useState([]);
    const [startYears, setStartYears] = useState([]);
    const [pestles, setPestles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    topicsResponse,
                    sectorsResponse,
                    countriesResponse,
                    regionsResponse,
                    endYearsResponse,
                    startYearsResponse,
                    pestlesResponse,
                ] = await Promise.all([
                    fetch("http://localhost:3000/graph/topics"),
                    fetch("http://localhost:3000/graph/sectors"),
                    fetch("http://localhost:3000/graph/countries"),
                    fetch("http://localhost:3000/graph/regions"),
                    fetch("http://localhost:3000/graph/endyears"),
                    fetch("http://localhost:3000/graph/startyears"),
                    fetch("http://localhost:3000/graph/pestles"),
                ]);

                const [
                    topicsData,
                    sectorsData,
                    countriesData,
                    regionsData,
                    endYearsData,
                    startYearsData,
                    pestlesData,
                ] = await Promise.all([
                    topicsResponse.json(),
                    sectorsResponse.json(),
                    countriesResponse.json(),
                    regionsResponse.json(),
                    endYearsResponse.json(),
                    startYearsResponse.json(),
                    pestlesResponse.json(),
                ]);

                setTopics(Object.keys(topicsData));
                setSectors(Object.keys(sectorsData));
                setCountries(Object.keys(countriesData));
                setRegions(Object.keys(regionsData));
                setEndYears(Object.keys(endYearsData));
                setStartYears(Object.keys(startYearsData));
                setPestles(Object.keys(pestlesData));
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const queryString = Object.keys(selectedFilters)
                    .map(
                        (key) =>
                            `${encodeURIComponent(key)}=${encodeURIComponent(
                                selectedFilters[key]
                            )}`
                    )
                    .join("&");
                const response = await fetch(
                    `http://localhost:3000/detail/latest?${queryString}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch news data");
                }
                const data = await response.json();
                setNews(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchNewsData();
    }, [selectedFilters]);

    const handleFilterChange = (filter, value) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [filter]: value,
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="fourth-section-item">
            <div className="header">
                <div className="title">News</div>
                <div className="filters">
                    <div className="topic">
                        <select
                            onChange={(e) => handleFilterChange("topic", e.target.value)}
                        >
                            <option value="">Topic</option>
                            {topics.map((topic, index) => (
                                <option key={index} value={topic}>
                                    {topic}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="sector">
                        <select
                            onChange={(e) => handleFilterChange("sector", e.target.value)}
                        >
                            <option value="">Sector</option>
                            {sectors.map((sector, index) => (
                                <option key={index} value={sector}>
                                    {sector}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="country">
                        <select
                            onChange={(e) => handleFilterChange("country", e.target.value)}
                        >
                            <option value="">Country</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="region">
                        <select
                            onChange={(e) => handleFilterChange("region", e.target.value)}
                        >
                            <option value="">Region</option>
                            {regions.map((region, index) => (
                                <option key={index} value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="endyear">
                        <select
                            onChange={(e) => handleFilterChange("endyear", e.target.value)}
                        >
                            <option value="">End year</option>
                            {endYears.map((year, index) => (
                                <option key={index} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="startyear">
                        <select
                            onChange={(e) => handleFilterChange("startyear", e.target.value)}
                        >
                            <option value="">Start year</option>
                            {startYears.map((year, index) => (
                                <option key={index} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="pestle">
                        <select
                            onChange={(e) => handleFilterChange("pestle", e.target.value)}
                        >
                            <option value="">Pestle</option>
                            {pestles.map((pestle, index) => (
                                <option key={index} value={pestle}>
                                    {pestle}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="news-list">
                {news.length > 0 ? (
                    news.map((item, index) => (
                        <NavLink to={item.url} className="list-item" key={index}>
                            <div className="heading">
                                <div className="added">
                                    <span>{item.source}</span>
                                    &nbsp; &nbsp;
                                    {new Date(item.added).toLocaleDateString()}
                                    &nbsp; &nbsp;
                                    <span>
                                        {[...Array(item.relevance)].map((_, index) => (
                                            <i key={index} className="star"></i>
                                        ))}
                                    </span>
                                </div>
                                <div className="topic">{item.topic}</div>
                            </div>
                            <div className="news-title">{item.title}</div>
                            <div className="base-line">
                                <div className="right">
                                    <span>{item.country}</span> &nbsp; &nbsp;
                                    <span>{item.region}</span>
                                </div>
                                <div className="left">&rarr;</div>
                            </div>
                        </NavLink>
                    ))
                ) : (
                    <div
                        style={{
                            fontSize: "1.6rem",
                            color: "#777",
                            fontWeight: 600,
                            textAlign: "center",
                        }}
                    >
                        No news available
                    </div>
                )}
            </div>
        </div>
    );
};

export default News;
