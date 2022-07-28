import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyBY_gnlBU1zh5rya-tC7e03Gv8937DVRRc",
  authDomain: "paper-reed.firebaseapp.com",
  projectId: "paper-reed",
  storageBucket: "paper-reed.appspot.com",
  messagingSenderId: "984882080850",
  appId: "1:984882080850:web:c4063f4ed8c78eef86c38b",
  measurementId: "G-4BXHKKGTF6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const theme = createTheme();

export default function SignUp() {
  const [show, setShow] = useState(false); // alert
  const [inserted_in_user_db, setInserted_in_user_db] = useState(); //  inserted the user details in the user db or not

  // *** INPUT VALIDATION ******
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      policy: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      firstName: Yup.string().max(255).required("First name is required"),
      lastName: Yup.string().max(255).required("Last name is required"),
      password: Yup.string().max(255).required("Password is required"),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: () => { },
  });
  // *** INPUT VALIDATION ENDS ......

  // SIGNUP BTN ON CLICK....

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let email = data.get("email");
    let password = data.get("password");
    let name = data.get("firstName");

    // firebase registration

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user.uid;
        console.log(user);
        axios
          .post("http://localhost:3003/register/user", {
            id: user,
            name: name,
            Email: email,
          })
          .then((result) => {
            console.log(result);
            const r = (result.status != null) ? true : try_again(user ,  name , email);
            setInserted_in_user_db(r)

          })
          .catch((err) => {
            console.log(err);
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 1000);

        // ..
      });
  };
  // ......

  // *** TRY AGAIN ****
  function try_again(user ,  name , email) {
    axios
      .post("http://localhost:3003/register/user", {
        id: user,
        name: name,
        Email: email,
      })
      .then((result) => {
        console.log(result);
        const r = (result.data == 'sucessful') ? true : false;
        setInserted_in_user_db(r);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Button onClick={try_again}>jhiuvd</Button>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={Boolean(
                    formik.touched.firstName && formik.errors.firstName
                  )}
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            {show ? (
              <Alert severity="error">
                This is an error alert — check it out!
              </Alert>
            ) : null}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
