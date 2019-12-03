const express = require('express');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const http = require('http');
const port = process.env.PORT || 3001;
const app = express();

const server = http.createServer(app);
const io = socketio(server);

//Middleware start
app.use(bodyParser.json());

//Middleware end

//GET ALL ROUTES START

require('./routes/twitter-stream')(app, io);


//GET ALL ROUTES END

app.get('/a', (req, res) =>{
    res.send('I am working')
})

//Start server at 3001 PORT 
server.listen(port, () => {
    console.log('server is running at 3001 Port');
});