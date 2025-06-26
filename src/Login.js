import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      isLoading: false,
      showPassword: false,
      emailFocus: false,
      passwordFocus: false
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
    const { email, password } = this.state;
    const { registeredUser } = this.props;
    
    // Hardcoded credentials
    const allowedEmail = 'user@example.com';
    const allowedPassword = 'password123';

    // Basic validation
    if (!email || !password) {
      this.setState({ errorMessage: 'Please enter both email and password.' });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.setState({ errorMessage: 'Please enter a valid email address.' });
      return;
    }

    // Password length validation
    if (password.length < 6) {
      this.setState({ errorMessage: 'Password must be at least 6 characters long.' });
      return;
    }

    this.setState({ isLoading: true, errorMessage: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const isHardcoded = email === allowedEmail && password === allowedPassword;
      const isRegistered = registeredUser && email === registeredUser.email && password === registeredUser.password;

      if (isHardcoded || isRegistered) {
        if (this.props.onAuthSuccess) {
          this.props.onAuthSuccess();
        }
      } else {
        this.setState({ 
          errorMessage: 'Invalid email or password. Please try again.',
          isLoading: false 
        });
      }
    } catch (error) {
      this.setState({ 
        errorMessage: 'Login failed. Please check your connection and try again.',
        isLoading: false 
      });
    }
  }

  togglePasswordVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  }

  handleFocus = (field) => {
    this.setState({ [`${field}Focus`]: true });
  }

  handleBlur = (field) => {
    this.setState({ [`${field}Focus`]: false });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  render() {
    const { 
      email, 
      password, 
      errorMessage, 
      isLoading, 
      showPassword,
      emailFocus,
      passwordFocus
    } = this.state;

    return (
      <div className="login-container">
        <div className="login-form">
          <h2 className="login-title">Welcome Back!</h2>
          <p className="login-subtitle">Sign in to continue to your account</p>
          
          <form onSubmit={this.handleSubmit} className="login-form-content">
            <div className={`form-group ${emailFocus ? 'focused' : ''}`}>
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  onFocus={() => this.handleFocus('email')}
                  onBlur={() => this.handleBlur('email')}
                  onKeyPress={this.handleKeyPress}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                />
                <span className="input-icon">✉️</span>
              </div>
            </div>

            <div className={`form-group ${passwordFocus ? 'focused' : ''}`}>
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  onFocus={() => this.handleFocus('password')}
                  onBlur={() => this.handleBlur('password')}
                  onKeyPress={this.handleKeyPress}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <span className="input-icon">🔒</span>
                <button 
                  type="button"
                  className="toggle-password"
                  onClick={this.togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="error-message" role="alert">
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
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="login-footer">
              <p>
                Don't have an account?{' '}
                <button 
                  type="button"
                  onClick={this.props.onSwitchToSignup}
                  className="switch-button"
                >
                  Sign up here
                </button>
              </p>
              <div className="demo-credentials">
                <p><strong>Demo Credentials:</strong></p>
                <p>Email: user@example.com</p>
                <p>Password: password123</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
