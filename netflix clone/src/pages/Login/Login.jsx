import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {

  // user state for signin and signup
  const [signState, setSignState] = useState(false)

  // user state variable for storing the form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  // function for user authentication

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log('signState:', signState);
    if (!signState) {
      console.log('if case--------->')
      await login(email, password);
    } else {
      console.log('else case---------->')
      await signup(name, email, password);
    }
    setLoading(false);
  }

  return (
    loading ? <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div> :
      <div className='login'>
        <img src={logo} className='login-logo' alt="" />
        <div className="login-form">
          <h1>{signState ? 'sign Up' : 'sign In'}</h1>
          <form >
            {/* {signState ?'sign Up' :'sign In'} */}
            {signState ? <input value={name} onChange={(e) => { setName(e.target.value) }}
              type="text" placeholder='Enter your name...' /> : <></>}

            <input value={email} onChange={(e) => { setEmail(e.target.value) }}
              type="email" placeholder='Enter your email...' />

            <input value={password} onChange={(e) => { setPassword(e.target.value) }}
              type="password" placeholder='Enter your Password...' />

            <button onClick={user_auth} type='submit'>{signState ? "Sign Up" : "Sign In"}</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" />
                <label htmlFor="">Remeber me</label>
              </div>
              <p>Need Help</p>
            </div>
          </form>
          <div className="form-switch">
            {signState ? <p>New to Netflix?<span onClick={() => { setSignState(false) }}>Sign UP Now</span></p> : <p>Already have account?<span onClick={() => { setSignState(true) }}>Sign In Now</span></p>}
          </div>
        </div>
      </div>
  )
}

export default Login
