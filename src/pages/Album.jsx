import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import AlbumCard from '../components/AlbumCard';

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

    return (
      <>
        <Header />
        <div data-testid="page-album">
          {
            isLoading ? <Loading /> : (
              <>
                <AlbumCard albumInfo={ albumInfo } />
                {
                  tracks.map((track, i) => (
                    <MusicCard key={ i } track={ track } />
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
