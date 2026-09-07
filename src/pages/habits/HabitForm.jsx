/* eslint-disable react/prop-types */

import { Box, Button, TextField, Typography } from "@mui/material";

import { useState } from "react";

import { db, timestamp } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";

const classes = {
    field: {
      marginTop: 3,
      marginBottom: 3,
      display: 'block',
      width: 400
    },
}

export default function TodoForm({user, setOpen}) {

    const [title, setTitle] = useState('');
    

    const [titleError, setTitleError] = useState(false);


    const handleSubmit = async(e) => {
        e.preventDefault();

        setTitleError(false);

        if(title === '' || title.trim().length === 0){
          setTitleError(true);
          return;
        }

        const colRef = collection(db, 'habit');

        await addDoc(colRef, {
            createdAt: timestamp.fromDate(new Date()),
            title: title.trim(),
            done: false,
            uid: user?.uid,
        });

        setOpen(false);
    }
  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
          >
          <Typography  
              variant="h6" 
              color="textSecondary"
              component="h2" 
              gutterBottom
              sx={{textTransform: 'uppercase'}}
          >
              Lag ny vane
          </Typography>
          
          <TextField 
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              sx={classes.field}
              label="Tittel"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              error={titleError}
          />
          
          <Button 
          sx={{width: 400}}
          type="submit" 
          color="primary" 
          variant="contained"
          >
          Lag todo
          </Button>
          </Box>
      </form>
      <Button 
          sx={{width: 200, position:'absolute', top: 10, right: 10}}
          type="submit" 
          color="primary" 
          variant="contained"
          onClick={() => setOpen(false)}
          >
          Lukk skjema
      </Button>
    </>
  )
}