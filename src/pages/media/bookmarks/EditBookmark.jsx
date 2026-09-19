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

export default function EditBookmark() {
    const [title, setTitle] = useState();
    const [link, setLink] = useState();

    const [titleError, setTitleError] = useState(false);
    const [linkError, setLinkError] = useState(false);
    

    const navigate = useNavigate();
    
    const { id } = useParams();
    const { document: bookmark } = useDocument('bookmark', id);


    useEffect(() => {
        setTitle(bookmark?.title);
        setLink(bookmark?.link);
    }, [bookmark?.title, bookmark?.link]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        setTitleError(false);
        setLinkError(false);

        if(title === '' || title.trim().length === 0){
            setTitleError(true);
            return;
        }

        if(link === '' || link.trim().length === 0){
            setLinkError(true);
            return;
        }

        const docRef = doc(db, 'bookmark', id);
        await updateDoc(docRef, {
            title: title.trim(),
            link: link,
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
                    Rediger bokmerke {bookmark?.title}
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
                <Typography sx={{marginTop: 2, textTransform:'uppercase'}}>Lenke:</Typography>
                <TextField 
                    value={link}
                    type="text"
                    onChange={(e) => setLink(e.target.value)}
                    sx={classes.field}
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={linkError}
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