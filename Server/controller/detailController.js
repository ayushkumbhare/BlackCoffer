const Chart = require("../models/Chart");
const pipelines = require("../utils/pipelines");

const latestPublishedData = async (req, res) => {
    try {
        
        const { topic, sector, region, pestle, source, country } = req.query;
        const pipeline = pipelines.latestData(topic, sector, region, pestle, source, country);
    
        const result = await Chart.aggregate(pipeline);
    
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching latest data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    
}


module.exports = {
    latestPublishedData
};
