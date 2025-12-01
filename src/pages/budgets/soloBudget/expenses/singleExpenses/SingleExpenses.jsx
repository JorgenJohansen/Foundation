/* eslint-disable react/prop-types */

import { useState } from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import SingleExpensesList from "./SingleExpensesList";
import SingleExpensesForm from "./SingleExpensesForm";
import { useAuthContext } from "../../../../../hooks/useAuthContext";

export default function SingleExpenses({expenses, budgetId}) {

  const { user } = useAuthContext();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{margin: 10}}>
          <Typography variant="h5" sx={{marginY: 5, width: 300}}>Her kan du holde oversikt over dine enkelt kostnader.</Typography>
          <Button 
        sx={{width: 300, marginBottom: 5}}
        type="submit" 
        color="primary" 
        variant="contained"
        onClick={toggleDrawer(true)}>
          <Typography>
            Legg til ny kostnad
          </Typography>
        </Button>
        
        {expenses && <SingleExpensesList expenses={expenses} />}
        
        <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
            <SingleExpensesForm user={user} setOpen={setOpen} budgetId={budgetId} />
        </Drawer>
      </Box>
  )
}