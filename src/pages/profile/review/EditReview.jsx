import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useDocument } from "../../../hooks/useDocument";

const classes = {
    field: {
      marginTop: 3,
      marginBottom: 3,
      display: 'block',
      width: 400
    },
}

export default function EditReview() {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [score, setScore] = useState();

    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [scoreError, setScoreError] = useState(false);

    const navigate = useNavigate();
    
    const { id } = useParams();

    const { document: review } = useDocument('review', id);

    const handleChange = (event) => {
        setScore(event.target.value);
    }

    useEffect(() => {
        setTitle(review?.title);
        setContent(review?.content);
        setScore(review?.score);

    }, [review?.title, review?.content, review?.score]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        setTitleError(false);
        setContentError(false);
        setScoreError(false);

        if(title === '' || title.trim().length === 0){
            setTitleError(true);
            return;
        }

        if(content === '' || content.trim().length === 0){
            setContentError(true)
            return;
        }

        if(score === ''){
            setScoreError(true);
            return;
        }

        const docRef = doc(db, 'review', id);
        await updateDoc(docRef, {
            title: title.trim(),
            content: content.trim(),
            score: score,
            isEdited: true,
        });

        navigate(`/profil/anmeldelse`);
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
                    Rediger anmeldelse {review?.title}
                </Typography>
                <Typography sx={{marginTop: 2, textTransform:'uppercase'}}>Tittel:</Typography>
                <TextField 
                    value={title}
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    sx={classes.field}
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={titleError}
                />
                <Typography sx={{marginTop: 2, textTransform:'uppercase'}}>Innhold:</Typography>
                <TextField 
                    value={content}
                    type="text"
                    onChange={(e) => setContent(e.target.value)}
                    sx={classes.field}
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    multiline
                    rows={4}
                    required
                    error={contentError}
                />

                <Typography>Score er {score} </Typography>
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
                Lagre
                </Button>
            </Box>
        </form>
    </>
  )
}