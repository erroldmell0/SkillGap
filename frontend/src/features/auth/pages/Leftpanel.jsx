import "../auth.form.scss"

const Leftpanel = () => {
    return (
      <div className="auth-brand-panel">
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