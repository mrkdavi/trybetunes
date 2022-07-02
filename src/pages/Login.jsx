import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameInputValue: '',
      isButtonDisabled: true,
      isLoading: false,
    };
  }

  componentDidMount() {
    sessionStorage.clear();
    localStorage.clear();
  }

  handleButton = () => {
    const MINIMUM_CHARACTER = 3;
    const { nameInputValue } = this.state;
    const isDisable = nameInputValue.length < MINIMUM_CHARACTER;
    this.setState({
      isButtonDisabled: isDisable,
    });
  }

  handleName = ({ target }) => {
    this.setState({
      nameInputValue: target.value,
    }, this.handleButton);
  }

  switchIsLoading = () => {
    const { isLoading } = this.state;
    this.setState({
      isLoading: !isLoading,
    });
  }

  handleRedirect = () => {
    const { history } = this.props;
    history.push('/search');
  }

  resetState = () => {
    this.setState({
      nameInputValue: '',
      isButtonDisabled: true,
      isLoading: false,
    });
  }

  handleSubmit = async () => {
    try {
      const { nameInputValue } = this.state;
      this.switchIsLoading();
      await createUser({ name: nameInputValue });
      this.switchIsLoading();
      this.handleRedirect();
    } catch {
      console.error('User not registered!');
      this.resetState();
    }
  }

  render() {
    const { isButtonDisabled, isLoading } = this.state;
    return (isLoading) ? <Loading /> : (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            placeholder="Nome"
            onChange={ this.handleName }
            data-testid="login-name-input"
          />
          <input
            type="button"
            disabled={ isButtonDisabled }
            onClick={ this.handleSubmit }
            data-testid="login-submit-button"
            value="Entrar"
          />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
