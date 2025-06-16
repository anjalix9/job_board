import './App.css';
import React, { Component } from 'react';
import Login from './Login';
import Signup from './Signup';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'login' // 'login', 'signup', 'home'
    };
  }

  handleSwitchToSignup = () => {
    this.setState({ currentView: 'signup' });
  }

  handleSwitchToLogin = () => {
    this.setState({ currentView: 'login' });
  }

  handleAuthSuccess = () => {
    this.setState({ currentView: 'home' });
  }

  render() {
    const { currentView } = this.state;

    if (currentView === 'login') {
      return (
        <div className="App">
          <header className="App-header">
            <h1>Job Board</h1>
            <p>Find your dream job or post a new opportunity.</p>
          </header>
          <main>
            <Login
              onSwitchToSignup={this.handleSwitchToSignup}
              onAuthSuccess={this.handleAuthSuccess}
            />
          </main>
          <footer>
            <p>© 2025 Job Board App. All rights reserved.</p>
          </footer>
        </div>
      );
    }

    if (currentView === 'signup') {
      return (
        <div className="App">
          <header className="App-header">
            <h1>Job Board</h1>
            <p>Find your dream job or post a new opportunity.</p>
          </header>
          <main>
            <Signup
              onSwitchToLogin={this.handleSwitchToLogin}
              onAuthSuccess={this.handleAuthSuccess}
            />
          </main>
          <footer>
            <p>© 2025 Job Board App. All rights reserved.</p>
          </footer>
        </div>
      );
    }

    // currentView === 'home'
    return (
      <div className="App">
        <header className="App-header">
          <h1>Job Board</h1>
          <p>Find your dream job or post a new opportunity.</p>
        </header>
        <main>
          <section className="job-listings">
            <h2>Available Jobs</h2>
            <ul>
              <li>
                <h3>Frontend Developer</h3>
                <p>Company: Tech Solutions</p>
                <p>Location: Remote</p>
                <button>Apply</button>
              </li>
              <li>
                <h3>Backend Engineer</h3>
                <p>Company: CloudNet</p>
                <p>Location: Bangalore</p>
                <button>Apply</button>
              </li>
              {/* Add more job items here */}
            </ul>
          </section>
        </main>
        <footer>
          <p>© 2025 Job Board App. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}

export default App;
