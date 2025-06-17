import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      isLoading: false,
      emailFocus: false,
      passwordFocus: false,
      usernameFocus: false,
      confirmPasswordFocus: false
    };
  }

  handleChange = (event) => {
    this.setState({ 
      [event.target.name]: event.target.value,
      errorMessage: '' // Clear error message when user types
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = this.state;
    
    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      this.setState({ errorMessage: 'Please fill in all fields.' });
      return;
    }

    // Username validation
    if (username.length < 3) {
      this.setState({ errorMessage: 'Username must be at least 3 characters long.' });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.setState({ errorMessage: 'Please enter a valid email address.' });
      return;
    }

    // Password validation
    if (password.length < 6) {
      this.setState({ errorMessage: 'Password must be at least 6 characters long.' });
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      this.setState({ errorMessage: 'Passwords do not match.' });
      return;
    }

    this.setState({ isLoading: true, errorMessage: '' });

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      if (this.props.onRegisterUser) {
        this.props.onRegisterUser({ email, password });
      }
      if (this.props.onAuthSuccess) {
        this.props.onAuthSuccess();
      }
    } catch (error) {
      this.setState({ 
        errorMessage: 'Signup failed. Please try again.',
        isLoading: false 
      });
    }
  }

  handleFocus = (field) => {
    this.setState({ [`${field}Focus`]: true });
  }

  handleBlur = (field) => {
    this.setState({ [`${field}Focus`]: false });
  }

  render() {
    const { 
      username, 
      email, 
      password,
      confirmPassword,
      errorMessage, 
      isLoading,
      emailFocus,
      passwordFocus,
      usernameFocus,
      confirmPasswordFocus
    } = this.state;

    return (
      <div className="login-container">
        <div className="login-form">
          <h2 className="login-title">Create Account</h2>
          <p className="login-subtitle">Join us to find your dream job</p>
          
          <form onSubmit={this.handleSubmit} className="login-form-content">
            <div className={`form-group ${usernameFocus ? 'focused' : ''}`}>
              <label>Username</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  onFocus={() => this.handleFocus('username')}
                  onBlur={() => this.handleBlur('username')}
                  placeholder="Choose a username"
                  required
                />
                <span className="input-icon">👤</span>
              </div>
            </div>

            <div className={`form-group ${emailFocus ? 'focused' : ''}`}>
              <label>Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  onFocus={() => this.handleFocus('email')}
                  onBlur={() => this.handleBlur('email')}
                  placeholder="Enter your email"
                  required
                />
                <span className="input-icon">✉️</span>
              </div>
            </div>

            <div className={`form-group ${passwordFocus ? 'focused' : ''}`}>
              <label>Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  onFocus={() => this.handleFocus('password')}
                  onBlur={() => this.handleBlur('password')}
                  placeholder="Create a password"
                  required
                />
                <span className="input-icon">🔒</span>
              </div>
            </div>

            <div className={`form-group ${confirmPasswordFocus ? 'focused' : ''}`}>
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleChange}
                  onFocus={() => this.handleFocus('confirmPassword')}
                  onBlur={() => this.handleBlur('confirmPassword')}
                  placeholder="Confirm your password"
                  required
                />
                <span className="input-icon">🔒</span>
              </div>
            </div>

            {errorMessage && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {errorMessage}
              </div>
            )}

            <button 
              type="submit" 
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Creating Account...
                </>
              ) : (
                'Sign Up'
              )}
            </button>

            <div className="login-footer">
              <p>
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={this.props.onSwitchToLogin}
                  className="switch-button"
                >
                  Login here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
