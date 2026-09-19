import { Box, Button, TextField, Typography } from "@mui/material";
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

export default function EditNote() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const navigate = useNavigate();
    
    const { id } = useParams();

    const { document: note } = useDocument('note', id);

    useEffect(() => {
        setTitle(note?.title);
        setDescription(note?.description);

    }, [note?.title, note?.description]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        setTitleError(false);
        setDescriptionError(false);

        if(title === '' || title.trim().length === 0){
            setTitleError(true);
            return;
        }
        if(description === '' || description.trim().length === 0){
            setDescriptionError(true)
            return;
        }

        const docRef = doc(db, 'note', id);
        await updateDoc(docRef, {
            title: title.trim(),
            description: description.trim(),
        });

        navigate(`/medier`);
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
                    Rediger notat {note?.title}
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
                    value={description}
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    sx={classes.field}
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    multiline
                    rows={4}
                    required
                    error={descriptionError}
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