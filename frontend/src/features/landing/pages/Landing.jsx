import { Link } from "react-router"
import "../landing.scss"

const Landing = () => {
  return (
    <div className="landing-page">
      {/* Animated background shapes */}
      <div className="landing-bg-shapes">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="bg-shape shape-4"></div>
        <div className="bg-shape shape-5"></div>
      </div>

      {/* Navbar */}
      <nav className="landing-nav">
        <span className="nav-logo">SkillGap</span>
        <div className="nav-buttons">
          <Link to="/login" className="landing-btn btn-ghost">Sign In</Link>
          <Link to="/register" className="landing-btn btn-solid">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            AI-Powered Skill Analysis
          </div>

          <h1 className="hero-title">
            Bridge the Gap Between <br />
            <span className="gradient-text">Where You Are &amp; Where You Want to Be</span>
          </h1>

          <p className="hero-subtitle">
            Upload your resume, paste a job description, and let AI identify exactly
            what skills you need to land your dream role.
          </p>

          <div className="hero-actions">
            <Link to="/register" className="landing-btn btn-solid btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
              Create Free Account
            </Link>
            <Link to="/login" className="landing-btn btn-ghost btn-lg">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="landing-features">
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/>
              <path d="M14 2v6h6"/>
              <path d="M16 13H8"/>
              <path d="M16 17H8"/>
              <path d="M10 9H8"/>
            </svg>
          </div>
          <h3 className="feature-title">Resume Analysis</h3>
          <p className="feature-desc">Upload your resume and get instant AI-powered insights on your current skill set.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </div>
          <h3 className="feature-title">Gap Detection</h3>
          <p className="feature-desc">Compare your skills against job requirements to find exactly what's missing.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <h3 className="feature-title">Growth Roadmap</h3>
          <p className="feature-desc">Get a personalized action plan to close your skill gaps and accelerate your career.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        &copy; {new Date().getFullYear()} SkillGap. All rights reserved.
      </footer>
    </div>
  )
}

export default Landing