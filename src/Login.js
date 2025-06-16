import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    // Basic validation example
    if (!email || !password) {
      this.setState({ errorMessage: 'Please enter both email and password.' });
      return;
    }
    this.setState({ errorMessage: '' });
    // Call onAuthSuccess callback if provided
    if (this.props.onAuthSuccess) {
      this.props.onAuthSuccess();
    }
  }

  render() {
    const { email, password, errorMessage } = this.state;
    return (
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email:</label><br />
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label><br />
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </div>
          {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{' '}
          <button onClick={this.props.onSwitchToSignup} style={{background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer', padding: 0}}>
            Signup here
          </button>
        </p>
      </div>
    );
  }
}

export default Login;
