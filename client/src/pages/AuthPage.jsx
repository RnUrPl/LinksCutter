import React from 'react'
import { login, registration } from '../http/userApi'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './authPage.css'
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearError } from '../store/slices/userSlice';
import { useMessage } from '../hooks/useMessage';



 const AuthPage = () => {

    const navigate = useNavigate()
    const {error} = useAuth()
    const message = useMessage()
    const disptach = useDispatch()

    
    
    const [form,setForm] = useState({
        email: ' ', password: ' '
    })

    useEffect(() => {
        message(error)
        disptach(clearError())
    },[disptach,error,message])

    useEffect(() => {
        window.M.updateTextFields()
      }, [])

    const {email,password}= form

    const changeHandler = event => { 
        setForm({...form, [event.target.name]: event.target.value})
    }

    const authHandler = async event => {
        try {
          if (event.target.name === 'login') {
            await login(email, password);
            navigate('/create')
          } else {
            const data = await registration(email, password);
            console.log(data.message)
            message(data.message)
            navigate('/create') 
          }
          ;
        } catch (e) {
          console.log(e);
        }
      };

  return (
  <div className="auth-root">
    <div className="auth-card">
      <h1 className="auth-logo">Welcome</h1>
      <p className="auth-subtitle">Sign in or create a new account</p>

      <div className="auth-field">
        <label className="auth-label" htmlFor="email">Email</label>
        <input
          className="auth-input"
          id="email"
          type="text"
          name="email"
          placeholder="you@example.com"
          onChange={changeHandler}
        />
      </div>

      <div className="auth-field">
        <label className="auth-label" htmlFor="password">Password</label>
        <input
          className="auth-input"
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          onChange={changeHandler}
        />
      </div>

      <div className="auth-actions">
        <button className="btn-primary" onClick={authHandler} name="login">
          Login
        </button>
        <button className="btn-secondary" onClick={authHandler} name="registration">
          Register
        </button>
      </div>
    </div>
  </div>
)
}

export default AuthPage
