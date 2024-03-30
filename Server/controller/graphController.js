const Chart = require("../models/Chart");
const pipelines = require("../utils/pipelines");

const getEndYearGraphData = async (req, res) => {
    try {
        var pipeline = pipelines.groupWiseEndYearCount();;

        const result = await Chart.aggregate(pipeline);

        const organizedResult = result.reduce((acc, { end_year, count }) => {
            if (end_year !== "") {
                acc[end_year] = count;
            }
            return acc;
        }, {});

        res.status(200).json(organizedResult);
    } catch (error) {
        console.error('Error fetching end years:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getStartYearGraphData = async (req, res) => {
    try {
        var pipeline = pipelines.groupWiseStartYearCount();

        const result = await Chart.aggregate(pipeline);

        const organizedResult = result.reduce((acc, { start_year, count }) => {
            if (start_year !== "") {
                acc[start_year] = count;
            }
            return acc;
        }, {});

        res.status(200).json(organizedResult);
    } catch (error) {
        console.error('Error fetching topics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getCountryGraphData = async (req, res) => {
    try {
        var pipeline = pipelines.groupWiseCountryCount();

        const result = await Chart.aggregate(pipeline);

        const organizedResult = result.reduce((acc, { country, count }) => {
            if (country !== "") {
                acc[country] = count;
            }
            return acc;
        }, {});

        res.status(200).json(organizedResult);
    } catch (error) {
        console.error('Error fetching sectors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getRegionGraphData = async (req, res) => {
    try {
        var pipeline = pipelines.groupWiseRegionCount();

        const result = await Chart.aggregate(pipeline);

        const organizedResult = result.reduce((acc, { region, count }) => {
            if (region !== "") {
                acc[region] = count;
            } else {
                acc["other"] = count;
            }
            return acc;
        }, {});

        res.status(200).json(organizedResult);
    } catch (error) {
        console.error('Error fetching sectors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const getSectorGraphData = async (req, res) => {
    try {
        var pipeline = pipelines.groupWiseSectorCount();

        const result = await Chart.aggregate(pipeline);

        const organizedResult = result.reduce((acc, { sector, count }) => {
            if (sector !== "") {
                acc[sector] = count;
            } else {
                acc["other"] = count;
            }
            return acc;
        }, {});

        res.status(200).json(organizedResult);
    } catch (error) {
        console.error('Error fetching sectors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getTopicGraphData = async (req, res) => {
    try {
        var pipeline = pipelines.groupWiseTopicCount();

        const result = await Chart.aggregate(pipeline);
        
        const organizedResult = result.reduce((acc, { topic, count }) => {
            if (topic !== "") {
                acc[topic] = count;
            } 
            return acc;
        }, {});

        res.status(200).json(organizedResult);
    } catch (error) {
        console.error('Error fetching sectors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getPestleGraphData = async (req, res) => {
    try {
        var pipeline = pipelines.groupWisePestleCount();

        const result = await Chart.aggregate(pipeline);

        const organizedResult = result.reduce((acc, { pestle, count }) => {
            if (pestle !== "") {
                acc[pestle] = count;
            } else {
                acc["other"] = count;
            }
            return acc
        }, {});

        res.status(200).json(organizedResult);
    } catch (error) {
        console.error('Error fetching sectors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    getEndYearGraphData,
    getStartYearGraphData,
    getCountryGraphData,
    getSectorGraphData,
    getTopicGraphData,
    getRegionGraphData,
    getPestleGraphData
};
