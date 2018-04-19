// Setting up required modules
const dotenv = require("dotenv").config();

const keys = require("./keys.js");

const Spotify = require("node-spotify-api");

const Twitter = require("twitter");

const request = require("request");

// Setting up variables

const spotify = new Spotify(keys.spotify);

const twitter = new Twitter(keys.twitter);

const command = process.argv[2];

const input = process.argv[3];

console.log(keys);

console.log(spotify);

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

// show your last 20 tweets and when they were created at in your terminal/bash window.
function myTweets() {

};

// show the following information about the song in your terminal/bash window: 1) Artist(s), 2) the song's name, 3) a preview link of the song from spotify, 4) the album, 5) if no song is provided then it will default to 'the sign' by ace of base
function spotifySong() {

};

// output the following information to your terminal/bash window: Title of the movie, Year the movie came out, IMDB Rating of the movie, Rotten Tomatoes Rating of the movie, Country where the movie was produced, Language of the movie, Plot of the movie, Actors in the movie. If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
function movieThis() {
    request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

        
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        }
    });
};

// Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands. It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`. Feel free to change the text in that document to test out the feature for other commands
function doIt() {

};