import React, { useState } from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import StyleSignin from './signin.module.css';
import SigninImg from '../../Ui/signin.jpg';
import PatientDash from '../Patients/patientdash';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { isSignInWithEmailLink } from 'firebase/auth';

const Signin = () => {
  const [patientData, setPatientData] = useState({
    name: '',
    patientid: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);

  const InputHandler = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSignedIn(false);

    const email = patientData.email;
    const password = patientData.password;
    const stName = "Admin";
    const stemail = "admin@gmail.com";
    const stpass = "admin123";

    if (email === stemail && password === stpass && patientData.name === stName) {
      navigate("/admin/*/dashboard");
      return;
    }

    try {
      // Sign in the user with email and password
      await isSignInWithEmailLink(auth, email, password);

      // If sign-in is successful, set signedIn state to true
      setSignedIn(true);

      // Navigate to the desired page after successful sign-in
      navigate("/");
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle sign-in errors here
    }
  };

  return (
    <>
      {!signedIn ? (
        <div className={StyleSignin.signincontainer}>
          <div className={StyleSignin.formimg}>
            <div>
              <motion.h1
                initial={{ x: -100 }}
                animate={{ x: [70, 0] }}
                transition={{ duration: '1' }}
                whileInView="visible"
              >
                Patient Sign In
              </motion.h1>
              <form className={StyleSignin.form} onSubmit={submitHandler}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="name"
                  label="Patient Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={patientData.name}
                  onChange={InputHandler}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="patientid"
                  label="Patient Id"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={patientData.patientid}
                  onChange={InputHandler}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="email"
                  label="Email Address"
                  type="email"
                  variant="standard"
                  value={patientData.email}
                  onChange={InputHandler}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="standard"
                  value={patientData.password}
                  onChange={InputHandler}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5rem' }}>
                  <div className={StyleSignin.button}>
                    <Link to='/'>
                      <Button variant="outlined" type="submit">
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                  <div className={StyleSignin.button}>
                    <Button variant="contained" type="submit">
                      Sign in
                    </Button>
                  </div>
                </div>
                <Link to='/admin/*/dashboard'>
                  <div className={StyleSignin.button}>
                    <Button variant="contained" type="submit" fullWidth>
                      Sign in As Admin
                    </Button>
                  </div>
                </Link>
              </form>
            </div>
            <div className={StyleSignin.img}>
              <img
                src={SigninImg}
                alt="signinimg"
                style={{ height: '28rem', width: '27rem' }}
              ></img>
            </div>
          </div>
        </div>
      ) : (
        <PatientDash />
      )}
    </>
  );
};

export default Signin;
