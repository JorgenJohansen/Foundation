import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDocument } from '../../../hooks/useDocument';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";

export default function DeleteMedia() {
    const { id } = useParams();
    const { document: media } = useDocument('media', id);

    const navigate = useNavigate();

    const deleteMedia = async(id) => {
        const docRef = doc(db,'media', id);

        await deleteDoc(docRef);

        navigate('/medier');

    }

  return (
    <>
    <Box sx={{margin: 20}}>
        <Typography>Er du sikker du ønsker å slette media: {media?.title}?</Typography>
        <ButtonGroup sx={{marginY: 2}}> 
        <Button variant="contained" color="error" onClick={() => deleteMedia(media.id)}>Slett Media</Button>
        <Button variant="contained" onClick={() => navigate('/medier')}>Dra tilbake</Button>
        </ButtonGroup>
    </Box>
    </>
  )
}