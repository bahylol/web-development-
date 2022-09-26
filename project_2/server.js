// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
const port = 88;
const server = app.listen(port, listening);

function listening() {
    console.log(' server running ');
    console.log(`running on localhost: ${port}`);
};

// Setup Server

// Post Route
app.post('/add', addToData);
//addToData to add to project data

function addToData(req, res) {
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.content = req.body.content;
    console.log(projectData);
}

//Get Route
app.get('/all', sendToClient);

//sendToClient to send project data back to client
function sendToClient(req, res) {
    res.send(projectData);
}