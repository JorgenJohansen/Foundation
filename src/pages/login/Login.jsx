import { Box, Button, TextField, Typography } from "@mui/material";

import { useState } from "react";
import { Link } from "react-router-dom";

import { useLogin } from "../../hooks/useLogin";

import styles from './Login.module.css';

const classes = {
    field: {
      marginTop: 3,
      marginBottom: 3,
      display: 'block',
      width: 300
    },
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const { login, error, isPending} = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();

        setEmailError(false);
        setPasswordError(false);

        if(email === ''){
            setEmailError(true);
        }
        if(password === ''){
            setPasswordError(true);
        }

        if(email && password){
            login(email, password);
        }
    }

  return (
    <>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="60vh"
            >
            <Typography  
                variant="h6" 
                color="textSecondary"
                component="h2" 
                gutterBottom
                sx={{textTransform: 'uppercase'}}
            >
                Logg inn
            </Typography>
            
            <TextField 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                sx={classes.field}
                label="E-post"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                error={emailError}
            />
            <TextField 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                sx={classes.field}
                label="Passord"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                error={passwordError}
            />
            {error && <Typography sx={{padding: 2, marginBottom: 3, border: '2px solid red', fontFamily: 'comic-sans'}} color="red">Feil E-post/Passord.</Typography>}
            {!isPending && <Button 
            sx={{width: 300}}
            type="submit" 
            color="primary" 
            variant="contained"
            >
            Logg inn
            </Button>}
            {isPending && <Button 
            sx={{width: 300}}
            type="submit" 
            color="primary" 
            variant="contained"
            >
            Laster inn
            </Button>}
            
            </Box>
            
        </form>
        <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                marginTop={-10}
            >
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginLeft={0.5}
            >
                <Typography>Glemt Passord:</Typography>
                <Link className={styles.link} to="/glemt-passord" >Glemt Passord</Link>
            </Box>
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop={2}
            >
                <Typography>Har ikke bruker:</Typography>
                <Link className={styles.link} to="/registrer" >Registrer deg</Link>
            </Box>
        </Box>
    </>
  )
}