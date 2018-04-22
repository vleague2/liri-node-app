// Setting up required modules
const dotenv = require("dotenv").config();

const keys = require("./keys.js");

const Spotify = require("node-spotify-api");

const Twitter = require("twitter");

const request = require("request");

const chalk = require('chalk');

const fs = require('fs');

// Setting up variables

const spotify = new Spotify(keys.spotify);

const twitter = new Twitter(keys.twitter);

const nodeArgs = process.argv;

let command = nodeArgs[2];

let input = "";

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      input = input + "+" + nodeArgs[i];
    }
  
    else {
      input += nodeArgs[i];
    }
}

// The app itself: switch statement for the app to decide what to do
function liri(command) {
    switch (command) {
        case 'my-tweets':
        myTweets();
        break;

        case 'spotify-this-song':
        spotifySong();
        break;

        case 'movie-this':
        movieThis();
        break;

        case 'do-what-it-says':
        doIt();
        break;   
    }
}

// shows your last 20 tweets and when they were created at in your terminal/bash window.
function myTweets() {

    // enter parameters for the search
    let params = {screen_name: '_callmelight'};
    
    // send the request to the twitter API
    twitter.get('statuses/user_timeline', params,(error, tweets, response) => {

        // if there's no error
        if (!error) {
        
            // run through the most recent 20 tweets
            for (i=0; i < 20; i++) {

                // the tweet numbers should start at 1 so add 1 to the i variable
                let number = parseInt(i) + 1;

                // assign the creation date to a variable
                let date = tweets[i].created_at;

                // assign the tweet text to a variable
                let tweet = tweets[i].text;

                // send the data to the console!
                console.log(chalk.red("Tweet " + number + " created on " + date + ": ") + tweet);
            }
        }
    });
};

// show the following information about the song in your terminal/bash window
function spotifySong() {

    // Create a function that will run the actual search
    function searchSong(data) {
        
        // Log data to the terminal
        console.log(
            chalk.red("Artist(s): ") + data.album.artists[0].name +
            "\n" +
            chalk.red("Song name: ") +
            data.name +
            "\n" +
            chalk.red("Preview link: ") + data.album.external_urls.spotify +
            "\n" +
            chalk.red("Album: ") + 
            data.album.name
        );
    }

    // if the user does not enter a song
    if (input == "") {

        // Send a request to the API for a specific song (The Sign by Ace of Base)
        spotify
        .request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')

        // then run the searchSong function by passing through the data
        .then(function(data) {
            searchSong(data); 
        })

        // if there's an error, console.log it
        .catch(function(err) {
            console.error('Error occurred: ' + err); 
        });
    }

    // if the user does enter a search term
    else {

        // send a query to the Spotify API
        spotify.search({ type: 'track', query: input, limit: 1 }, function(err, data) {

            // if there's an error, return the error
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            // otherwise....
            else {

                // Make the object transversal more readable, and specify the path that we receive from the search query
                let dataPath = data.tracks.items[0];

                // then pass that through to the searchSong function
                searchSong(dataPath);
            }
        })
    }
};

// output the movie information to your terminal/bash window. If no movie is specified, log the data for Mr. Nobody
function movieThis() {

    // create a function that will handle the data logging to the terminal
    function logData(body) {

        // make the log more readible by assigning the parsed body to a variable
        let bodyParsed = JSON.parse(body);

        // send information to the terminal
        console.log(
            chalk.red("The movie is ") + bodyParsed.Title + 
            "\n" +
            chalk.red("The movie came out in ") + bodyParsed.Year +
            "\n" +
            chalk.red("The movie's IMDB rating is ") + bodyParsed.imdbRating +
            "\n" +
            chalk.red("The movie's Rotten Tomatoes rating is ") + bodyParsed.Ratings[1].Value +
            "\n" +
            chalk.red("The movie was produced in ") + bodyParsed.Country +
            "\n" +
            chalk.red("The movie's language is ") + bodyParsed.Language +
            "\n" +
            chalk.red("The movie's plot is: ") + bodyParsed.Plot +
            "\n" +
            chalk.red("The movie's actors are ") + bodyParsed.Actors
        );          
    }

    // if the user does not enter a search term
    if (input == "") {

        // default to the movie Mr. Nobody
        let movie = "Mr.+Nobody";

        // send the request to the OMDB API
        request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", (error, response, body) => {

            // if there's no error and the response is good
            if (!error && response.statusCode === 200) {

                // run the log data function and pass in the body
                logData(body);
            }    
        });
    }

    // if the user does enter a search term
    else {

        // send the request to the OMDB API
        request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", (error, response, body) => {

            // if there's no error and the response is good
            if (!error && response.statusCode === 200) {

                // run the function and pass in the body
                logData(body);
            }
        });
    }
};

// Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands
function doIt() {
    fs.readFile('random.txt', 'utf8', (err, data) => { 
        // if there's an error, report it
        if (err) throw err;

        // take the data from the file and separate it
        let dataArr = data.split(',');

        // assign the first item to the command variable
        command = dataArr[0];

        // assign the second item to the input variable
        input = dataArr[1];

        // Depending on what the command is, execute a function
        liri(command);
    })
};


// last but not least, run the actual app when the file is run!
liri(command);