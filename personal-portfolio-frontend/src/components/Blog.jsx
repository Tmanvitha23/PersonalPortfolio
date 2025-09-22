import React, { useState, useEffect } from 'react';
import '../styles/Blog.css';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    username: '',
    title: '',
    description: '',
  });
  const [selectedBlog, setSelectedBlog] = useState(null); // For the popup modal

  // Fetch blogs from local storage on component mount
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);
  }, []);

  const handleAddBlog = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!newBlog.username || !newBlog.title || !newBlog.description) {
      alert('⚠️ All fields are required!');
      return;
    }

    // Create a new blog object
    const newBlogData = {
      username: newBlog.username,
      title: newBlog.title,
      description: newBlog.description,
      id: Date.now(), // Unique ID for each blog
    };

    // Save the blog to local storage
    const updatedBlogs = [...blogs, newBlogData];
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    setBlogs(updatedBlogs);

    // Reset the form
    setNewBlog({ username: '', title: '', description: '' });
  };

  const handleCloseModal = () => {
    setSelectedBlog(null); // Close the modal
  };

  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1>📚 Welcome to the Community Blog</h1>
        <p>💡 Share your thoughts, tutorials, and insights with everyone!</p>
      </header>

      <section className="blog-form-section">
        <h2>📝 Post a New Blog</h2>
        <form className="blog-form" onSubmit={handleAddBlog}>
          <div className="form-group">
            <label htmlFor="username">👤 Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={newBlog.username}
              onChange={(e) => setNewBlog({ ...newBlog, username: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">📌 Blog Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter blog title"
              value={newBlog.title}
              onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">✍️ Blog Description</label>
            <textarea
              id="description"
              placeholder="Write your blog description here"
              value={newBlog.description}
              onChange={(e) => setNewBlog({ ...newBlog, description: e.target.value })}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">🚀 Post Blog</button>
        </form>
      </section>

      <section className="blog-list-section">
        <h2>🌟 Community Blogs</h2>
        <div className="blog-list">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="blog-card"
              onClick={() => setSelectedBlog(blog)} // Open modal on click
            >
              <h3>📖 {blog.title}</h3>
              <p className="blog-username">👤 Posted by: {blog.username}</p>
              <p className="blog-description">📝 {blog.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Blog Details */}
      {selectedBlog && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseModal}>❌</button>
            <h2>📖 {selectedBlog.title}</h2>
            <p className="blog-username">👤 Posted by: {selectedBlog.username}</p>
            <p className="blog-description">📝 {selectedBlog.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;
