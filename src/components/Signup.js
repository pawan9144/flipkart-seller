import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

function Signup() {
  // const [values, setValues] = useState({
  //   fullName: "",
  //   email: "",
  //   phoneNumber: "",
  //   password: ""
  // })
  // const [error, seterror] = useState({});

  const [formValues, setFormValues] = useState({
    fullName: { value: '', error: '' },
    email: { value: '', error: '' },
    phone: { value: '', error: '' },
    password: { value: '', error: '' }
  })



  const handleonchange = (e) => {   
    // debugger;
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...value, [name]: value });
    // seterror(validation(value));

    switch (name) {
      case "fullName":
        if (value) {
          setFormValues({ ...formValues, fullName: { value: value, error: '' } })
        }
        else {
          setFormValues({ ...formValues, fullName: { value: value, error: 'Please enter name' } })
        }
        break;
      case "email":
        if (value) {
          const isValid = validEmail(value)
          setFormValues({ ...formValues, email: { value: value, error: isValid ? '' : 'Please enter valid email' } })
        }
        else {
          setFormValues({ ...formValues, email: { value: value, error: 'Please enter email' } })
        }
        break;
        case "phone":
          if (value) {
         
            setFormValues({ ...formValues, phone: { value: value, error: " " } })
          }
          else {
            setFormValues({ ...formValues, phone: { value: value, error: 'Please enter phone' } })
          }
          break;
          case "password":
            if (value) {
          
              setFormValues({ ...formValues, password: { value: value, error: ""} })
            }
            else {
              setFormValues({ ...formValues, password: { value: value, error: 'Please enter password' } })
            }
            break;
        

    }

  };




  const validEmail = (email) => {
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
      return false
    }
    return true;
  }

  // const validation = (values) => {
  //   console.log(values)
  //   let error = {}
  //   let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  //   let mobilenum = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  //   var regex = /^[a-zA-Z ]{2,30}$/;

  //   if (!values.fullName) {
  //     error.fullName = "name is required"
  //   } else if (!regex.test(values.fullName)) {
  //     error.fullName = "this is not valid format"
  //   }

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



  let navigate = useNavigate()

  const handleonsubmit = async (event) => {
    event.preventDefault();
    // seterror(validation(values));

    const req = {
      fullName:formValues.fullName.value,
      email: formValues.email.value,
      phone:formValues.phone.value,
      password: formValues.password.value
    }
    try {
      const url = "https://unlucky-shrimp-45.loca.lt/api/register";
      const { values: res } = await axios.post(url, req);
      navigate("/");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setFormValues(error.response.values.message);
      }
    }

  };





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
            Sign up
          </Typography>

          {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}

          <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleonsubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="First Name"
                  autoFocus
                  value={formValues.fullName.value}
                  onChange={handleonchange}
                />
                {formValues.fullName.error}
                {/* {error.fullName && <p>{error.fullName}</p>} */}
              </Grid>

              <Grid item xs={12}>
                <TextField
                autoComplete="off"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  
                  value={formValues.email.value}
                  onChange={handleonchange}
                />
                {formValues.email.error}
                {/* {error.email && <p>{error.email}</p>} */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                autoComplete="off"
                  required
                  fullWidth
                  id="phone"
                  label="Moblie Number"
                  name="phone"
               
                  value={formValues.phone.value}
                  onChange={handleonchange}
                />
                {formValues.phone.error}
                {/* {error.phoneNumber && <p>{error.phoneNumber}</p>} */}

              </Grid>
              <Grid item xs={12}>
                <TextField
                autoComplete="off"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={formValues.password.value}
                  onChange={handleonchange}
                />
                {formValues.password.error}
                {/* {error.password && <p>{error.password}</p>} */}
              </Grid>

            </Grid>
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
                <Link to="/" variant="body2">
                  <p>Already have an account? Sign in</p>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}

export default Signup