import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'


export const NavBar = ({ handleLogout }) => {

  const style = {
    padding: '5px 10px',
    margin: '5px 0px',
    backgroundColor: 'navy',
    border: '0.5px solid darkBlue',
    color: 'inherit',
    fontSize: '2rem'
  }

  const links = {
    color: 'white',
    textDecoration: 'none',
    padding: '0px 15px'
  }
  return(
    <nav style={style}>
      <Link to="/" style={links}>Blogs</Link>
      <Link to="/users" style={links}>Users</Link>
      <Button variant="outline-warning" onClick={handleLogout}>Logout</Button>
    </nav>

  )
}