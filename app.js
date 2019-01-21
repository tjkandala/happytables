require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socketIO = require("socket.io");
const axios = require("axios");
const _ = require("lodash");

const app = express();
const server = http.createServer(app);

// creates socket using the instance of the server
const io = socketIO(server);

const yelpconfig = {
  headers: {
    Authorization: process.env.YELP_KEY
  }
};

// explain later
io.on("connection", socket => {
  // console.log("New client connected");

  // stuff that needs to happen when a new user joins an existing table
  socket.on("new user", tableid => {
    const Table = require("./models/table.model");
    Table.findOne({ tableid: tableid }, function(err, table) {
      restaurant = table.restaurant;
      filters = table.filters;
      if (err) {
        console.error("error!");
      }
      socket.emit("current restaurant name", table.restaurant, table.filters);
    });
  });

  // stuff that needs to happen when a user submits their filters
  socket.on("new filters", (nickname, category, location, price, tableid) => {
    let businessname = "";
    console.log(
      "the user selected " + category + " and " + location + " and " + price
    );
    const searchurl = `https://api.yelp.com/v3/businesses/search?&location=${location}&categories=${category}&price=${price}`;
    console.log(searchurl);
    // get request for yelp business api. randomly select a compatible business and emit its name, then write to db
    axios.get(searchurl, yelpconfig).then(function(response) {
      const businesses = response.data.businesses.length;
      console.log(businesses);
      const randnum = _.random(0, businesses - 1);
      const business = response.data.businesses[randnum];
      businessname = business.name;
      console.log(businessname);
      io.emit("new restaurant", businessname, tableid);

      // update db with restaurant name. findone, then save
      const Table = require("./models/table.model");
      Table.findOne({ tableid: tableid }, function(err, table) {
        table.restaurant = businessname;
        table.filters.push([nickname, category, location, price]);

        table.save(function(err) {
          if (err) {
            console.error("error!");
          }
        });

        io.emit("new filters", table.filters);
      });
    });
  });

  socket.on("disconnect", () => {
    console.log;
  });
});

const table = require("./routes/table.route");

// set up mongoose connection
const mongoose = require("mongoose");
let mongoDB = process.env.DB_URI;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/tables", table);
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// localhost port
const port = process.env.PORT || 3001;

server.listen(port, () => console.log(`Listening on port ${port}`));
