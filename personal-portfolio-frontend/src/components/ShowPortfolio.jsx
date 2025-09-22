import React, { useState, useEffect } from 'react';
import "../styles/ShowPortfolio.css";

const ShowPortfolio = () => {
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('portfolio_username');
    if (username) {
      const data = localStorage.getItem('portfolio_' + username);
      if (data) {
        setPortfolioData(JSON.parse(data));
      }
    }
  }, []);

  if (!portfolioData) {
    return <p className="text-center text-gray-500 mt-10">Loading or portfolio not found...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#48CFCB] mb-2">Your Portfolio</h1>
        <p className="text-gray-600 text-lg">A glance at your profile and achievements</p>
      </div>

      {/* Profile Card */}
      <div className="card-container">
        <img
          src={portfolioData.profileImage}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-bold text-center">{portfolioData.username}</h2>
        <p className="text-center text-gray-600">{portfolioData.summary}</p>
      </div>

      {/* Education */}
      <div className="card-container">
        <h3 className="card-title">🎓 Education</h3>
        <ul className="list-disc pl-6">
          {portfolioData.education.map((edu, idx) => (
            <li key={idx}>
              <strong>{edu.degree}</strong> from {edu.institution} ({edu.year}) - <span className="text-[#48CFCB] font-semibold">CGPA: {edu.cgpa}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Projects */}
      <div className="card-container">
        <h3 className="card-title">💻 Projects</h3>
        <ul className="list-disc pl-6">
          {portfolioData.projects.map((proj, idx) => (
            <li key={idx}>
              <strong>{proj.title}:</strong> {proj.description}
              {proj.link && (
                <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-500 ml-2 underline">[Link]</a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Skills */}
      <div className="card-container">
        <h3 className="card-title">🛠️ Skills</h3>
        {portfolioData.skillsBar.map((skill, idx) => (
          <div key={idx} className="mb-3">
            <div className="flex justify-between">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded h-3">
              <div className="bg-[#48CFCB] h-3 rounded" style={{ width: `${skill.level}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="card-container">
        <h3 className="card-title">🏆 Achievements</h3>
        <ul className="list-disc pl-6">
          {portfolioData.achievements.map((a, idx) => (
            <li key={idx}>{a}</li>
          ))}
        </ul>
      </div>

      {/* Experience */}
      <div className="card-container">
        <h3 className="card-title">💼 Experience</h3>
        <ul className="list-disc pl-6">
          {portfolioData.experience.map((exp, idx) => (
            <li key={idx}>
              <strong>{exp.jobTitle}</strong> at {exp.company} ({exp.year})
              <p>{exp.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Certifications */}
      <div className="card-container">
        <h3 className="card-title">📜 Certifications</h3>
        <ul className="list-disc pl-6">
          {portfolioData.certifications.map((cert, idx) => (
            <li key={idx}>
              <strong>{cert.title}</strong> by {cert.issuingOrganization} ({cert.year})
            </li>
          ))}
        </ul>
      </div>

      {/* Languages */}
      <div className="card-container">
        <h3 className="card-title">🌐 Languages</h3>
        <ul className="list-disc pl-6">
          {portfolioData.languages.map((lang, idx) => (
            <li key={idx}>{lang}</li>
          ))}
        </ul>
      </div>

      {/* Social Links */}
      <div className="card-container">
        <h3 className="card-title">🔗 Social Links</h3>
        <p><strong>LinkedIn:</strong> <a href={portfolioData.socialLinks.linkedin} className="text-blue-500 underline" target="_blank" rel="noreferrer">{portfolioData.socialLinks.linkedin}</a></p>
        <p><strong>GitHub:</strong> <a href={portfolioData.socialLinks.github} className="text-blue-500 underline" target="_blank" rel="noreferrer">{portfolioData.socialLinks.github}</a></p>
        <p><strong>Twitter:</strong> <a href={portfolioData.socialLinks.twitter} className="text-blue-500 underline" target="_blank" rel="noreferrer">{portfolioData.socialLinks.twitter}</a></p>
      </div>
    </div>
  );
};

export default ShowPortfolio;
