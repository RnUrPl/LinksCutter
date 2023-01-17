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
    <div >
        <div className='container'>
            <div className='col s6 offset-s3'>
                <h1></h1>
                <div className='card blue lighten-3' >
                    <div className='card-content white-text'>
                        <span className='card-title'>
                            Authorizathion
                        </span>
                        
                            
                        
                        <div className="input-field col s12 ">
                            <input
                            id="email"
                            type="text"
                            name="email"
                            className="yellow-input " 
                            onChange={changeHandler}
                            />
                             <label htmlFor='password'>Email</label>
                        </div>

                        <div className="input-field col s12">
                            <input
                            id="password"
                            type="password"
                            name="password"
                            className="yellow-input"
                            onChange={changeHandler}
                            />
                            <label htmlFor='password'>Password</label>
                        </div>
                    </div>
                    
                    <div className='cards-action'>
                        <button
                            className="btn blue accent-1"
                            style={{marginRight: 10}}
                            onClick={authHandler}
                            name = 'login'
                        >
                            Login
                        </button>
                        <button
                            className="btn blue accent-1"
                            onClick={authHandler}
                            name = 'registration'
                        >
                            Registration
                        </button>
                    </div>
                </div>
                
            </div>   
        </div>

    </div>
  )
}

export default AuthPage
