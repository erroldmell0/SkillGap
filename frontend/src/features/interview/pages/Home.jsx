import { useState, useRef } from "react"
import { useAuth } from "../../auth/hooks/useAuth"
import { useInterview } from "../hooks/useInterview"
import { useNavigate } from "react-router"
import Leftpanel from "./Leftpanel"
import "../styles/home.scss"

const Home = () => {
  const { user } = useAuth()
  const {generateReport, loading, reports} = useInterview()
  const navigate = useNavigate()
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const [resumeFile, setResumeFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const resumeInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = () => {
    setIsDragging(false)
  }
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type === "application/pdf") {
      setResumeFile(file)
    }
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setResumeFile(file)
    }
  }
  const handleRemoveFile = () => {
    setResumeFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await generateReport({resumeFile, selfDescription, jobDescription})
    navigate(`/interview/${data.interviewId}`)
  }

  if(loading) {
    return (
      <main>
        <div>Loading your interview plan...</div>
      </main>
    )
  }

  return (
    <main className="home-page">
      {/* Animated background shapes */}
      <div className="home-bg-shapes">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="bg-shape shape-4"></div>
        <div className="bg-shape shape-5"></div>
      </div>

      {/* Left panel */}
      <Leftpanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        reports={reports}
      />

      {/* Top navbar */}
      <nav className="home-nav">
        {/* Hamburger button */}
        <button
          className={`hamburger-btn ${isPanelOpen ? "active" : ""}`}
          onClick={() => setIsPanelOpen((prev) => !prev)}
          aria-label="Toggle reports panel"
          id="hamburger-toggle"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <span className="nav-logo">SkillGap</span>
        <div className="nav-user">
          <div className="user-avatar">
            {user?.username?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <span className="user-name">{user?.username || "User"}</span>
        </div>
      </nav>

      {/* Main content */}
      <div className="home-content">

        <form className="home-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Left column — Job Description */}
            <div className="form-card card-jd">
              <div className="card-header">
                <div className="card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/>
                    <path d="M14 2v6h6"/>
                    <path d="M16 13H8"/>
                    <path d="M16 17H8"/>
                    <path d="M10 9H8"/>
                  </svg>
                </div>
                <div>
                  <h2>Job Description</h2>
                  <p>Paste the full job listing you're targeting</p>
                </div>
              </div>
              <textarea name="jobDescription" id="jobDescription" placeholder="Paste the complete job description here — include responsibilities, requirements, and qualifications..." value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
              <div className="char-count">
                {jobDescription.length > 0 && <span>{jobDescription.length} characters</span>}
              </div>
            </div>

            {/* Right column — Resume + Self Description */}
            <div className="form-right-col">
              {/* Resume upload card */}
              <div className="form-card card-resume">
                <div className="card-header">
                  <div className="card-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </div>
                  <div>
                    <h2>Upload Resume</h2>
                    <p>PDF format, max 3MB</p>
                  </div>
                </div>

                <div
                  className={`dropzone ${isDragging ? "dragging" : ""} ${resumeFile ? "has-file" : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => !resumeFile && resumeInputRef.current?.click()}
                >
                  <input type="file" name="resume" id="resume" accept=".pdf" ref={resumeInputRef} onChange={handleFileChange} hidden />
                  {resumeFile ? (
                    <div className="file-info">
                      <div className="file-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/>
                          <path d="M14 2v6h6"/>
                        </svg>
                      </div>
                      <div className="file-details">
                        <span className="file-name">{resumeFile.name}</span>
                        <span className="file-size">{(resumeFile.size / 1024).toFixed(1)} KB</span>
                      </div>
                      <button type="button" className="file-remove" onClick={handleRemoveFile} title="Remove file">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="dropzone-content">
                      <div className="dropzone-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="17 8 12 3 7 8"/>
                          <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                      </div>
                      <span className="dropzone-text">Drag & drop your resume</span>
                      <span className="dropzone-hint">or click to browse</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Self description card */}
              <div className="form-card card-self">
                <div className="card-header">
                  <div className="card-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div>
                    <h2>Self Description</h2>
                    <p>Tell us about your experience & skills</p>
                  </div>
                </div>
                <textarea name="selfDescription" id="selfDescription" placeholder="Describe your background, key skills, years of experience, and what makes you a strong candidate..." value={selfDescription} onChange={(e) => setSelfDescription(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Tip banner */}
          <div className="home-tip">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            <span>For best results, provide <strong>both</strong> your resume and a self-description alongside the job listing.</span>
          </div>

          {/* Submit button */}
          <button className="home-submit-btn" type="submit">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
            Generate Skill Gap Report
          </button>
        </form>
      </div>

    </main>
  )
}

export default Home