import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistNameInputValue: '',
      isButtonDisabled: true,
    };
  }

  handleButton = () => {
    const MINIMUM_CHARACTER = 2;
    const { artistNameInputValue } = this.state;
    const isDisable = artistNameInputValue.length < MINIMUM_CHARACTER;
    this.setState({
      isButtonDisabled: isDisable,
    });
  }

  handleArtistName = ({ target }) => {
    this.setState({
      artistNameInputValue: target.value,
    }, this.handleButton);
  }

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <input
            type="search"
            onChange={ this.handleArtistName }
            data-testid="search-artist-input"
            placeholder="Pesquisar artista"
          />
          <input
            type="button"
            disabled={ isButtonDisabled }
            data-testid="search-artist-button"
            value="Pesquisar"
          />
        </div>
      </>
    );
  }
}

export default Search;
