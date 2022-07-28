import React from 'react'
import Nav from '../Nav';
import Button from '@mui/material/Button';
import './About.css';
import Stack from '@mui/material/Stack';


function About() {
  return (
    <div>
        <Nav/>
        <div className='display'>
            <img className='display_image'>

            </img>
            <Button variant="contained" className='Browsw_btn'>Contained</Button>
            <Stack spacing={20} direction="row">
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>

             </Stack>
        </div>
    </div>
  )

  }
export default About