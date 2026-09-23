/* eslint-disable react/prop-types */

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

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


export default function ReviewForm({user, setOpen}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [score, setScore] = useState('');

    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [scoreError, setScoreError] = useState(false);

    const handleChange = (event) => {
        setScore(event.target.value);
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        setTitleError(false);
        setContentError(false);
        setScoreError(false);

        if(title === '' || title.trim().length === 0){
          setTitleError(true);
          return;
        }

        if(content === ''|| content.trim().length === 0){
          setContentError(true);
          return;
        }

        if(score === ''){
            setScoreError(true);
            return;
        }

        const colRef = collection(db, 'review');

        await addDoc(colRef, {
            createdAt: timestamp.fromDate(new Date()),
            title: title,
            content: content,
            score: score,
            isEdited: false,
            isPending: true,
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
                    Lag anmeldelse
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
                <Box sx={{width: 400, margin: 5}}>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Score</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={score}
                    label="Score"
                    onChange={handleChange}
                    >
                    <MenuItem value={1}>1 (Svært dårlig)</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10 (Svært bra)</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                {scoreError && <Typography>Score må være et tall mellom 1 og 10.</Typography>}
                
                
                <Button 
                sx={{width: 400}}
                type="submit" 
                color="primary" 
                variant="contained"
                >
                Send inn din anmeldelse
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