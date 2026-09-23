/* eslint-disable react/prop-types */

import { lazy, useState } from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { useAuthContext } from "../../../../../hooks/useAuthContext";

// import MonthlyExpensesList from "./MonthlyExpensesList";
// import MonthlyExpensesForm from "./MonthlyExpensesForm";

const MonthlyExpensesList = lazy(() => import('./MonthlyExpensesList'));
const MonthlyExpensesForm = lazy(() => import('./MonthlyExpensesForm'));


export default function MontlyExpenses({expenses, budgetId}) {

  const { user } = useAuthContext();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{margin: 10}}>
            <Typography variant="h5" sx={{marginY: 5, width: 300}}>Her kan du holde oversikt over dine månedlige kostnader.</Typography>
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
          
          {expenses && <MonthlyExpensesList expenses={expenses} />}
          
          <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
              <MonthlyExpensesForm user={user} setOpen={setOpen} budgetId={budgetId} />
          </Drawer>
        </Box>
  )
}