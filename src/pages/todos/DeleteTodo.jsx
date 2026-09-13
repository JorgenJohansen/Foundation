import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDocument } from '../../hooks/useDocument';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function DeleteTodo() {
    const location = useLocation();
    const locationSplit = location.pathname.split("/");
    const date = locationSplit[2];
    const todoId = locationSplit[4];

    const { document: todo } = useDocument('todos', todoId);

    const navigate = useNavigate();

    const deleteTodo = async(id) => {
        const docRef = doc(db,'todos', id);

        await deleteDoc(docRef);

        navigate(`/todos/${date}`);

    }

  return (
    <>
    <Box sx={{margin: 20}}>
        <Typography>Er du sikker du ønsker å slette Todo: {todo?.title}?</Typography>
        <ButtonGroup sx={{marginY: 2}}> 
        <Button variant="contained" color="error" onClick={() => deleteTodo(todo.id)}>Slett Todo</Button>
        <Button variant="contained" onClick={() => navigate(`/todos/${date}`)}>Dra tilbake</Button>
        </ButtonGroup>
    </Box>
    </>
  )
}