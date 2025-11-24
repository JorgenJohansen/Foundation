import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import TodoForm from "./TodoForm";
import { useCollection } from "../../hooks/useCollection";
import TodoList from "./TodoList";


export default function Todos() {

    const [open, setOpen] = useState(false);
  
    const { user } = useAuthContext();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const {documents: todos } = useCollection('todos', ['uid','==',user?.uid],['createdAt','desc']);
    console.log(todos);

  return (
    <Box sx={{margin: 10}}>
        <Typography variant="h5" sx={{marginY: 5}}>Her kan du holde oversikt over dine gjøremål.</Typography>
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
      
      {todos && <TodoList user={user} todos={todos} />}
      
      <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
          <TodoForm user={user} setOpen={setOpen} />
      </Drawer>
    </Box>
  )
}