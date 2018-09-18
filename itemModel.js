// REQUIRE MONGOOSE FOR INTERFACING WITH OUT DATABSE
const mongoose = require('mongoose');

// DEFINING THE SCHEMA THAT WILL HANDLE DATA MANIPULATION
const ItemSchema = new mongoose.Schema({
    // DEFINING DATA PARAMETERS
    id: Number,
    title: String,
    user: String,
    time: Number,
    time_ago: String,
    comments_count: Number,
    type: String,
    url: String,
    domain: String,
    points: Number
});

// EXPORTING THE MODEL FOR USE IN ROUTES AND OTHER PARTS OF OUT APP
module.exports = mongoose.model('Item', ItemSchema);
