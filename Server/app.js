const express = require('express');
require("./utils/mongoConnector");
var cors = require('cors');
const graphRoutes = require('./routes/graphRoute');
const yearRoutes = require('./routes/endYearRoute');
const topicRoutes = require('./routes/topicRoute');
const sectorRoutes = require('./routes/sectorRoute');
const countryRoutes = require('./routes/countryRoute');
const detailRoutes = require('./routes/detailRoute');

const app = express();

// enable CORS for all routes
app.use(cors());

// Use middleware functions
// app.use(middleware1);
// app.use(middleware2);

// Use routes
app.use('/graph', graphRoutes);
app.use('/endyear', yearRoutes);
app.use('/topic', topicRoutes);
app.use('/sector', sectorRoutes);
app.use('/country', countryRoutes);
app.use('/detail', detailRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Started test server on port ${PORT}...`);
});
