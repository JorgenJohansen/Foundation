import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";

import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { useSignup } from "../../hooks/useSignup";

import styles from './Signup.module.css';

const classes = {
    field: {
      marginTop: 3,
      marginBottom: 3,
      display: 'block',
      width: 300
    },
}

export default function Signup() {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState('');
    const [acceptTos, setAcceptTos] = useState(false);

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [tosError, setTosError] = useState(false);

    const { signup, isPending, error } = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();

        setNameError(false);
        setEmailError(false);
        setPasswordError(false);
        setTosError(false);

        if(name === ''){
            setNameError(true);
        }
        if(email === ''){
            setEmailError(true);
        }
        if(password === ''){
            setPasswordError(true);
        }
        if(!acceptTos){
            setTosError(true);
        }

        if(name && email && password && acceptTos){
            signup(email, password, name, acceptTos);
        }
    }

    const emailIsUsed = (errorText) => {
        if(errorText?.toLowerCase() === 'the email address is already in use by another account.'){
            return 'E-posten er allerede i bruk.'
        }else if(errorText?.toLowerCase() === 'password should be at least 6 characters'){
            return 'Passordet må være minst 6 tegn.'
        }
    }

    function evaluatePasswordStrength(password) {
        let score = 0;
    
        if (!password) return '';
    
        // Check password length
        if (password.length > 8) score += 1;
        // Contains lowercase
        if (/[a-z]/.test(password)) score += 1;
        // Contains uppercase
        if (/[A-Z]/.test(password)) score += 1;
        // Contains numbers
        if (/\d/.test(password)) score += 1;
        // Contains special characters
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
        switch (score) {
          case 0:
          case 1:
          case 2:
          return "Svak";
        case 3:
          return "Medium";
        case 4:
        case 5:
          return "Sterk";
        default:
          return '';
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
                    minHeight="80vh"
                    marginBottom={20}
                >
                <Typography  
                    variant="h6" 
                    color="textSecondary"
                    component="h2" 
                    gutterBottom
                    sx={{textTransform: 'uppercase'}}
                >
                    Registrer deg
                </Typography>
                <TextField 
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    sx={classes.field}
                    label="Navn"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={nameError}
                />
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
                {error && <Typography sx={{border: '2px solid red', padding: 2}} color="red">{emailIsUsed(error)}</Typography>}
                <TextField 
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setStrength(evaluatePasswordStrength(e.target.value));
                    }}
                    sx={classes.field}
                    label="Passord"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={passwordError}
                />
                {strength && 
                    <Box display="flex">
                        <Typography>Passord styrke: </Typography>
                        <Typography sx={{color: strength === 'Svak' ? 'red' : strength === 'Medium' ? 'orange' : 'green', marginLeft: 1}}>{strength}</Typography>
                    </Box>}
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    margin="15px"
                >
                    <Checkbox 
                        required 
                        sx={{width: 40}} 
                        onChange={(e) => setAcceptTos(e.target.checked)}
                        error={tosError}
                    />
                    <Typography>
                    Du godtar våre <RouterLink className={styles.link} to="/vilkar">vilkår for bruk</RouterLink> og <RouterLink className={styles.link} to="/personvern">personvernregler</RouterLink>
                    </Typography>
                </Box>
                
                {!isPending && <Button 
                sx={{width: 400}}
                type="submit" 
                color="primary" 
                variant="contained"
                > 
                Registrer deg
                </Button>}
                {isPending && <Button 
                sx={{width: 400}}
                type="submit" 
                color="primary" 
                variant="contained"
                disabled
                > 
                Laster inn
                </Button>}
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginTop={4}
                    >
                        <Typography>Har allerede bruker:</Typography>
                        <RouterLink style={{fontSize: 17}} className={styles.link} to="/logg-inn" >Logg inn</RouterLink>
                    </Box>
                </Box>
            </form>
        </>
    )
}
