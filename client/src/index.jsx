import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx';
import Movies from './components/Movies.jsx';

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };
    
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }


  componentDidMount() {
    this.getMovies(28);
    this.getFavorites();
  }

  getFavorites() {
    axios.get('/favorites')
    .then(res => {
      this.setState({
        favorites: res.data
      })
    }).catch(err => {
      console.error('error getting favs', err);
    })
  }

  getMovies(genre_id) {
    axios.post('/search', {
      genre: genre_id
    })
    .then(res => {
      var compressed = res.data.results.map(movie => {
        var posterUrl = movie.poster_path !== null ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'http://colovma.org/wp-content/uploads/sites/3/2016/08/Placeholder_Hero-Temp-500x700.png';
        var movieYear = movie.release_date === null ? 'n.a.' : movie.release_date.substring(0, 4);
        var movieObj = {
          id: movie.id,
          title: movie.title,
          popularity: Math.floor(movie.popularity),
          poster: posterUrl,
          year: movie.release_date.substring(0, 4)
        };
        return movieObj;
      })   
      this.setState({
        movies: compressed
      })
    })
    .catch(err => {
      console.error(err);
    })
  }

  saveMovie(movie) {
    axios.post('/save', {
      movie: movie
    })
    .then(res => {
      this.getFavorites();    
    })
    .catch(err => {
      console.error(err);
    })
  }

  deleteMovie(movie) {
    axios.post('/delete', {
      movie: movie
    })
    .then(res => {
      this.getFavorites();    
    })
    .catch(err => {
      console.error(err);
    })
  }

  clickHandler(movie) {
    if(this.state.showFaves) {
      this.deleteMovie(movie);
    } else {
      this.saveMovie(movie);
    }
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves} clickHandler={this.clickHandler}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));