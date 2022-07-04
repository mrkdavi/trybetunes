import React from 'react';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { albumInfo } = this.props;
    const { artworkUrl100, collectionName, artistName } = albumInfo;
    return (
      <div>
        <img src={ artworkUrl100 } alt="album cover" />
        <p data-testid="album-name">{ collectionName }</p>
        <p data-testid="artist-name">{ artistName }</p>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  track: PropTypes.object,
}.required;

export default AlbumCard;
