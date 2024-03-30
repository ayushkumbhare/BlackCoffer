const Chart = require("../models/Chart");
const pipelines = require("../utils/pipelines");

const showByEndYear = async (req, res) => {
    try {
        var pipeline;

        const {startYear, endYear} = req.query;
        if(startYear == undefined && endYear == undefined) {
            pipeline = pipelines.groupByEndYear();
        }else {
            pipeline = pipelines.sortByYearRange(startYear, endYear);
        }

        const result = await Chart.aggregate(pipeline);

        const organizedResult = result.reduce((acc, { year, data }) => {
            acc[year] = data;
            return acc;
        }, {});

        res.status(200).json(organizedResult);
    } catch (error) {
        console.error('Error fetching end years:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const showByTopics = async (req, res) => {
    try {
        var pipeline;

        const { serachString } = req.query;
        if(serachString == undefined) {
            pipeline = pipelines.groupByTopics();
        }else {
            pipeline = pipelines.searchByTopic(serachString);
        }

        const result = await Chart.aggregate(pipeline);

        const organizedResult = result.reduce((acc, { topic, data }) => {
            acc[topic] = data;
            return acc;
        }, {});

        res.status(200).json(organizedResult);
    } catch (error) {
        console.error('Error fetching topics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



const showBySectors = async (req, res) => {
    try {
        var pipeline;

        const { serachString } = req.query;
        if(serachString == undefined) {
            pipeline = pipelines.groupBySector();
        }else {
            pipeline = pipelines.searchBySector(serachString);
        }

        const result = await Chart.aggregate(pipeline);

        const organizedResult = result.reduce((acc, { sector, data }) => {
            acc[sector] = data;
            return acc;
        }, {});

        res.status(200).json(organizedResult);
    } catch (error) {
        console.error('Error fetching sectors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const showByCountries = async (req, res) => {
    try {
        var pipeline;

        const { serachString } = req.query;
        if(serachString == undefined) {
            pipeline = pipelines.groupByCountry();
        }else {
            pipeline = pipelines.searchByCountry(serachString);
        }

        const result = await Chart.aggregate(pipeline);

        const organizedResult = result.reduce((acc, { country, data }) => {
            acc[country] = data;
            return acc;
        }, {});

        res.status(200).json(organizedResult);
    } catch (error) {
        console.error('Error fetching sectors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}




module.exports = {
    showByEndYear,
    showByTopics,
    showBySectors,
    showByCountries
};
