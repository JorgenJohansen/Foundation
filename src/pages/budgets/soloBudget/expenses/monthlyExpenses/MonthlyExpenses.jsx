/* eslint-disable react/prop-types */

import { useState } from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import MonthlyExpensesList from "./MonthlyExpensesList";
import MonthlyExpensesForm from "./MonthlyExpensesForm";
import { useAuthContext } from "../../../../../hooks/useAuthContext";


export default function MontlyExpenses({expenses, budgetId}) {

  const { user } = useAuthContext();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{margin: 10}}>
            <Typography variant="h5" sx={{marginY: 5}}>Her kan du holde oversikt over dine månedlige kostnader.</Typography>
            <Button 
          sx={{width: 200, marginBottom: 5}}
          type="submit" 
          color="primary" 
          variant="contained"
          onClick={toggleDrawer(true)}>
            <Typography>
              Legg til ny kostnad
            </Typography>
          </Button>
          
          {expenses && <MonthlyExpensesList expenses={expenses} />}
          
          <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
              <MonthlyExpensesForm user={user} setOpen={setOpen} budgetId={budgetId} />
          </Drawer>
        </Box>
  )
}