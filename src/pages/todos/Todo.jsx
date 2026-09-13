import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { useCollection } from "../../hooks/useCollection";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useNavigate, useParams } from "react-router-dom";


export default function Todo() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
  
    const { user } = useAuthContext();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const {documents: todos } = useCollection('todos', ['uid','==',user?.uid],['createdAt','desc'],['date','==',id]);

    const navigateBack = () => {
        navigate("/todos");
    }
  return (
    <Box sx={{margin: 10}}>
        <Button 
            sx={{width: 200, marginBottom: 5}}
            type="submit" 
            color="primary" 
            variant="contained"
            onClick={navigateBack}>
        <Typography>
          Dra tilbake
        </Typography>
      </Button>
        <Typography variant="h5" sx={{marginY: 5}}>Her kan du holde oversikt over dine gjøremål for {id}.</Typography>
        <Button 
            sx={{width: 200, marginBottom: 5}}
            type="submit" 
            color="primary" 
            variant="contained"
            onClick={toggleDrawer(true)}>
        <Typography>
          Lag ny todo
        </Typography>
      </Button>
      
      {todos && <TodoList todos={todos} />}
      
      <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
          <TodoForm user={user} setOpen={setOpen} />
      </Drawer>
    </Box>
  )
}