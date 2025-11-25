import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDocument } from '../../hooks/useDocument';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function DeleteTodo() {
    const { id } = useParams();
    const { document: todo } = useDocument('todos', id);
    //console.log(todo);
    const navigate = useNavigate();

    const deleteTodo = async(id) => {
        const docRef = doc(db,'todos', id);

        await deleteDoc(docRef);

        navigate('/todos');

    }

  return (
    <>
    <Box sx={{margin: 20}}>
        <Typography>Er du sikker du ønsker å slette Todo: {todo?.title}?</Typography>
        <ButtonGroup sx={{marginY: 2}}> 
        <Button variant="contained" color="error" onClick={() => deleteTodo(todo.id)}>Slett Todo</Button>
        <Button variant="contained" onClick={() => navigate('/todos')}>Dra tilbake</Button>
        </ButtonGroup>
    </Box>
    </>
  )
}