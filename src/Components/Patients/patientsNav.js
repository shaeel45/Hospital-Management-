import React, { useState } from 'react'
import logo from '../../Ui/logo.png'
import StyleNav from '../../Navbar/navbar.module.css'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

const Navbar = () => {
  return (
    <nav className={StyleNav.navbar}>
       <div className={StyleNav.logocontainer}>
       <img src={logo} alt='logo' className={StyleNav.logo}></img>
       </div>
       
       <div className={StyleNav.button}>
        <Link to='/signin'>
            <Button variant="outlined" href="#outlined-buttons">
                Sign Out
            </Button>
        </Link>
       </div>
    </nav>
  )
}

export default Navbar
