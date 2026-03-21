import { Link } from "react-router"
import "../auth.form.scss"

const Leftpanel = () => {
    return (
      <div className="auth-brand-panel">
        {/* Home button */}
        <Link to="/" className="brand-home-btn" title="Back to Home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
        </Link>
        {/* Decorative left panel */}
        <div className="brand-content">
          <h2 className="brand-title">SkillGap</h2>
          <p className="brand-tagline">Bridge the gap between where you are and where you want to be.</p>
          <div className="brand-features">
            <div className="feature-item">
              <span>Track your progress</span>
            </div>
            <div className="feature-item">
              <span>Set meaningful goals</span>
            </div>
            <div className="feature-item">
              <span>Accelerate your growth</span>
            </div>
          </div>
        </div>
        {/* Animated background shapes */}
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>
    )
}

export default Leftpanel