import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDocument } from '../../../hooks/useDocument';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";

export default function DeleteNote() {
    const { id } = useParams();

    const { document: note } = useDocument('note', id);

    const navigate = useNavigate();

    const deleteNote = async(id) => {
        const docRef = doc(db,'note', id);

        await deleteDoc(docRef);

        navigate(`/medier`);

    }

  return (
    <>
    <Box sx={{margin: 20}}>
        <Typography>Er du sikker du ønsker å slette Todo: {note?.title}?</Typography>
        <ButtonGroup sx={{marginY: 2}}> 
        <Button variant="contained" color="error" onClick={() => deleteNote(note.id)}>Slett Notat</Button>
        <Button variant="contained" onClick={() => navigate(`/medier`)}>Dra tilbake</Button>
        </ButtonGroup>
    </Box>
    </>
  )
}