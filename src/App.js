import './App.css';
import React, { Component } from 'react';
import Login from './Login';
import Signup from './Signup';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'login',
      searchQuery: '',
      selectedCategory: 'all',
      isLoading: false,
      activeNav: 'home',
      showApplications: false,
      showProfile: false,
      jobs: [
        {
          id: 1,
          title: 'Frontend Developer',
          company: 'Tech Solutions',
          location: 'Remote',
          category: 'development',
          salary: '₹80k - ₹120k',
          description: 'Looking for an experienced frontend developer...'
        },
        {
          id: 2,
          title: 'Backend Engineer',
          company: 'CloudNet',
          location: 'Bangalore',
          category: 'development',
          salary: '₹90k - ₹130k',
          description: 'Join our growing backend team...'
        },
        {
          id: 3,
          title: 'UI/UX Designer',
          company: 'DesignHub',
          location: 'New York',
          category: 'design',
          salary: '₹70k - ₹100k',
          description: 'Create beautiful user experiences...'
        }
      ],
      appliedJobs: [],
      userProfile: {
        name: 'John Doe',
        email: 'john@example.com',
        skills: ['React', 'JavaScript', 'Node.js'],
        experience: '5 years'
      },
      editingProfile: false,
      editedProfile: null,
      registeredUser: null
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

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  }

  handleCategoryChange = (category) => {
    this.setState({ selectedCategory: category });
  }

  handleApply = (jobId) => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      const job = this.state.jobs.find(j => j.id === jobId);
      this.setState(prevState => ({
        isLoading: false,
        appliedJobs: [...prevState.appliedJobs, job],
        activeNav: 'applications'
      }));
      alert('Application submitted successfully!');
    }, 1000);
  }

  handleNavClick = (navItem) => {
    this.setState({ 
      activeNav: navItem,
      showApplications: navItem === 'applications',
      showProfile: navItem === 'profile'
    });
  }

  handleLogout = () => {
    this.setState({ 
      currentView: 'login',
      activeNav: 'home',
      showApplications: false,
      showProfile: false
    });
  }

  getFilteredJobs = () => {
    const { jobs, searchQuery, selectedCategory } = this.state;
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  handleEditProfile = () => {
    this.setState({
      editingProfile: true,
      editedProfile: { ...this.state.userProfile }
    });
  };

  handleProfileChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      editedProfile: {
        ...prevState.editedProfile,
        [name]: value
      }
    }));
  };

  handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(s => s.trim());
    this.setState(prevState => ({
      editedProfile: {
        ...prevState.editedProfile,
        skills
      }
    }));
  };

  handleSaveProfile = () => {
    this.setState(prevState => ({
      userProfile: { ...prevState.editedProfile },
      editingProfile: false,
      editedProfile: null
    }));
  };

  handleCancelEdit = () => {
    this.setState({ editingProfile: false, editedProfile: null });
  };

  handleRegisterUser = (user) => {
    this.setState({ registeredUser: user });
  };

  renderProfile = () => {
    const { userProfile, editingProfile, editedProfile } = this.state;
    if (editingProfile && editedProfile) {
      return (
        <div className="profile-section">
          <h2>Edit Profile</h2>
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                {editedProfile.name.charAt(0)}
              </div>
              <input
                type="text"
                name="name"
                value={editedProfile.name}
                onChange={this.handleProfileChange}
                className="profile-input"
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={editedProfile.email}
                onChange={this.handleProfileChange}
                className="profile-input"
                placeholder="Email"
              />
            </div>
            <div className="profile-details">
              <h4>Skills (comma separated)</h4>
              <input
                type="text"
                name="skills"
                value={editedProfile.skills.join(', ')}
                onChange={this.handleSkillsChange}
                className="profile-input"
                placeholder="Skills"
              />
              <h4>Experience</h4>
              <input
                type="text"
                name="experience"
                value={editedProfile.experience}
                onChange={this.handleProfileChange}
                className="profile-input"
                placeholder="Experience"
              />
            </div>
            <div className="profile-edit-actions">
              <button className="save-profile-button" onClick={this.handleSaveProfile}>Save</button>
              <button className="cancel-profile-button" onClick={this.handleCancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      );
    }
    // View mode
    return (
      <div className="profile-section">
        <h2>Profile</h2>
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {userProfile.name.charAt(0)}
            </div>
            <h3>{userProfile.name}</h3>
            <p>{userProfile.email}</p>
          </div>
          <div className="profile-details">
            <h4>Skills</h4>
            <div className="skills-list">
              {userProfile.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
            <h4>Experience</h4>
            <p>{userProfile.experience}</p>
          </div>
          <button className="edit-profile-button" onClick={this.handleEditProfile}>Edit Profile</button>
        </div>
      </div>
    );
  };

  renderApplications = () => (
    <div className="applications-section">
      <h2>My Applications</h2>
      <div className="job-grid">
        {this.state.appliedJobs.map(job => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p className="company">{job.company}</p>
            <p className="location">{job.location}</p>
            <p className="salary">{job.salary}</p>
            <p className="description">{job.description}</p>
            <div className="application-status">
              <span className="status-badge">Applied</span>
            </div>
          </div>
        ))}
        {this.state.appliedJobs.length === 0 && (
          <p className="no-applications">You haven't applied to any jobs yet.</p>
        )}
      </div>
    </div>
  )

  render() {
    const { currentView, searchQuery, selectedCategory, isLoading, activeNav, showApplications, showProfile, registeredUser } = this.state;

    if (currentView === 'login') {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="animated-title">Job Board</h1>
            <p className="subtitle">Find your dream job or post a new opportunity.</p>
          </header>
          <main className="fade-in">
            <Login
              onSwitchToSignup={this.handleSwitchToSignup}
              onAuthSuccess={this.handleAuthSuccess}
              registeredUser={registeredUser}
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
            <h1 className="animated-title">Job Board</h1>
            <p className="subtitle">Find your dream job or post a new opportunity.</p>
          </header>
          <main className="fade-in">
            <Signup
              onSwitchToLogin={this.handleSwitchToLogin}
              onAuthSuccess={this.handleAuthSuccess}
              onRegisterUser={this.handleRegisterUser}
            />
          </main>
          <footer>
            <p>© 2025 Job Board App. All rights reserved.</p>
          </footer>
        </div>
      );
    }

    // currentView === 'home'
    const filteredJobs = this.getFilteredJobs();
    
    return (
      <div className="App">
        <nav className="main-nav">
          <div className="nav-brand">Job Board</div>
          <div className="nav-links">
            <button 
              className={`nav-button ${activeNav === 'home' ? 'active' : ''}`}
              onClick={() => this.handleNavClick('home')}
            >
              Home
            </button>
            <button 
              className={`nav-button ${activeNav === 'applications' ? 'active' : ''}`}
              onClick={() => this.handleNavClick('applications')}
            >
              My Applications
            </button>
            <button 
              className={`nav-button ${activeNav === 'profile' ? 'active' : ''}`}
              onClick={() => this.handleNavClick('profile')}
            >
              Profile
            </button>
            <button 
              className="nav-button logout"
              onClick={this.handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>

        <main className="home-content">
          {!showApplications && !showProfile && (
            <>
              <div className="search-section">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={this.handleSearch}
                  className="search-input"
                />
                <div className="category-filters">
                  <button 
                    className={`category-button ${selectedCategory === 'all' ? 'active' : ''}`}
                    onClick={() => this.handleCategoryChange('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`category-button ${selectedCategory === 'development' ? 'active' : ''}`}
                    onClick={() => this.handleCategoryChange('development')}
                  >
                    Development
                  </button>
                  <button 
                    className={`category-button ${selectedCategory === 'design' ? 'active' : ''}`}
                    onClick={() => this.handleCategoryChange('design')}
                  >
                    Design
                  </button>
                </div>
              </div>

              <section className="job-listings">
                <h2>Available Jobs</h2>
                <div className="job-grid">
                  {filteredJobs.map(job => (
                    <div key={job.id} className="job-card">
                      <h3>{job.title}</h3>
                      <p className="company">{job.company}</p>
                      <p className="location">{job.location}</p>
                      <p className="salary">{job.salary}</p>
                      <p className="description">{job.description}</p>
                      <button 
                        className="apply-button"
                        onClick={() => this.handleApply(job.id)}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Applying...' : 'Apply Now'}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {showApplications && this.renderApplications()}
          {showProfile && this.renderProfile()}
        </main>

        <footer className="main-footer">
          <p>© 2025 Job Board App. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}

export default App;
