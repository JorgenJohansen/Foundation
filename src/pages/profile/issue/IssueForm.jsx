/* eslint-disable react/prop-types */

import { Box, Button, TextField, Typography } from "@mui/material";

import { useState } from "react";

import { db, timestamp } from "../../../firebase/config";
import { addDoc, collection } from "firebase/firestore";

const classes = {
    field: {
      marginTop: 3,
      marginBottom: 3,
      display: 'block',
      width: 400
    },
}


export default function IssueForm({user, date, setOpen}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        setTitleError(false);
        setContentError(false);

        if(title === '' || title.trim().length === 0){
          setTitleError(true);
          return;
        }

        if(content === ''|| content.trim().length === 0){
          setContentError(true);
          return;
        }


        const colRef = collection(db, 'issue');

        await addDoc(colRef, {
            createdAt: timestamp.fromDate(new Date()),
            title: title,
            content: content,
            date: date,
            uid: user?.uid,
        });

        setOpen(false);
    }

    return (
        <div>
            
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
                    Rapporter feilen
                </Typography>

                
            
                <TextField 
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    sx={classes.field}
                    label="Hva handler feilen om?"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={titleError}
                />
                <TextField 
                    type="text"
                    onChange={(e) => setContent(e.target.value)}
                    sx={classes.field}
                    label="Beskriv feilen"
                    variant="outlined"
                    color="secondary"
                    multiline
                    rows={10}
                    fullWidth
                    required
                    
                    error={contentError}
                />
                
                
                <Button 
                sx={{width: 400}}
                type="submit" 
                color="primary" 
                variant="contained"
                >
                Send inn feilen
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
        </div>
    )
}