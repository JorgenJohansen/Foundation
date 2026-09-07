import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { useCollection } from "../../hooks/useCollection";
import HabitForm from "./HabitForm";
import HabitList from "./HabitList";
import RegisterDailyHabitsForm from "./RegisterDailyHabitsForm";


export default function Habits() {

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
  
    const { user } = useAuthContext();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const toggleDrawer2 = (newOpen) => () => {
        setOpen2(newOpen);
    };
    const date = new Date().toLocaleDateString();

    const {documents: habits } = useCollection('habit', ['uid','==',user?.uid],['createdAt','desc'],['done','==',false]);

    const {documents: doneHabits } = useCollection('habit', ['uid','==',user?.uid],['createdAt','desc'], ['date', '==', date]);

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

      {doneHabits?.length === 0 && <Button 
          sx={{width: 200, marginBottom: 5}}
          type="submit" 
          color="secondary" 
          variant="contained"
          onClick={toggleDrawer2(true)}>
        <Typography>
          Registrer dagens vaner
        </Typography>
      </Button>}

      <Drawer anchor="bottom" open={open2} onClose={toggleDrawer2(false)}>
          <RegisterDailyHabitsForm user={user} setOpen2={setOpen2} habits={habits} />
      </Drawer>

      <Typography variant="h5" sx={{marginY: 5}}>Her kan du se de vanene du har utført i dag.</Typography>
      {doneHabits.length === habits.length && <Typography variant="h5" sx={{marginY: 5}}>Bra jobba! ({`${doneHabits.length} / ${habits.length}`}).</Typography>}

      {doneHabits && <HabitList habits={doneHabits} />}
    </Box>
  )
}