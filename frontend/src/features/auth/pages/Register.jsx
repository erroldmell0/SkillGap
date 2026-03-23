import {Link, useNavigate} from "react-router"
import { useState } from "react"
import Leftpanel from "./Leftpanel"
import "../auth.form.scss"
import { useAuth } from "../hooks/useAuth"
import Loading from "../../landing/pages/Loading"


const Register = () => {
  const navigate = useNavigate()

  const {loading, handleRegister} = useAuth()
  
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleRegister({username, email, password})
    navigate("/home")
  }

  if(loading) {
    return (<Loading/>)
  }

  return (
    <main className="auth-page">
      <Leftpanel />

      {/* Form panel */}
      <div className="auth-form-panel">
        <div className='form-container'>
          <div className="form-header">
            <h1>Create account</h1>
            <p className="form-subtitle">Start your journey with SkillGap</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='input-group'>
              <label htmlFor='username'>Username</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input type="text" id='username' name='username' placeholder="Choose a username"
                onChange={(e) => setUsername(e.target.value)}/>
              </div>
            </div>

            <div className='input-group'>
              <label htmlFor='email'>Email</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <input type="email" id='email' name='email' placeholder="Enter email address"
                onChange={(e) => setEmail(e.target.value)}/>
              </div>
            </div>

            <div className='input-group'>
              <label htmlFor='password'>Password</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input type="password" id='password' name='password' placeholder="Create a password"
                onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>

            <button className="button primary-button" type="submit">Create Account</button>
          </form>

          <div className="form-divider">
            <span>or</span>
          </div>

          <p className="form-footer">Already have an account? <Link to="/login">Sign in</Link></p>  
        </div>
      </div>
    </main>
  )
}

export default Register
