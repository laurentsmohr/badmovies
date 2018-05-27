import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      selectedGenreID: 12
    };
    this.selectChange = this.selectChange.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    axios.get('/genres')
    .then(response => {
      this.setState({
        genres: response.data
      })
    })
    .catch(err => {
      console.error(err);
    })
  }
  
  selectChange(e) {
    this.setState({
      selectedGenreID: e.target.value
    })
  }
  
  search() {
    this.props.getMovies(this.state.selectedGenreID);
    this.props.swapFavorites();
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        <select onChange={this.selectChange}>
          {this.state.genres.map(genre => {
            return <option key={genre.id} value={genre.id}>{genre.name}</option>;
          })}
        </select>
        <br/><br/>

        <button onClick={this.search}>Search</button>

      </div>
    );
  }
}

export default Search;