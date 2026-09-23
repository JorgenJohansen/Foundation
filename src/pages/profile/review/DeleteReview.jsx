import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDocument } from '../../../hooks/useDocument';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";

export default function DeleteReview() {
    const { id } = useParams();

    const { document: review } = useDocument('review', id);

    const navigate = useNavigate();

    const deleteNote = async(id) => {
        const docRef = doc(db,'review', id);

        await deleteDoc(docRef);

        navigate(`/profil/anmeldelse`);

    }

  return (
    <>
    <Box sx={{margin: 20}}>
        <Typography>Er du sikker du ønsker å slette Anmeldelse: {review?.title}?</Typography>
        <ButtonGroup sx={{marginY: 2}}> 
        <Button variant="contained" color="error" onClick={() => deleteNote(review.id)}>Slett Anmeldelse</Button>
        <Button variant="contained" onClick={() => navigate(`/profil/anmeldelse`)}>Dra tilbake</Button>
        </ButtonGroup>
    </Box>
    </>
  )
}