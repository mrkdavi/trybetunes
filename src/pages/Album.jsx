import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import AlbumCard from '../components/AlbumCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      album: [],
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    try {
      const { match: { params: { id } } } = this.props;
      const album = await getMusics(id);
      const songs = await getFavoriteSongs();
      this.setFavoriteSongs(songs);
      this.setState({
        album,
        isLoading: false,
      });
    } catch (e) {
      console.error(e);
      const { history } = this.props;
      history.push('/search');
    }
  }

  setFavoriteSongs = (songs) => {
    this.setState({
      favoriteSongs: songs,
    });
  }

  itsFavorite = (track) => {
    const { favoriteSongs } = this.state;
    return !!favoriteSongs.find((favoriteSong) => favoriteSong.trackId === track.trackId);
  }

  render() {
    const {
      album,
      isLoading,
    } = this.state;
    const [albumInfo, ...tracks] = album;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          {
            isLoading ? <Loading /> : (
              <>
                <AlbumCard albumInfo={ albumInfo } />
                {
                  tracks.map((track) => (
                    <MusicCard
                      key={ track.trackId }
                      track={ track }
                      isFavoriteSong={ this.itsFavorite(track) }
                    />
                  ))
                }
              </>
            )
          }
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.required;

export default Album;
