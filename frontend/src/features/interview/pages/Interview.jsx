import { useState, useEffect } from "react"
import { Link } from "react-router"
import { useAuth } from "../../auth/hooks/useAuth"
import "../styles/interview.scss"
import {useInterview} from "../hooks/useInterview"
import { useParams } from "react-router"
import Loading from "../../landing/pages/Loading"

const Interview = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("technical")
  const {report, getReportById, loading} = useInterview()
  const {interviewId} = useParams()

  useEffect(() => {
    if(interviewId) {
      getReportById(interviewId)
    }
  }, [interviewId])

  if(loading || !report) {
    return (
      <Loading/>
    )
  }

  const tabs = [
    {
      id: "technical",
      label: "Technical Questions",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      count: report.technicalQuestions.length,
    },
    {
      id: "behavioral",
      label: "Behavioral Questions",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      count: report.behavioralQuestions.length,
    },
    {
      id: "roadmap",
      label: "Preparation Roadmap",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 20V10" />
          <path d="M12 20V4" />
          <path d="M6 20v-6" />
        </svg>
      ),
      count: report.preparationPlan.length + " days",
    },
  ]

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high": return "severity-high"
      case "medium": return "severity-medium"
      case "low": return "severity-low"
      default: return ""
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "#4ade80"
    if (score >= 60) return "#facc15"
    return "#f87171"
  }

  const renderContent = () => {
    switch (activeTab) {
      case "technical":
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Technical Questions</h2>
              <p className="section-desc">Prepare answers for these role-specific technical questions</p>
            </div>
            <div className="questions-list">
              {report.technicalQuestions.map((q, i) => (
                <div className="question-card" key={i}>
                  <div className="question-number">Q{i + 1}</div>
                  <div className="question-body">
                    <h3 className="question-text">{q.question}</h3>
                    <div className="question-meta">
                      <div className="meta-block">
                        <span className="meta-label">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                          </svg>
                          Intention
                        </span>
                        <p>{q.intention}</p>
                      </div>
                      <div className="meta-block">
                        <span className="meta-label">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                          Suggested Answer
                        </span>
                        <p>{q.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "behavioral":
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Behavioral Questions</h2>
              <p className="section-desc">Practice these situational and behavioral interview questions</p>
            </div>
            <div className="questions-list">
              {report.behavioralQuestions.map((q, i) => (
                <div className="question-card" key={i}>
                  <div className="question-number">Q{i + 1}</div>
                  <div className="question-body">
                    <h3 className="question-text">{q.question}</h3>
                    <div className="question-meta">
                      <div className="meta-block">
                        <span className="meta-label">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                          </svg>
                          Intention
                        </span>
                        <p>{q.intention}</p>
                      </div>
                      <div className="meta-block">
                        <span className="meta-label">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                          Suggested Answer
                        </span>
                        <p>{q.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "roadmap":
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Preparation Roadmap</h2>
              <p className="section-desc">Follow this day-by-day plan to prepare for your interview</p>
            </div>
            <div className="roadmap-timeline">
              {report.preparationPlan.map((day, i) => (
                <div className="roadmap-day" key={i}>
                  <div className="day-marker">
                    <div className="day-dot"></div>
                    {i < report.preparationPlan.length - 1 && <div className="day-line"></div>}
                  </div>
                  <div className="day-content">
                    <div className="day-header">
                      <span className="day-badge">Day {day.day}</span>
                      <h3>{day.focus}</h3>
                    </div>
                    <ul className="day-tasks">
                      {day.tasks.map((task, j) => (
                        <li key={j}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <main className="interview-page">
      {/* Animated background shapes */}
      <div className="interview-bg-shapes">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="bg-shape shape-4"></div>
      </div>

      {/* Top navbar */}
      <nav className="interview-nav">
        <div className="nav-left">
          <Link to="/home" className="nav-back" title="Back to Home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </Link>
          <span className="nav-logo">SkillGap</span>
        </div>
        <div className="nav-user">
          <div className="user-avatar">
            {user?.username?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <span className="user-name">{user?.username || "User"}</span>
        </div>
      </nav>

      {/* 3-column layout */}
      <div className="interview-layout">
        {/* Left sidebar — Navigation tabs */}
        <aside className="interview-sidebar">
          <div className="sidebar-header">
            <h3>Interview Prep: </h3>
            <h3>{report.title}</h3>
            <p>Your personalized report</p>
          </div>
          <nav className="sidebar-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`sidebar-tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
                <span className="tab-count">{tab.count}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Middle — Main content */}
        <section className="interview-main">
          {renderContent()}
        </section>

        {/* Right sidebar — Score & Skill Gaps */}
        <aside className="interview-stats">
          {/* Match Score */}
          <div className="stats-card score-card">
            <h3 className="stats-title">Match Score</h3>
            <div className="score-ring">
              <svg viewBox="0 0 120 120" className="score-svg">
                <circle className="score-track" cx="60" cy="60" r="52" />
                <circle
                  className="score-fill"
                  cx="60"
                  cy="60"
                  r="52"
                  style={{
                    strokeDasharray: `${(report.matchScore / 100) * 327} 327`,
                    stroke: getScoreColor(report.matchScore),
                  }}
                />
              </svg>
              <div className="score-value">
                <span className="score-number">{report.matchScore}</span>
                <span className="score-percent">%</span>
              </div>
            </div>
            <p className="score-label">
              {report.matchScore >= 80 ? "Strong Match" : report.matchScore >= 60 ? "Good Match" : "Needs Work"}
            </p>
          </div>

          {/* Skill Gaps */}
          <div className="stats-card gaps-card">
            <h3 className="stats-title">Skill Gaps</h3>
            <div className="gaps-list">
              {report.skillGaps.map((gap, i) => (
                <div className="gap-item" key={i}>
                  <div className="gap-info">
                    <span className="gap-name">{gap.skill}</span>
                    <span className={`gap-severity ${getSeverityColor(gap.severity)}`}>
                      {gap.severity}
                    </span>
                  </div>
                  <div className="gap-bar">
                    <div className={`gap-bar-fill ${getSeverityColor(gap.severity)}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="stats-card quick-stats">
            <h3 className="stats-title">Overview</h3>
            <div className="quick-grid">
              <div className="quick-item">
                <span className="quick-value">{report.technicalQuestions.length}</span>
                <span className="quick-label">Technical Q's</span>
              </div>
              <div className="quick-item">
                <span className="quick-value">{report.behavioralQuestions.length}</span>
                <span className="quick-label">Behavioral Q's</span>
              </div>
              <div className="quick-item">
                <span className="quick-value">{report.skillGaps.length}</span>
                <span className="quick-label">Skill Gaps</span>
              </div>
              <div className="quick-item">
                <span className="quick-value">{report.preparationPlan.length}</span>
                <span className="quick-label">Prep Days</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default Interview