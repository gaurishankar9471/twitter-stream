const express = require("express");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const http = require("http");
const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Middleware start
app.use(bodyParser.json());

//Middle to allow header from request form different domain points
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Middleware end

//GET ALL ROUTES START

//import twitter stream route from route directory
require("./routes/twitter-stream")(app, io);

//GET ALL ROUTES END

app.get("/message", function(req, res) {
  res.send({ message: "This is the message" });
});

//Start server at 3001 PORT
server.listen(port, () => {
  console.log("server is running at 3001 Port");
});

module.exports = app; // for testing
