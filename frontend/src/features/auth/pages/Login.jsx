import {Link, useNavigate} from "react-router"
import "../auth.form.scss"
import Leftpanel from "./Leftpanel"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"

const Login = () => {
  const navigate = useNavigate()

  const {loading, handleLogin} = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleLogin({email, password})
    navigate("/")
  }

  if(loading) {
    return (<main><h1>Loading...</h1></main>)
  }

  return (
    <main className="auth-page">
      <Leftpanel/>

      {/* Form panel */}
      <div className="auth-form-panel">
        <div className='form-container'>
          <div className="form-header">
            <h1>Welcome back</h1>
            <p className="form-subtitle">Sign in to continue your journey</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='input-group'>
              <label htmlFor='email'>Email</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <input type="email" id='email' name='email' placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)}/>
              </div>
            </div>

            <div className='input-group'>
              <label htmlFor='password'>Password</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input type="password" id='password' name='password' placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>

            <div className="form-options">
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button className="button primary-button" type="submit">Sign In</button>
          </form>

          <div className="form-divider">
            <span>or</span>
          </div>

          <p className="form-footer">Don't have an account? <Link to="/register">Create account</Link></p>  
        </div>
      </div>
    </main>
  )
}

export default Login
