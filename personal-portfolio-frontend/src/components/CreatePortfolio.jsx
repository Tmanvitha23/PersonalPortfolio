import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreatePortfolio.css';

function CreatePortfolio({ setUserData }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    summary: '',
    profileImage: '',
    education: [{ degree: '', institution: '', year: '', cgpa: '' }],
    projects: [{ title: '', description: '', link: '' }],
    skillsBar: [{ name: '', level: '' }],
    achievements: [''],
    experience: [{ jobTitle: '', company: '', year: '', description: '' }],
    certifications: [{ title: '', issuingOrganization: '', year: '' }],
    languages: [''],
    socialLinks: { linkedin: '', github: '', twitter: '' },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e, section, index = null, field = null) => {
    if (section === 'education' || section === 'projects' || section === 'skillsBar' || section === 'experience' || section === 'certifications') {
      const updatedSection = [...formData[section]];
      updatedSection[index][field] = e.target.value;
      setFormData({ ...formData, [section]: updatedSection });
    } else if (section === 'achievements') {
      const updatedAchievements = [...formData.achievements];
      updatedAchievements[index] = e.target.value;
      setFormData({ ...formData, achievements: updatedAchievements });
    } else if (section === 'socialLinks') {
      setFormData({ ...formData, socialLinks: { ...formData.socialLinks, [field]: e.target.value } });
    } else if (section === 'languages') {
      const updatedLanguages = [...formData.languages];
      updatedLanguages[index] = e.target.value;
      setFormData({ ...formData, languages: updatedLanguages });
    } else {
      setFormData({ ...formData, [section]: e.target.value });
    }
  };

  const addMore = (section) => {
    const newItem =
      section === 'education'
        ? { degree: '', institution: '', year: '', cgpa: '' }
        : section === 'projects'
        ? { title: '', description: '', link: '' }
        : section === 'skillsBar'
        ? { name: '', level: '' }
        : section === 'experience'
        ? { jobTitle: '', company: '', year: '', description: '' }
        : section === 'certifications'
        ? { title: '', issuingOrganization: '', year: '' }
        : section === 'languages'
        ? ''
        : '';

    setFormData({
      ...formData,
      [section]: [...formData[section], newItem],
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("Image size should be less than 1MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.summary || !formData.profileImage) {
      alert('Please fill in all required fields!');
      return;
    }

    const portfolioData = {
      ...formData,
    };

    // Save to localStorage
    localStorage.setItem('portfolio_' + formData.username, JSON.stringify(portfolioData));
    localStorage.setItem('portfolio_username', formData.username);

    // Pass the portfolio data if setUserData is provided
    if (setUserData) {
      setUserData(portfolioData);
    }

    setIsSubmitted(true);
    navigate('/show-portfolio');
  };

  return (
    <div className="create-portfolio-container">
      <h2 className="page-heading">Create Your Professional Portfolio</h2>
      <form onSubmit={handleSubmit} className="form-container">
        {/* Username */}
        <div className="form-section">
          <label>Username:</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => handleChange(e, 'username')}
            required
            disabled={isSubmitted}
          />
        </div>

        {/* Summary */}
        <div className="form-section">
          <label>Summary:</label>
          <textarea
            value={formData.summary}
            onChange={(e) => handleChange(e, 'summary')}
            required
            disabled={isSubmitted}
          />
        </div>

        {/* Profile Image */}
        <div className="form-section">
          <label>Profile Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            disabled={isSubmitted}
          />
        </div>

        {/* Education */}
        <div className="form-section">
          <h3>Education:</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="education-item">
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleChange(e, 'education', index, 'degree')}
                placeholder="Degree"
                required
              />
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleChange(e, 'education', index, 'institution')}
                placeholder="Institution"
                required
              />
              <input
                type="text"
                value={edu.year}
                onChange={(e) => handleChange(e, 'education', index, 'year')}
                placeholder="Year of Graduation"
                required
              />
              <input
                type="text"
                value={edu.cgpa}
                onChange={(e) => handleChange(e, 'education', index, 'cgpa')}
                placeholder="CGPA"
                required
              />
            </div>
          ))}
          <button type="button" onClick={() => addMore('education')} disabled={isSubmitted}>
            Add More Education
          </button>
        </div>

        {/* Projects */}
        <div className="form-section">
          <h3>Projects:</h3>
          {formData.projects.map((proj, index) => (
            <div key={index} className="project-item">
              <input
                type="text"
                value={proj.title}
                onChange={(e) => handleChange(e, 'projects', index, 'title')}
                placeholder="Project Title"
                required
              />
              <textarea
                value={proj.description}
                onChange={(e) => handleChange(e, 'projects', index, 'description')}
                placeholder="Project Description"
                required
              />
              <input
                type="text"
                value={proj.link}
                onChange={(e) => handleChange(e, 'projects', index, 'link')}
                placeholder="Project Link"
                required
              />
            </div>
          ))}
          <button type="button" onClick={() => addMore('projects')} disabled={isSubmitted}>
            Add More Projects
          </button>
        </div>

        {/* Experience */}
        <div className="form-section">
          <h3>Experience:</h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <input
                type="text"
                value={exp.jobTitle}
                onChange={(e) => handleChange(e, 'experience', index, 'jobTitle')}
                placeholder="Job Title"
                required
              />
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleChange(e, 'experience', index, 'company')}
                placeholder="Company"
                required
              />
              <input
                type="text"
                value={exp.year}
                onChange={(e) => handleChange(e, 'experience', index, 'year')}
                placeholder="Year"
                required
              />
              <textarea
                value={exp.description}
                onChange={(e) => handleChange(e, 'experience', index, 'description')}
                placeholder="Job Description"
                required
              />
            </div>
          ))}
          <button type="button" onClick={() => addMore('experience')} disabled={isSubmitted}>
            Add More Experience
          </button>
        </div>

        {/* Certifications */}
        <div className="form-section">
          <h3>Certifications:</h3>
          {formData.certifications.map((cert, index) => (
            <div key={index} className="certification-item">
              <input
                type="text"
                value={cert.title}
                onChange={(e) => handleChange(e, 'certifications', index, 'title')}
                placeholder="Certification Title"
                required
              />
              <input
                type="text"
                value={cert.issuingOrganization}
                onChange={(e) => handleChange(e, 'certifications', index, 'issuingOrganization')}
                placeholder="Issuing Organization"
                required
              />
              <input
                type="text"
                value={cert.year}
                onChange={(e) => handleChange(e, 'certifications', index, 'year')}
                placeholder="Year"
                required
              />
            </div>
          ))}
          <button type="button" onClick={() => addMore('certifications')} disabled={isSubmitted}>
            Add More Certifications
          </button>
        </div>

        {/* Languages */}
        <div className="form-section">
          <h3>Languages:</h3>
          {formData.languages.map((lang, index) => (
            <div key={index} className="language-item">
              <input
                type="text"
                value={lang}
                onChange={(e) => handleChange(e, 'languages', index)}
                placeholder="Language"
                required
              />
            </div>
          ))}
          <button type="button" onClick={() => addMore('languages')} disabled={isSubmitted}>
            Add More Languages
          </button>
        </div>

        {/* Social Links */}
        <div className="form-section">
          <h3>Social Links:</h3>
          <input
            type="text"
            value={formData.socialLinks.linkedin}
            onChange={(e) => handleChange(e, 'socialLinks', null, 'linkedin')}
            placeholder="LinkedIn"
            required
          />
          <input
            type="text"
            value={formData.socialLinks.github}
            onChange={(e) => handleChange(e, 'socialLinks', null, 'github')}
            placeholder="GitHub"
            required
          />
          <input
            type="text"
            value={formData.socialLinks.twitter}
            onChange={(e) => handleChange(e, 'socialLinks', null, 'twitter')}
            placeholder="Twitter"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitted}>
          {isSubmitted ? 'Portfolio Created!' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default CreatePortfolio;
