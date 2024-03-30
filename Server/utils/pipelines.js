// Pipeline for grouping by end_year and restructuring the result
const groupByEndYear = () => [
    {
        // Use to extract the data which donot contain end_year
        $match: {
            end_year: { $exists: true }
        }
    },
    {
        // Grouping of data
        $group: {
            _id: "$end_year", // Group documents by end_year 
            data: { $push: "$$ROOT" } // Push each document into an array for the respective end_year
        }
    },
    {
        // Just a makeover of the data
        $project: {
            _id: 0, // Remove the _id from data object
            year: "$_id", // Renames the _id field to year
            data: 1 // Include the data array in the output
        }
    }
];

// Pipeline for sorting data by range of end_year
const sortByYearRange = (startYear = "0", endYear = "99999999999") => [
    {
        $match: {
            // for the range
            end_year: {
                $gte: startYear,
                $lte: endYear
            }
        }
    },
    {
        $group: {
            _id: "$end_year",
            data: { $push: "$$ROOT" }
        }
    },
    {
        $project: {
            _id: 0,
            year: "$_id",
            data: 1
        }
    }
];

const groupByTopics = () => [
    {
        $match: {
            topic: { $exists: true }
        }
    },
    {
        $group: {
            _id: "$topic",
            data: { $push: "$$ROOT" }
        }
    },
    {
        $project: {
            _id: 0,
            topic: "$_id",
            data: 1
        }
    }
];

const searchByTopic = (searchString) => [
    {
        $match: {
            topic: { $regex: `^${searchString}`, $options: 'i' }
        }
    },
    {
        $group: {
            _id: "$topic",
            data: { $push: "$$ROOT" }
        }
    },
    {
        $project: {
            _id: 0,
            topic: "$_id",
            data: 1
        }
    }
];

const groupBySector = () => [
    {
        $match: {
            sector: { $exists: true }
        }
    },
    {
        $group: {
            _id: "$sector",
            data: { $push: "$$ROOT" }
        }
    },
    {
        $project: {
            _id: 0,
            sector: "$_id",
            data: 1
        }
    }
];

const searchBySector = (searchString) => [
    {
        $match: {
            sector: { $regex: `^${searchString}`, $options: 'i' }
        }
    },
    {
        $group: {
            _id: "$sector",
            data: { $push: "$$ROOT" }
        }
    },
    {
        $project: {
            _id: 0,
            sector: "$_id",
            data: 1
        }
    }
];


const groupByCountry = () => [
    {
        $match: {
            country: { $exists: true }
        }
    },
    {
        $group: {
            _id: "$country",
            data: { $push: "$$ROOT" }
        }
    },
    {
        $project: {
            _id: 0,
            country: "$_id",
            data: 1
        }
    }
];

const searchByCountry = (searchString) => [
    {
        $match: {
            country: { $regex: `^${searchString}`, $options: 'i' }
        }
    },
    {
        $group: {
            _id: "$country",
            data: { $push: "$$ROOT" }
        }
    },
    {
        $project: {
            _id: 0,
            country: "$_id",
            data: 1
        }
    }
];



// Graph Pipeline
const groupWiseEndYearCount = () => [
    {
        $group: {
            _id: "$end_year", // Group documents by end_year 
            count: { $sum: 1 } // Count the number of documents for each year
        }
    },
    {
        $project: {
            _id: 0, // Exclude the _id field
            end_year: "$_id", // Rename the _id field to end_year
            count: 1 // Include the count in the output
        }
    }
];


const groupWiseStartYearCount = () => [
    {
        $group: {
            _id: "$start_year",
            count: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            start_year: "$_id",
            count: 1
        }
    }
];

const groupWiseCountryCount = () => [
    {
        $group: {
            _id: "$country",
            count: { $sum: 1 }
        }
    },
    {
        $sort: { count: -1 } 
    },
    {
        $limit: 20 
    },
    {
        $project: {
            _id: 0,
            country: "$_id",
            count: 1
        }
    }
];


const groupWiseRegionCount = () => [
    {
        $group: {
            _id: "$region",
            count: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            region: "$_id",
            count: 1
        }
    }
];

const groupWiseSectorCount = () => [
    {
        $group: {
            _id: "$sector",
            count: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            sector: "$_id",
            count: 1
        }
    }
];

const groupWiseTopicCount = () => [
    {
        $group: {
            _id: "$topic",
            count: { $sum: 1 }
        }
    },
    {
        $sort: { count: -1 } 
    },
    {
        $limit: 20 
    },
    {
        $project: {
            _id: 0,
            topic: "$_id",
            count: 1
        }
    }
];

const groupWisePestleCount = () => [
    {
        $group: {
            _id: "$pestle",
            count: { $sum: 1 }
        }
    },
    {
        $sort: { count: -1 } 
    },
    {
        $project: {
            _id: 0,
            pestle: "$_id",
            count: 1
        }
    }
];

// Top Latest 20 

const latestData = (topic, sector, region, pestle, source, country) => {
    const pipeline = [
        {
            $match: {
                // Filtering conditions based on the provided parameters
                $and: [
                    { topic: topic || { $exists: true } },
                    { sector: sector || { $exists: true } },
                    { region: region || { $exists: true } },
                    { pestle: pestle || { $exists: true } },
                    { source: source || { $exists: true } },
                    { country: country || { $exists: true } }
                ],
                added: { $ne: "" }
            }
        },
        {
            $addFields: {
                addedDate: {
                    $dateFromString: {
                        dateString: "$added",
                        format: "%B, %d %Y %H:%M:%S"
                    }
                }
            }
        },
        {
            $sort: {
                addedDate: -1
            }
        },
        {
            $limit: 20
        }
    ];

    return pipeline;
};


module.exports = {
    groupByEndYear,
    sortByYearRange,
    groupByTopics,
    searchByTopic,
    groupBySector,
    searchBySector,
    groupByCountry,
    searchByCountry,
    groupWiseEndYearCount,
    groupWiseStartYearCount,
    groupWiseCountryCount,
    groupWiseRegionCount,
    groupWiseSectorCount,
    groupWiseTopicCount,
    groupWisePestleCount,
    latestData,
};
