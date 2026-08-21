import { useState } from "react"

/**
 * Password field with a reveal toggle, shared by the login and register forms.
 */
const PasswordInput = ({ placeholder, onChange }) => {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="input-wrapper has-reveal">
      <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>

      <input
        type={revealed ? "text" : "password"}
        id='password'
        name='password'
        placeholder={placeholder}
        onChange={onChange}
      />

      {/* type=button, otherwise clicking the eye submits the form */}
      <button
        type="button"
        className="reveal-toggle"
        onClick={() => setRevealed((shown) => !shown)}
        aria-label={revealed ? "Hide password" : "Show password"}
        aria-pressed={revealed}
      >
        {revealed ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c5 0 9.27 3.11 11 7a12.6 12.6 0 0 1-2.2 3.24"/>
            <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-5 0-9.27-3.11-11-7a12.65 12.65 0 0 1 4.06-4.94"/>
            <path d="m2 2 20 20"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        )}
      </button>
    </div>
  )
}

export default PasswordInput
