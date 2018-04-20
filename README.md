# Liri Node App

* How to use the app
1. In terminal/command, use Node JS to enter one of the following commands: 
    a. my-tweets: shows your 20 most recent tweets with timestamps
    b. movie-this, followed by a movie name: returns data about the movie you enter (if no movie is entered, the app will default to Mr. Nobody)
    c. spotify-this-song, followed by a song name: returns data about the song you enter (if no song is entered, the app will default to The Sign)
    d. do-what-it-says: the app reads a random.txt file and executes the text as a command line 

* What the app does
1. The app follows a switch statement that reads the command entered by the user and initiates one of four functions
2. Each function takes a command argument and an optional input argument
3. My-tweets pulls on a Twitter module to access the user's recent tweets, which are then limited to the first 20 and logged along with a timestamp
3. Movie-this uses OMDB's API to find data about the movie entered, and traverses the data to return relevant movie information to the console
4. Spotify-this-song uses a Spotify module to access songs by the same name as the input argument. It reads the first result and traverses the response to return relevant information about the song
5. Do-what-it-says reads a text file using the FS module, and converts the text into a command and input. Based on the command, it executes the same switch function that a regular command line would trigger

* Technologies used
1. Vanilla Javascript
2. Node JS
3. Multiple modules (not including dependencies):
    a. Chalk for text color
    b. Twitter 
    c. Node-spotify-API
    d. OMDB API, accessed with Request
4. Developer access keys for Twitter and Spotify, housed in a .env file (user will need to supply their own .env file)
5. Dotenv to read the .env file

* Limitations
1. The do-what-it-says functionality is repetitive code
2. The song request cannot specify artist, and thus may not be an exact match