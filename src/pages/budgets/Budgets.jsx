import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { useCollection } from "../../hooks/useCollection";
import BudgetList from "./BudgetList";
import BudgetForm from "./BudgetForm";

export default function Budgets() {

    const [open, setOpen] = useState(false);
      
    const { user } = useAuthContext();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const { documents: budgets } = useCollection('budgets', ['uid','==',user?.uid],['createdAt','desc']);

  return (
    <Box sx={{margin: 10}}>
        <Typography variant="h5" sx={{marginY: 5}}>Her kan du holde oversikt over dine budsjetter:</Typography>

        <Button 
      sx={{width: 200, marginBottom: 5}}
      type="submit" 
      color="primary" 
      variant="contained"
      onClick={toggleDrawer(true)}>
        <Typography>
          Lag nytt budsjett
        </Typography>
      </Button>

      {budgets && <BudgetList budgets={budgets} />}
            
    <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
        <BudgetForm user={user} setOpen={setOpen} />
    </Drawer>
    </Box>
  )
}