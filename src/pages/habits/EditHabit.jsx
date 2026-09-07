import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";

const classes = {
    field: {
      marginTop: 3,
      marginBottom: 3,
      display: 'block',
      width: 400
    },
}

export default function EditHabit() {
    const [title, setTitle] = useState();

    const [titleError, setTitleError] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    const { document: habit } = useDocument('habit', id);

    useEffect(() => {
        setTitle(habit?.title);
    }, [habit?.title]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        setTitleError(false);

        if(title === '' || title.trim().length === 0){
            setTitleError(true);
            return;
        }
       

        const docRef = doc(db, 'habit', id);
        await updateDoc(docRef, {
            title: title.trim(),
        });

        navigate('/vaner');
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
                    Rediger vane {habit?.title}
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