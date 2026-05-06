import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { logoutUser } from '../store/slices/userSlice'
import './navbar.css'

export const Navbar = () => {
  const { isAuth } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const logoutHandler = () => {
    dispatch(logoutUser())
    navigate('/')
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav>
      {isAuth ? (
        <>
          <div className="nav-wrapper blue lighten-3">
            <a href="/create" className="brand-logo">LinksCutter</a>

      
            <ul className="nav-links">
              <li><a href="/create">Create</a></li>
              <li><a href="/links">Links</a></li>
              <li><a href="/" onClick={logoutHandler}>Logout</a></li>
            </ul>

           
            <button
              className={`burger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>

          {/* Mobile dropdown */}
          <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
            <a href="/create" onClick={closeMenu}>Create</a>
            <a href="/links" onClick={closeMenu}>Links</a>
            <a href="/" onClick={() => { logoutHandler(); closeMenu(); }}>Logout</a>
          </div>
        </>
      ) : (
        <div className="nav-wrapper blue lighten-3">
          <a href="/" className="brand-logo">LinksCutter</a>
        </div>
      )}
    </nav>
  )
}