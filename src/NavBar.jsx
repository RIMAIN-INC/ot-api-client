import React from 'react'
import { useNavigate} from 'react-router-dom'
import {useEffect} from 'react'


export default function NavBar() {
  const navigate = useNavigate();
  const getHome = () => {
      navigate('/home');
  }

  const signUserOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/sign-in')
  }


  return (
    <>
        <header>
        <h1>OrangeTech</h1>
        <nav class="nav_links">
            <ul>
            <li><a><button name="btnHome" onClick={getHome}>Home</button></a></li>
            <li><a>About</a></li>
            <li><a>Service</a></li>
            </ul>
        </nav>
        <a><button class="button">Contact</button></a>
        <div className="logout-container">
          <a><button onClick={signUserOut} class="logout">Logout</button></a>
        </div>
        </header>
    </>
  )
}
