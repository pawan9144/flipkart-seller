
import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const theme = createTheme();



function Signin() {

  // const [login, setlogin] = useState({
  //   email: "",
  //   phoneNumber: "",
  //   password: ""
  // })

  const [userData, setUserData] = useState({
    emailOrMobile: { value: '', error: '' },
    password: { value: '', error: '' }
  })

  const [logout,setloout]=useState(true)
  // const [error, seterror] = useState({})

  const inputhandle = (event) => {
   
    event.preventDefault();
    const { name, value } = event.target;
   
    setUserData({ ...value, [name]: value });
    switch (name) {
      case "email":
        if (value) {
          setUserData({ ...userData, emailOrMobile: { value: value, error: '' } })
        }
        else {
          setUserData({ ...userData, emailOrMobile: { value: value, error: 'Please enter mobile or email' } })
        }
        break
      case "password":
        if (value) {

          setUserData({ ...userData, password: { value: value, error: '' } })
        }
        else {
          setUserData({ ...userData, password: { value: value, error: 'Please enter password' } })
        }
    }


  }

  // console.log(userData)


  let navigate = useNavigate()

  const handleonsubmit = async (event) => {
    event.preventDefault();
    // seterror(validation(login));
    

    try {
      const url = "https://unlucky-shrimp-45.loca.lt/api/login";

      let email = '';
      let phoneNumber = '';
      navigate("/dashboard")
      if (isNaN(userData.emailOrMobile.value)) {
        email = userData.emailOrMobile.value;
      }
      else {
        phoneNumber = userData.emailOrMobile.value;
      }

      const req = {
        email: userData.emailOrMobile.value,
        password: userData.password.value
      }

      try {
        const result = await axios.post(url, req);
        navigate("/dashboard");
        if (result.success)
        {
          alert(result.message)
        }
        
        else {
          alert(result.message)
        }

        setloout(false)
      } catch (error) {
        console.log("eeee", error)
        alert('something went wrong')
      }

      // console.log(res);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setUserData(error.response.login.message);
      }
    }

  
  }

  
  
  // const validation = (values) => {
  //   console.log(values)
  //   let error = {}
  //   let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  //   let mobilenum = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  //   if (!values.email) {
  //     error.email = "email is required"
  //   } else if (!filter.test(values.email)) {
  //     error.email = "this is not valid format";
  //   }

  //   if (!values.phoneNumber) {

  //     error.phoneNumber = "mobile is required"
  //   } else if (!mobilenum.test(values.phoneNumber)) {
  //     error.phoneNumber = "this is not valid format"
  //   }

  //   if (!values.password) {
  //     error.password = "password is required"
  //   } else if (values.password.lenght < 5) {
  //     error.password = "password is more than fie character"
  //   }
  //   return error;

  // }
  const handlelogout =()=>{
    navigate("/")
      }
    


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleonsubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address / Mobile Number"
              name="email"
              autoComplete="email"
              value={userData.emailOrMobile.value}
              onChange={inputhandle}

            />
            {userData.emailOrMobile.error}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={userData.password.value}
              onChange={inputhandle}
            />
            {userData.password.error}
            {logout?<Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}

            >
              Sign In
            </Button>:<Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handlelogout}

            >
              Logout
            </Button>}
            <Grid container>
              <Grid item xs>
                Forgot password?
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  <p>Don't have an account? Sign Up</p>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}

export default Signin