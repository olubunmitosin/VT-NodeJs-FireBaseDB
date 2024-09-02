const express = require("express");
const cookieParser = require('cookie-parser');
require('dotenv').config();
const nocache = require('nocache');
const session = require('express-session');
const cors = require("cors");
const { responseStructure } = require("./utilities/utilityService");

// Instantiate Express App
const app = express();
// Use Express Session
app.use(session({secret: 'grant', saveUninitialized: true, resave: false}));
// Set global base dir
global.__basedir = __dirname;

// Set cors options
let corsOptions = {
  origin: '*'
};

// Use Cors
app.use(cors(corsOptions));
// Use No cache
app.use(nocache());
// Use cookie parser
app.use(cookieParser());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// Serving static files
app.use(express.static('public'));

// simple route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Virtual Tribe NodeJS blog application backend with FirebaseDB (Firestore)." });
});

// routes
require("./routes/posts.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

// Catch 404 handler
app.use((req, res, next) => {
  res.status(404).send(responseStructure("Resource Not Found", false, []));
});
app.use((error, req, res, next) => {
  res.status(error.status || 500).send(
      responseStructure(error.message || "Internal Server Error", false, []));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});