import React from 'react'
import "./Nav.css"
import { Outlet, Link, useNavigate } from "react-router-dom";
import {  IconButton, MenuItem, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';



function Nav() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

let navigate = useNavigate(); // Navigate 
// search functionality
const handleSubmit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const data = event.target.value;
      console.log(data);
      window.sessionStorage.setItem('query' , data);
      navigate("/search");
    }
 };

 const handleProfileMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMobileMenuClose = () => {
  setMobileMoreAnchorEl(null);
};

const handleMenuClose = () => {
  setAnchorEl(null);
  handleMobileMenuClose();
};

  return (
    <div className='Navbar'>
    <div className='NavBar_content'>
    
        <h1 className='logo'>PaperBack</h1>
        <Link to={"/"} className="links">Home</Link>
        <Link to={"/search"} className="links" >search</Link>
        <Link to={"/pay"} className="links" >pricing</Link>
        <Link to={"/signup"} className="links" >Signup</Link>
        <Link to={"/about"} className="links" >About Us</Link>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          size="small"
          onKeyPress = {handleSubmit}
          name="email"
          
        />
       
     
    </div>
    </div>
  )
}

export default Nav