import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDocument } from '../../hooks/useDocument';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function DeleteHabit() {
    const { id } = useParams();
    const { document: habit } = useDocument('habit', id);

    const navigate = useNavigate();

    const deleteHabit = async(id) => {
        const docRef = doc(db,'habit', id);

        await deleteDoc(docRef);

        navigate('/vaner');

    }

  return (
    <>
    <Box sx={{margin: 20}}>
        <Typography>Er du sikker du ønsker å slette vane: {habit?.title}?</Typography>
        <ButtonGroup sx={{marginY: 2}}> 
        <Button variant="contained" color="error" onClick={() => deleteHabit(habit.id)}>Slett Vane</Button>
        <Button variant="contained" onClick={() => navigate('/vaner')}>Dra tilbake</Button>
        </ButtonGroup>
    </Box>
    </>
  )
}