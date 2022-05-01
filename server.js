const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();

// Express app instance
const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sets cors
app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*"); // Set to a wild card by default but can be changed
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type"
  );
  next();
});

// Request logs in dev mode
app.use(morgan("dev"));

// Routes
app.use(require("./routes"));

app.use((request, response) => {
  response.status(404).json({ error: "Page not found" })
});

// Ports for server to run
const port = process.env.PORT || process.env.LOCALHOST;

// URI conditions
let processEnv = process.env.NODE_ENV;

const dbURI = processEnv === "production" ? process.env.MONGODB_URI : process.env.LOCAL_MONGODB_URI

app.listen(port, async () => {
  try {
    await mongoose.connect(dbURI);
    if (processEnv === "production") {
      console.log("App Started")
    } else {
      console.log(`App started visit: http://localhost:${port}/`);
    }
  } catch (error) {
    console.log(error);
  }
});
