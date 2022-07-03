// import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

import '../styles/header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isLoading: false,
    };
  }

  // ARRUMAR AQUI DEPOIS QUE TERMINAR
  // BOTAR O getUser DENTRO DO IF
  async componentDidMount() {
    const KEY = 'currentUser';
    this.switchIsLoading();
    const user = await getUser();
    if (!sessionStorage.key(KEY)) {
      sessionStorage.setItem(KEY, user.name);
    }
    const userName = sessionStorage.getItem(KEY);
    this.setState({
      userName,
    }, this.switchIsLoading(false));
  }

  switchIsLoading = (value) => {
    const { isLoading } = this.state;
    this.setState({
      isLoading: (value !== undefined) ? value : !isLoading,
    });
  };

  loadingElement = () => (
    <span className="header-loading">
      <Loading />
    </span>
  )

  render() {
    const { userName, isLoading } = this.state;
    return (
      <header className="header" data-testid="header-component">
        <div>
          <span>MyJam</span>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </div>

        <span data-testid="header-user-name">
          { isLoading ? this.loadingElement() : userName }
        </span>
      </header>
    );
  }
}

export default Header;
