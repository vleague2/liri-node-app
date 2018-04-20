// Setting up required modules
const dotenv = require("dotenv").config();

const keys = require("./keys.js");

const Spotify = require("node-spotify-api");

const Twitter = require("twitter");

const request = require("request");

const chalk = require('chalk');

// Setting up variables

const spotify = new Spotify(keys.spotify);

const twitter = new Twitter(keys.twitter);

const nodeArgs = process.argv;

const command = nodeArgs[2];

let input = "";

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      input = input + "+" + nodeArgs[i];
    }
  
    else {
      input += nodeArgs[i];
    }
}

// Switch statement for the app to decide what to do

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

// shows your last 20 tweets and when they were created at in your terminal/bash window.
function myTweets() {
    let params = {screen_name: '_callmelight'};
    
    twitter.get('statuses/user_timeline', params,(error, tweets, response) => {
        if (!error) {
        
            for (i=0; i < 20; i++) {
                let number = parseInt(i) + 1;
                let date = tweets[i].created_at;
                let tweet = tweets[i].text;

                console.log(chalk.red("Tweet " + number + " created on " + date + ": ") + tweet);
            }
        }
    });
};

// show the following information about the song in your terminal/bash window: 1) Artist(s), 2) the song's name, 3) a preview link of the song from spotify, 4) the album, 5) if no song is provided then it will default to 'the sign' by ace of base
function spotifySong() {

};

// output the movie information to your terminal/bash window. If no movie is specified, log the data for Mr. Nobody
function movieThis() {

    function logData(body) {
        let bodyParsed = JSON.parse(body);

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

    if (input == "") {
        let movie = "Mr.+Nobody";

        request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", (error, response, body) => {
            if (!error && response.statusCode === 200) {
                logData(body);
            }    
        });
    }

    else {
        request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", (error, response, body) => {

            if (!error && response.statusCode === 200) {
                logData(body);
            }
        });
    }
};

// Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands. It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`. Feel free to change the text in that document to test out the feature for other commands
function doIt() {

};