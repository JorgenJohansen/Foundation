import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { useCollection } from "../../hooks/useCollection";
import HabitForm from "./HabitForm";
import HabitList from "./HabitList";


export default function Habits() {

    const [open, setOpen] = useState(false);
  
    const { user } = useAuthContext();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const {documents: habits } = useCollection('habit', ['uid','==',user?.uid],['createdAt','desc']);

  return (
    <Box sx={{margin: 10}}>
        <Typography variant="h5" sx={{marginY: 5}}>Her kan du holde oversikt over dine vaner.</Typography>
        <Button 
      sx={{width: 200, marginBottom: 5}}
      type="submit" 
      color="primary" 
      variant="contained"
      onClick={toggleDrawer(true)}>
        <Typography>
          Lag ny vane
        </Typography>
      </Button>
      
      {habits && <HabitList habits={habits} />}
      
      <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
          <HabitForm user={user} setOpen={setOpen} />
      </Drawer>
    </Box>
  )
}