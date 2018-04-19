// Setting up required modules
const dotenv = require("dotenv").config();

const keys = require("./keys.js");

const Spotify = require("node-spotify-api");

const Twitter = require("twitter");

// Setting up variables

const spotify = new Spotify(keys.spotify);

const twitter = new Twitter(keys.twitter);

console.log(keys);

console.log(spotify);