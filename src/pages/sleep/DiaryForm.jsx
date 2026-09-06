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


export default function DiaryForm({user, date, week, setOpen}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    

    const getYear = (date1) => {
        const dateList = date1.split(".");
        const year = dateList[2];
        return +year;
    }

    const getDate = (date1) => {
        const dateList = date1.split(".");
        return `${dateList[0]}.${dateList[1]}.${dateList[2]}`
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        setTitleError(false);
        setContentError(false);
        

        if(title === ''){
          setTitleError(true);
          return;
        }

        if(content === ''){
          setContentError(true);
          return;
        }

        const colRef = collection(db, 'diary');

        await addDoc(colRef, {
            createdAt: timestamp.fromDate(new Date()),
            date: date,
            week: week,
            year: getYear(date),
            title: title,
            content: content,
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
                    Lag dagbok for {getDate(date)}
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
                {titleError && <Typography sx={{marginBottom: 2, color: 'red', border: '2px solid red', borderRadius: 10, padding: 2}}>Søvn kvalitet må være mellom 1 og 5.</Typography>}
                <TextField 
                    type="text"
                    onChange={(e) => setContent(e.target.value)}
                    sx={classes.field}
                    label="Innhold"
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
                Lag din dagbok
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