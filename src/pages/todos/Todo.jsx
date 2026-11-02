import { useAuthContext } from "../../hooks/useAuthContext";
import { lazy, useState } from "react";
import { Box, Button, Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useCollection } from "../../hooks/useCollection";

import { useNavigate, useParams } from "react-router-dom";

// import TodoForm from "./TodoForm";
// import TodoList from "./TodoList";

const TodoForm = lazy(() => import('./TodoForm'));
const TodoList = lazy(() => import('./TodoList'));


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
      <List>
        <ListItem sx={{width: 400,  border: "3px solid #1769aa", borderRadius: 2, marginY: 2}}
            key={"key"}
  
        >
            <ListItemText primary={`Her kan du holde oversikt over dine gjøremål for ${id}.`} />
        </ListItem>
    </List>
        
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