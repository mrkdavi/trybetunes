import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isFavorite: false,
    };
  }

  componentDidMount() {
    const { isFavoriteSong } = this.props;
    this.setState({
      isFavorite: isFavoriteSong,
    });
  }

  handleFavorite = async () => {
    const { isFavorite } = this.state;
    const { track } = this.props;
    this.switchIsLoading();
    try {
      if (!isFavorite) {
        await addSong(track);
      } else {
        await removeSong(track);
      }
    } catch (e) {
      console.error(e.message);
    }
    this.switchIsLoading();
    this.switchIsFavorite();
  }

  switchIsLoading = () => {
    const { isLoading } = this.state;
    this.setState({
      isLoading: !isLoading,
    });
  };

  switchIsFavorite = () => {
    const { isFavorite } = this.state;
    this.setState({
      isFavorite: !isFavorite,
    });
  };

  cardContent = () => {
    const TEST_ID = 'audio-component';
    const { isFavorite } = this.state;
    const { track } = this.props;
    const { previewUrl, trackName, trackId } = track;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid={ TEST_ID } src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `favorite-check-${trackId}` }>
          <span>Favorita</span>
          <input
            id={ `favorite-check-${trackId}` }
            type="checkbox"
            checked={ isFavorite }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleFavorite }
          />
        </label>
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : this.cardContent();
  }
}

MusicCard.propTypes = {
  track: PropTypes.object,
  isFavoriteSong: PropTypes.bool,
}.required;

export default MusicCard;
