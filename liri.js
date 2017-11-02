var command = process.argv[2];
var title = process.argv[3];

var keys = require('./keys.js');
var request = require('request');
var access_token_key = '405863235-iUsIUDIKFDb9Q4i46qMoig0IAOCamOFXC4D4vKN6';
var inquirer = require('inquirer');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');



// Do What It Says
// -----------------------------------------------------
if (command === "do-what-it-says") {

fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }
  var dataArr = data.split(",");

  command = dataArr[0];
  title = dataArr[1];

  if (command === "spotify-this-song") {
  	runSpotify();
  }

});
}



// Spotify
// ---------------------------------------------------

 function runSpotify(){
var spotify = new Spotify({
  id: "19ecbc105f584c7898c55f0b85a510ab",
  secret: "4a7bfac60e7f4bc28ec6c81be2cd498b"
});

if (command === "spotify-this-song") {
 
spotify.search({ type: 'track', query: title, limit: '5' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

  for (i = 0; i < 2; i++) {

  var artists = data.tracks.items[i].artists;

  console.log("Result #" + (i+1));
  console.log("Artist(s):" );
  for (var j = 0; j < artists.length; j++) {
  	console.log(data.tracks.items[i].artists[j].name);
  }
	console.log("Track name: " + data.tracks.items[i].name); 
	console.log("Preview URL: " + data.tracks.items[i].preview_url);
	console.log("Album name: " + data.tracks.items[i].album.name);
	console.log("--------------------------------------");
}
});
}
}

// Twitter
// ------------------------------------------------------


if (command === "my-tweets") {

var client = new Twitter({
  consumer_key: 'VofeShouqqzsEXp9vac1iP8nz',
  consumer_secret: 'ca8SL22dYX8jrWpYnycU8DQaXJIeTqpTSmutVpyNbMOxi5Iguw',
  access_token_key: '405863235-iUsIUDIKFDb9Q4i46qMoig0IAOCamOFXC4D4vKN6',
  access_token_secret: 'LkkI4M58OYB8MWnlRIQYPGxM6wSstwLo9oSQpqzvJ5Anb'
});
 
var params = {screen_name: 'tycbold19'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for (var i = 0; i < 20; i++) {
  	
  	console.log("Tweet #" + (i+1));
  	console.log(tweets[i].created_at);
    console.log(tweets[i].text); 
    console.log("-----------------------------");   
}
  }
  else {
  	console.log("Process Failed");
  }
});

}



// OMDB
// ---------------------------------------------------------
if (command === "movie-this") {

	inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "What movie would you like to search?",
      name: "title"
    }
    ])
  .then(function(response) {
  	var titleSearch = response.title;
  	if (response.title == "") {
  		titleSearch = "Mr. Nobody";
  	}

  	request("http://www.omdbapi.com/?t=" + titleSearch + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    console.log("Title: " + JSON.parse(body).Title);    
    console.log("Year: " + JSON.parse(body).Year);    
    console.log("imdb Rating: " + JSON.parse(body).imdbRating);     
    console.log("Rotten Tomatoes score: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);    
    console.log("Actors: " + JSON.parse(body).Actors);
  }
});
  });
}

runSpotify();


