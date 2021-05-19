import React from 'react';
import '../css/NavBar.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const auth = useAuth()
  async function handleSignOut() {
    await auth.removeToken()
  }

  return (
    <div className="navbar">
      <div 
      className="dropdown"
      >
        <button className="dropbtn">
        <div  className="icon" />
        </button>
        <div 
        className="dropdown-content"
        >
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/chats">Chats</Link>
          <Link to="/profile">Profile</Link>
           </div>
        {auth.token && <button className="log-out-btn" type="submit" onClick={handleSignOut}>Log Out</button>}

      </div>
        </div>
  )
}

export default Navbar