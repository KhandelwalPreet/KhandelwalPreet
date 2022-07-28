import React, { useState } from 'react';
import Banner from '../Banner';
import Row from '../Row';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
  import SearchAppBar from '../Nav2'
import Nav from '../Nav';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import ResponsiveAppBar from '../Nav2';
import Row2 from '../Row2';
import Row from '../Row';

const firebaseConfig = {
  apiKey: "AIzaSyBY_gnlBU1zh5rya-tC7e03Gv8937DVRRc",
  authDomain: "paper-reed.firebaseapp.com",
  projectId: "paper-reed",
  storageBucket: "paper-reed.appspot.com",
  messagingSenderId: "984882080850",
  appId: "1:984882080850:web:c4063f4ed8c78eef86c38b",
  measurementId: "G-4BXHKKGTF6"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();



function Home() { 

    const [loggedin , setLoggedin] = useState(false);
    const [user_id , setUser_id] = useState([]);

    const mystyle ={
      backgroundColor : "#0F171E",
      overflowX: "hidden",
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setLoggedin(true);
        setUser_id(uid);
        console.log(uid);
        // ...
      } else {
        // User is signed out
        // ...
        console.log("logout");
      }
    });
  

  return (
    <div style={ mystyle} >
        <ResponsiveAppBar />
        <Banner/>
        <div className="catagory" style={{marginBottom : "19px" , marginTop: "22px"}} >
        <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" >
        <Button variant="contained">Contained</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="contained">Contained</Button>
        </Stack>
        </div>
        <Row/>
           <Row/>
           <Row/>
        <Row2 title="Business"   Genere = "%fiction"   row_category = ""    loggedin = {loggedin} uid = {user_id}/>
        <Row2 title="self help"   Genere = "%%"   row_category = ""   loggedin = {loggedin}/>
        <Row2 title="Business"   Genere = "%Business%"   row_category = "%buiseness%"    loggedin = {loggedin} uid = {user_id}/>
        <Row2 title="Novels"    Genere = "%%"   row_category = "%buiseness%"   loggedin = {loggedin} uid = {user_id}/>
        <Row2 title="all"   Genere = "%self%"   row_category = "%[Economics]%"   loggedin = {loggedin} uid = {user_id} />
        
        
    </div>
  )

}
export default Home

