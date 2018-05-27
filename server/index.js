var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var {API_KEY} = require('./config.js');
var db = require('./database.js');
var axios = require('axios');
var app = express();


var apiHelpers = require('./apiHelpers.js');

app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));

app.post('/search', function(req, res) {
    var genre = req.body.genre ;    
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.asc&include_adult=false&include_video=false&page=1&with_genres=${genre}`)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
        console.error('get movie by genre: ', err);    
    })
});

app.get('/genres', function(req, res) {
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(response => {
        res.status(200).send(response.data.genres);
    })
    .catch(err => {
        console.error(err);
        res.status(400).send("Failed getting genres");
    })
});

app.post('/save', function(req, res) {
  db.saveFavorite(req.body.movie, (err) => {
      if(err) res.status(400).send("saving failed");
      else res.status(201).send(`Saved ${req.body.movie.title}`);
  })
}); 

app.post('/delete', function(req, res) {
    db.deleteFavorite(req.body.movie.id, (err, result) => {
        if (err) res.status(400).send('error deleting movie');
        else res.status(200).send(result);
    })

});

app.get('/favorites' , function(req, res) {
    db.getAllFavorites((err, results) => {
      if (err) res.status(400).send('error retrieving favorites');
      else res.status(200).send(results); 
    })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});