import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg octofit-navbar">
          <div className="container">
            <span className="navbar-brand">&#127939; OctoFit Tracker</span>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                {[['Users', '/users'], ['Teams', '/teams'], ['Activities', '/activities'],
                  ['Workouts', '/workouts'], ['Leaderboard', '/leaderboard']].map(([label, path]) => (
                  <li className="nav-item" key={path}>
                    <NavLink
                      className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                      to={path}
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="container my-4 flex-grow-1">
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/" element={<Users />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="octofit-footer text-center py-3">
          &copy; {new Date().getFullYear()} OctoFit Tracker &mdash; Built with GitHub Copilot
        </footer>
      </div>
    </Router>
  );
}

export default App;
