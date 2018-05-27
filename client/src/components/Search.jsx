import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      genreIDs: {}
    };
    this.getGenres = this.getGenres.bind(this);
  }
  getGenres() {
    axios.get('/genres')
    .then(response => {
      console.log('getGenres response: ', response);
      var idObj = {};
      var genreArr = [];
      response.forEach(genre => {
        genreArr.push(genre.name);
        idObj[genre.name] = genre.id;
      });
      this.setState({
        genres: genreArr,
        genreIDs: idObj
      })
    })
    .catch(err => {
      console.error(err);
    })
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select>
          <option value="theway">The Way</option>
          <option value="thisway">This Way</option>
          <option value="thatway">That Way</option>
        </select>
        <br/><br/>

        <button>Search</button>

      </div>
    );
  }
}

export default Search;