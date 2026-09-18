import { Box, Button, FormControlLabel, FormGroup, Switch, TextField, Typography } from "@mui/material";
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

export default function EditMedia() {
    const [title, setTitle] = useState();
    const [done, setDone] = useState();

    const [titleError, setTitleError] = useState(false);
    

    const navigate = useNavigate();
    
    const { id } = useParams();
    const { document: media } = useDocument('media', id);


    useEffect(() => {
        setTitle(media?.title);
        setDone(media?.done);
    }, [media?.title, media?.done]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        setTitleError(false);

        if(title === '' || title.trim().length === 0){
            setTitleError(true);
            return;
        }

        const docRef = doc(db, 'media', id);
        await updateDoc(docRef, {
            title: title.trim(),
            done
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
                    Rediger media {media?.title}
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

                <FormGroup sx={{padding: 3}}>
                    <FormControlLabel 
                        sx={{padding: 1}}
                        control={<Switch checked={done} onChange={(e) => setDone(e.target.checked)} />}
                        label="Ferdig"
                    />
                </FormGroup>
                
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