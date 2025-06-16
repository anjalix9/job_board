import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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
    const { name, email, password } = this.state;
    // Basic validation example
    if (!name || !email || !password) {
      this.setState({ errorMessage: 'Please fill in all fields.' });
      return;
    }
    this.setState({ errorMessage: '' });
    // Call onAuthSuccess callback if provided
    if (this.props.onAuthSuccess) {
      this.props.onAuthSuccess();
    }
  }

  render() {
    const { name, email, password, errorMessage } = this.state;
    return (
      <div className="signup-form">
        <h2>Signup</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name:</label><br />
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              required
            />
          </div>
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
          <button type="submit">Signup</button>
        </form>
        <p>
          Already have an account?{' '}
          <button onClick={this.props.onSwitchToLogin} style={{background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer', padding: 0}}>
            Login here
          </button>
        </p>
      </div>
    );
  }
}

export default Signup;
