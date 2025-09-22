// Home.jsx
import React from 'react';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Build Your Professional Portfolio</h1>
          <p>Showcase your skills, projects, and achievements in minutes.</p>
          <button className="cta-button">Create Your Portfolio</button>
        </div>
        <div className="hero-image">
          <img src="/src/assets/portfolio-banner.jpg" alt="Portfolio Banner" className="portfolio-banner" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="feature">
            <img src="https://cdn-icons-png.flaticon.com/512/3105/3105807.png" alt="Fast Setup" />
            <h3>Fast Setup</h3>
            <p>Launch your portfolio in minutes with zero coding.</p>
          </div>
          <div className="feature">
            <img src="https://cdn-icons-png.flaticon.com/512/3132/3132693.png" alt="Professional Designs" />
            <h3>Professional Designs</h3>
            <p>Choose from modern, eye-catching templates.</p>
          </div>
          <div className="feature">
            <img src="https://cdn-icons-png.flaticon.com/512/809/809957.png" alt="Responsive" />
            <h3>Fully Responsive</h3>
            <p>Your site will look amazing on all devices.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>Step 1</h3>
            <p>Sign up and log in to your dashboard.</p>
          </div>
          <div className="step">
            <h3>Step 2</h3>
            <p>Fill in your personal and professional details easily.</p>
          </div>
          <div className="step">
            <h3>Step 3</h3>
            <p>Submit and instantly generate your portfolio!</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-items">
          <div className="faq-item">
            <h3>What is a portfolio website?</h3>
            <p>A portfolio website is a personal website that showcases your work, skills, and achievements. It helps you demonstrate your professional expertise to potential employers or clients.</p>
          </div>
          <div className="faq-item">
            <h3>How can I customize my portfolio?</h3>
            <p>You can customize the layout, colors, text, and images of your portfolio using our intuitive drag-and-drop editor. No coding is required.</p>
          </div>
          <div className="faq-item">
            <h3>Can I update my portfolio after creating it?</h3>
            <p>Yes, you can update your portfolio anytime through your dashboard. Simply log in, make changes, and your portfolio will be updated automatically.</p>
          </div>
        </div>
      </section>

      {/* Final Call-to-Action */}
      <section className="final-cta">
        <h2>Ready to Create Your Dream Portfolio?</h2>
        <button className="cta-button">Get Started Now</button>
      </section>
    </div>
  );
}

export default Home;
