import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistNameInputValue: '',
      isButtonDisabled: true,
      isLoading: false,
      didSearched: false,
      albums: [],
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

  handleSearchContent = () => {
    const { isLoading, albums, didSearched } = this.state;
    if (!albums.length && didSearched) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    if (albums && didSearched) {
      return isLoading ? <Loading /> : this.createAlbums(albums);
    }
  }

  getData = async (event) => {
    const { artistNameInputValue } = this.state;
    const artistNameFormatted = this.validateArtistName(artistNameInputValue);
    this.switchIsLoading();
    this.switchDidSearched();
    this.clearInput(event);
    const data = await searchAlbumsAPI(artistNameFormatted);
    this.switchIsLoading();
    this.setAlbums(data);
  }

  setAlbums(albums) {
    this.setState({
      albums,
    });
  }

  validateArtistName = (artistName) => {
    if (artistName.includes(' ')) {
      artistName.replace(' ', '%20');
    }
    return artistName;
  }

  switchIsLoading = (value) => {
    const { isLoading } = this.state;
    this.setState({
      isLoading: (value !== undefined) ? value : !isLoading,
    });
  };

  switchDidSearched = (value) => {
    const { didSearched } = this.state;
    this.setState({
      didSearched: (value !== undefined) ? value : !didSearched,
    });
  };

  createAlbums = (albums) => {
    const { artistNameInputValue } = this.state;
    return (
      <>
        <p>{ `Resultado de álbuns de: ${artistNameInputValue}` }</p>
        {albums.map((album, i) => {
          const { collectionId } = album;
          const PATH = `/album/${collectionId}`;
          const TEST_ID = `link-to-album-${collectionId}`;
          return (
            <Link key={ i } to={ PATH } data-testid={ TEST_ID }>
              <div>
                <img src={ album.artworkUrl100 } alt="album art" />
                <p>{ album.collectionName }</p>
                <p>{ album.artistName }</p>
              </div>
            </Link>
          );
        })}
      </>
    );
  }

  clearInput({ target }) {
    const input = target.previousElementSibling;
    input.value = '';
  }

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <div>
            <input
              type="search"
              onChange={ this.handleArtistName }
              data-testid="search-artist-input"
              placeholder="Pesquisar artista"
            />
            <input
              type="button"
              disabled={ isButtonDisabled }
              onClick={ this.getData }
              data-testid="search-artist-button"
              value="Pesquisar"
            />
          </div>
          { this.handleSearchContent() }
        </div>
      </>
    );
  }
}

export default Search;
