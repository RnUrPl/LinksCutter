import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { logoutUser } from '../store/slices/userSlice'
import './navbar.css'

export const Navbar = () => {
  const {isAuth} = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logoutUser())
    navigate('/')
  }

  return (
      <nav>
        {isAuth ? 
         <div className='nav-wrapper blue lighten-3'>
          <a href="/create" className='brand-logo'>LinksCutter</a>
          <ul id="nav-mobile" className='right hide-on-med-and-down'>
            <li><a href="/create">Create</a></li>
            <li><a href="/links" >Links</a></li>
            <li><a href="/" onClick={logoutHandler}>Logout</a></li>
        </ul>
        </div>
        :
        <div className='nav-wrapper blue lighten-3'>
          <a href="/" className='brand-logo'>LinksCutter</a>
          </div>
        }
      </nav>
      )
    }