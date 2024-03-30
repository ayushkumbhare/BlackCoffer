const mongoose = require('mongoose');
const fs = require('fs');
const { promisify } = require('util');

require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => {
        console.log('Connected to MongoDB...');
        uploadData();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Define schema
const dataSchema = new mongoose.Schema({
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: String,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
});

// Define model
const DataModel = mongoose.model('Data', dataSchema);

// Function to upload data
async function uploadData() {
    try {
        const readFileAsync = promisify(fs.readFile);
        const data = await readFileAsync('jsondata.json', 'utf8');
        const jsonData = JSON.parse(data);
        await DataModel.insertMany(jsonData);
        console.log('Data uploaded successfully.');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error uploading data:', error);
    }
}
