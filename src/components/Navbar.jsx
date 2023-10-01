import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
        <Link>
            <p>Expense Tracker</p>
        </Link>
        <Link to={'/'}>
            <p>Home</p>
        </Link>
        <Link to={'/add-categories'}>
            <p>Add Categories</p>
        </Link>
    </div>
  )
}

export default Navbar