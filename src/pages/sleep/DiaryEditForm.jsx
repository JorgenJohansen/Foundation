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

export default function EditDiaryForm() {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();


    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    const { document: diary } = useDocument('diary', id);

    useEffect(() => {
        setTitle(diary?.title);
        setContent(diary?.content);
    }, [diary?.title, diary?.content]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        setTitleError(false);
        setContentError(false);

        if(title === '' || title.trim().length === 0){
            setTitleError(true);
            return;
        }
        if(content === '' || content.trim().length === 0){
            setContentError(true)
            return;
        }

        const docRef = doc(db, 'diary', id);
        await updateDoc(docRef, {
            title: title.trim(),
            content: content.trim(),
        });

        navigate('/');
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
                    Rediger dagbok
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