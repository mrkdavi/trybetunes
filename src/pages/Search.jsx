import React from 'react';
import { Link } from 'react-router-dom';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistNameInputValue: '',
      artistName: '',
      isButtonDisabled: true,
      isLoading: false,
      didSearch: false,
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

  setArtistNameSearched = (value) => {
    this.setState({
      artistName: value,
    }, this.handleButton);
  }

  handleSearchContent = () => {
    const { isLoading, albums, didSearch } = this.state;
    if (!albums.length && didSearch && !isLoading) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    if (albums && didSearch) {
      return isLoading ? <Loading /> : this.createAlbums(albums);
    }
  }

  getData = async (event) => {
    const artistNameInputValue = event.target.previousElementSibling.value;
    this.setArtistNameSearched(artistNameInputValue);
    this.switchIsLoading();
    this.switchDidSearch(true);
    this.clearInput(event);
    const data = await searchAlbumsAPI(artistNameInputValue);
    this.switchIsLoading();
    this.setAlbums(data);
  }

  setAlbums(albums) {
    this.setState({
      albums,
    });
  }

  switchIsLoading = (value) => {
    const { isLoading } = this.state;
    this.setState({
      isLoading: (value !== undefined) ? value : !isLoading,
    });
  };

  switchDidSearch = (value) => {
    const { didSearch } = this.state;
    this.setState({
      didSearch: (value !== undefined) ? value : !didSearch,
    });
  };

  createAlbums = (albums) => {
    const { artistName } = this.state;
    return (
      <>
        <p>{ `Resultado de álbuns de: ${artistName}` }</p>
        {albums.map((album, i) => {
          const { collectionId } = album;
          const PATH = `/album/${collectionId}`;
          const TEST_ID = `link-to-album-${collectionId}`;
          return (
            <Link key={ i } to={ PATH } data-testid={ TEST_ID }>
              <AlbumCard albumInfo={ album } />
            </Link>
          );
        })}
      </>
    );
  }

  clearInput({ target }) {
    const input = target.previousElementSibling;
    input.value = '';
    this.setState({
      artistNameInputValue: '',
    });
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
