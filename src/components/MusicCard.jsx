import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isFavorite: false,
    };
  }

  handleFavorite = async () => {
    const { track } = this.props;
    this.switchIsLoading();
    await addSong(track);
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
        <label htmlFor="favoriteCheck">
          <span>Favorita</span>
          <input
            id="favoriteCheck"
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
}.required;

export default MusicCard;
