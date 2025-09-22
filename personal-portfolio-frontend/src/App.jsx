import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import UserProfile from './components/UserProfile';
import CreatePortfolio from './components/CreatePortfolio';
import ShowPortfolio from './components/ShowPortfolio';
import AdminLogin from './components/AdminLogin';
import Login from './components/Login'; // Import Login component
import AdminProfile from './components/AdminProfile'; // Import AdminProfile component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/create-portfolio" element={<CreatePortfolio />} />
        <Route path="/show-portfolio" element={<ShowPortfolio />} />
        <Route path="/login" element={<Login />} /> {/* Corrected Login route */}
        <Route path="/register" element={<div>Register Page</div>} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-profile" element={<AdminProfile />} /> {/* Added AdminProfile route */}
      </Routes>
    </Router>
  );
}

export default App;
