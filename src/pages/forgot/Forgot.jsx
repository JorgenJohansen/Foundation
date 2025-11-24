import { Box, Button, TextField, Typography } from "@mui/material";

import { useState } from 'react';

import { db } from '../../firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';

const classes = {
    field: {
      marginTop: 3,
      marginBottom: 3,
      display: 'block',
      width: 300
    },
}

export default function Forgot() {
    const [ email, setEmail ] = useState('');
    const [ confirmed, setConfirmed] = useState(false);
    const [ error, setError ] = useState(null);
    const [ emailError, setEmailError ] = useState(false);

    const emailNotFound = (errorText) => {
        if(errorText?.toLowerCase() === 'there is no user record corresponding to this identifier. the user may have been deleted.'){
            return 'Vi kan ikke finne en bruker med den e-posten.'
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setConfirmed(false);
        setEmailError(false);

        if(email === ''){
            setEmailError(true);
        }

        if(email){
            await sendPasswordResetEmail(db, email).then(data => {
                console.log(data);
                setConfirmed(true);
            }).catch(err => {
                console.log(err.message);
                setError(err.message);
            });
        }
    }

  return (
    <div>
        
        {!confirmed && <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                Glemt passord
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
            {error && <Typography sx={{padding: 2, marginBottom: 3, border: '2px solid red', fontFamily: 'comic-sans'}} color="red">{emailNotFound(error)}</Typography>}
            <Button 
            sx={{width: 300}}
            type="submit" 
            color="primary" 
            variant="contained"
            >
            Send E-post
            </Button>
            
            </Box>
        </form>}
        {confirmed && 
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="60vh"
        >
            <Typography variant='h4'>Glemt passord</Typography>
            <Typography sx={{width: '300px', margin: '10px 10px 20px 30px'}} variant='h6' color='info'>En e-post er sendt til din innboks, husk å sjekke søppelposten.</Typography>
            <Button 
                sx={{width: 300}}
                color="primary" 
                variant="contained"
                onClick={() => setConfirmed(false)}
            >
            Send på nytt
            </Button>
        </Box>}
        
    </div>
  )
}
