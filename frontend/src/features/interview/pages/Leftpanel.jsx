import { Link } from "react-router"

const Leftpanel = ({ isOpen, onClose, reports }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`panel-backdrop ${isOpen ? "visible" : ""}`}
        onClick={onClose}
      />

      {/* Sliding panel */}
      <aside className={`left-panel ${isOpen ? "open" : ""}`}>
        {/* Panel header */}
        <div className="panel-header">
          <div className="panel-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/>
              <path d="M14 2v6h6"/>
              <path d="M16 13H8"/>
              <path d="M16 17H8"/>
              <path d="M10 9H8"/>
            </svg>
            <span>Previous Reports</span>
          </div>
          <button className="panel-close-btn" onClick={onClose} aria-label="Close panel">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Reports list */}
        <div className="panel-body">
          {reports && reports.length > 0 ? (
            <ul className="reports-list">
              {reports.map((report) => (
                <li key={report._id} className="report-item">
                  <Link
                    to={`/interview/${report._id}`}
                    className="report-link"
                    onClick={onClose}
                  >
                    <div className="report-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/>
                        <path d="M14 2v6h6"/>
                      </svg>
                    </div>
                    <div className="report-info">
                      <span className="report-title">{report.title || "Untitled Report"}</span>
                    </div>
                    <svg className="report-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="panel-empty">
              <div className="empty-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/>
                  <path d="M14 2v6h6"/>
                  <path d="M16 13H8"/>
                  <path d="M16 17H8"/>
                  <path d="M10 9H8"/>
                </svg>
              </div>
              <p>No reports yet</p>
              <span>Generate your first skill gap report to see it here.</span>
            </div>
          )}
        </div>

        {/* Panel count badge */}
        {reports && reports.length > 0 && (
          <div className="panel-footer">
            <span>{reports.length} report{reports.length !== 1 ? "s" : ""} total</span>
          </div>
        )}
      </aside>
    </>
  )
}

export default Leftpanel