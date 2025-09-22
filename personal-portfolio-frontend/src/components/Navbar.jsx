import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));  // Check if the user is admin

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin'); // Remove admin flag from localStorage
    window.location.href = '/'; // Redirect to home
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">🌟 MyPortfolio</div>
      <div className="navbar-links">
        <Link to="/">🏠 Home</Link>

        {user ? (
          isAdmin ? (
            // Admin Navbar Links
            <>
              <Link to="/admin-profile">👨‍💻 Admin Profile</Link>
              <button onClick={handleLogout} className="logout-button">🚪 Logout</button>
            </>
          ) : (
            // Regular User Navbar Links
            <>
              <Link to="/projects">📂 Projects</Link>
              <Link to="/blog">📝 Blog</Link>
              <Link to="/contact">📞 Contact</Link>
              <Link to="/profile">👤 Profile</Link>
              <Link to="/create-portfolio">🛠️ Create Portfolio</Link>
              <Link to="/show-portfolio">📄 View Portfolio</Link>
              <button onClick={handleLogout} className="logout-button">🚪 Logout</button>
            </>
          )
        ) : (
          // If not logged in
          <>
            <Link to="/login">🔑 Login</Link>
            <Link to="/admin-login">📝 Admin Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
