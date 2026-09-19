import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDocument } from '../../../hooks/useDocument';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";

export default function DeleteBookmark() {
    const { id } = useParams();
    const { document: bookmark } = useDocument('bookmark', id);

    const navigate = useNavigate();

    const deleteMedia = async(id) => {
        const docRef = doc(db,'bookmark', id);

        await deleteDoc(docRef);

        navigate('/medier');

    }

  return (
    <>
    <Box sx={{margin: 20}}>
        <Typography>Er du sikker du ønsker å slette bokmerke: {bookmark?.title}?</Typography>
        <ButtonGroup sx={{marginY: 2}}> 
        <Button variant="contained" color="error" onClick={() => deleteMedia(bookmark.id)}>Slett Bokmerke</Button>
        <Button variant="contained" onClick={() => navigate('/medier')}>Dra tilbake</Button>
        </ButtonGroup>
    </Box>
    </>
  )
}