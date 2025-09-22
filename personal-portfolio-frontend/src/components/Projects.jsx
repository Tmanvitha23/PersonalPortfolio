import React, { useEffect, useState } from 'react';
import '../styles/Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    link: '',
    image: null,
  });
  const [selectedProject, setSelectedProject] = useState(null); // For the popup modal

  // Retrieve username from localStorage
  const username = localStorage.getItem('username');

  useEffect(() => {
    // Fetch projects from local storage
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    const userProjects = storedProjects.filter((proj) => proj.username === username);
    setProjects(userProjects);
  }, [username]);

  const handleAddProject = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!username || !newProject.title || !newProject.description || !newProject.link || !newProject.image) {
      console.error('⚠️ All fields are required.');
      return;
    }

    // Create a new project object
    const reader = new FileReader();
    reader.onload = () => {
      const newProjectData = {
        username,
        title: newProject.title,
        description: newProject.description,
        link: newProject.link,
        image: reader.result, // Store the image as a base64 string
      };

      // Save the project to local storage
      const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
      storedProjects.push(newProjectData);
      localStorage.setItem('projects', JSON.stringify(storedProjects));

      // Update the state
      setProjects([...projects, newProjectData]);
      setNewProject({ title: '', description: '', link: '', image: null });
    };

    reader.readAsDataURL(newProject.image);
  };

  const handleCloseModal = () => {
    setSelectedProject(null); // Close the modal
  };

  return (
    <div className="projects-container">
      <h1 className="projects-title">🚀 My Projects</h1>

      <div className="projects-form-container">
        <h2 className="form-title">📤 Upload a New Project</h2>
        <form className="add-project-form" onSubmit={handleAddProject}>
          <div className="form-group">
            <label htmlFor="title">📌 Project Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter project title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">✍️ Project Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter project description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="link">🔗 Project Link</label>
            <input
              type="text"
              id="link"
              name="link"
              placeholder="Enter project link"
              value={newProject.link}
              onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">🖼️ Project Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => setNewProject({ ...newProject, image: e.target.files[0] })}
              required
            />
          </div>

          <button type="submit" className="submit-button">📥 Add Project</button>
        </form>
      </div>

      <div className="projects-list-container">
        <h2 className="list-title">🌟 Your Projects</h2>
        <div className="project-list">
          {projects.map((proj, idx) => (
            <div key={idx} className="project-card" onClick={() => setSelectedProject(proj)}>
              <img
                src={proj.image}
                alt={proj.title}
                className="project-image"
              />
              <div className="project-details">
                <h3 className="project-title">📖 {proj.title}</h3>
                <p className="project-username">👤 Posted by: {proj.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Project Details */}
      {selectedProject && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseModal}>❌</button>
            <h2>📖 {selectedProject.title}</h2>
            <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />
            <p>✍️ {selectedProject.description}</p>
            <a href={selectedProject.link} target="_blank" rel="noreferrer" className="modal-link">
              🔗 Visit Project
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
