const mongoose = require('mongoose');

require('dotenv').config();

//Set up default mongoose connection
mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));