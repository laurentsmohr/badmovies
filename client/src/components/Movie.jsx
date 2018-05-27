import React from 'react';


const Movie = ({movie, clickHandler}) => (
    <li onClick={() => clickHandler(movie)} className="movie_item">
        <img src={movie.poster}/>
        <div className="movie_description">
        <h2>{movie.title}</h2>
        <section className="movie_details">
            <div className="movie_year">
            <span className="title">Year</span>
            <span>{movie.year}</span>
            </div>
            <div className="movie_rating">
            <span className="title">Popularity</span>
            <span>{movie.popularity}</span>
            </div>
        </section>
        </div>
    </li>
)


export default Movie;