// import PropTypes from 'prop-types';
import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isLoading: false,
    };
  }

  // ARRUMAR AQUI DEPOIS QUE TERMINAR
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

  render() {
    const { userName, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        Header
        <span data-testid="header-user-name">
          { isLoading ? <Loading /> : userName }
        </span>
      </header>
    );
  }
}

export default Header;
