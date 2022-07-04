import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      album: [],
    };
  }

  async componentDidMount() {
    try {
      const { match: { params: { id } } } = this.props;
      const album = await getMusics(id);
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

  render() {
    const {
      album,
      isLoading,
    } = this.state;
    const [albumInfo, ...tracks] = album;
    console.log('aqui', albumInfo, tracks);

    return (
      <>
        <Header />
        <div data-testid="page-album">
          { isLoading ? <Loading /> : (
            <>
              <div>
                <img src={ albumInfo.artworkUrl100 } alt="album art" />
                <p data-testid="album-name">{ albumInfo.collectionName }</p>
                <p data-testid="artist-name">{ albumInfo.artistName }</p>
              </div>
              <div>
                { tracks.map((track, i) => {
                  const { previewUrl } = track;
                  const TEST_ID = 'audio-component';
                  return (
                    <div key={ i }>
                      <p>{ track.trackName }</p>
                      <audio data-testid={ TEST_ID } src={ previewUrl } controls>
                        <track kind="captions" />
                        O seu navegador não suporta o elemento
                        {' '}
                        <code>audio</code>
                        .
                      </audio>
                    </div>
                  );
                }) }
              </div>
            </>) }
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.required;

export default Album;
