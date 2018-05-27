const mysql = require('mysql');
const {db} = require('./config.js');

const connection = mysql.createConnection(db);

const getAllFavorites = function(callback) {
  let queryStr = 'SELECT * FROM movies;'
  connection.query(queryStr, function(err, results) {
    if (err) callback(err, null);
    else callback(null, results);
  })
};

const saveFavorite = function(movie, callback) {
  let queryStr = `INSERT INTO movies VALUES (${movie.id}, '${movie.title}', '${movie.poster}', ${movie.popularity}, ${movie.year});`
  connection.query(queryStr, function(err, results) {
    if (err) callback(err);
    else callback();
  })
};

const deleteFavorite = function(movieID, callback) {
  let queryStr = `DELETE FROM movies WHERE id=${movieID};`
  connection.query(queryStr, function(err, results) {
    if (err) callback(err, null);
    else callback(null, results);
  })
};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorite
};