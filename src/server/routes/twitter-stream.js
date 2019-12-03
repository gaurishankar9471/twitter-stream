const Twitter  = require('twitter');

module.exports = (app, io) => {

    //Twitter API KEY Setup

    let twitter = new Twitter({
        consumer_key: "uSmDe8eEd0GPWKxhmrvFePHKk",
        consumer_secret: "ObFQ02x07AFYib8H3ifTJUK3myaUwkQ7NCb6ok7oDegOwItDbf",
        access_token_key: "1200742675265122304-zfKiaKJYnRQ4yp85YkAYsOyCakNJBk",
        access_token_secret: "5LF5iWS3cZRU37nKYoGeZ63Y2hCkoK8LyiSPdtuZJuGoV"
    });

    app.locals.searchTerm = 'JavaScript'; //Defaul search item for tweet stream
    app.locals.showRetweets = false; //Default Retweet 



    let socketConnection;
    let twitterStream;

    //Resume Stream Start
    const stream = () => {
        console.log('Resuming for ' + app.locals.searchTerm);
        twitter.stream('statuses/filter', { track: app.locals.searchTerm }, (stream) => {
            stream.on('data', (tweet) => {
                updateData(tweet);
                console.log(tweet.text)

            });

            stream.on('error', (error) => {
                console.log(error);
            });

            twitterStream = stream;
        });
    }

    //Resume Stream End

    //@route - GET /search
    //@desc - route to serach specific tweets
    //@access - PUBLIC
    // app.post('/search', (req, res) => {
    //     let term = req.body.term;
    //     app.locals.searchTerm = term;
    //     twitterStream.destroy();
    //     stream();
    // });
    

    

   
     //Establish socket connection to client server
     io.on("connection", socket => {
        socketConnection = socket;
        stream();
        socket.on("connection", () => console.log("Client connected"));
        socket.on("disconnect", () => console.log("Client disconnected"));
    });


    const updateData = (msg) => {
        if (msg.text.includes('RT')) {
            return;
        }
        socketConnection.emit("tweets", msg);
    }

};