/* eslint-disable react/prop-types */

import { lazy, useState } from "react";
import { Box, Button, Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useAuthContext } from "../../../../../hooks/useAuthContext";

// import YearlyExpensesList from "./YearlyExpensesList";
// import YearlyExpensesForm from "./YearlyExpensesForm";

const YearlyExpensesList = lazy(() => import('./YearlyExpensesList'));
const YearlyExpensesForm = lazy(() => import('./YearlyExpensesForm'));


export default function YearlyExpenses({expenses, budgetId}) {
  const { user } = useAuthContext();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  
  return (
    <Box sx={{margin: 10}}>
      <List>
          <ListItem sx={{width: 400,  border: "3px solid #1769aa", borderRadius: 2, marginY: 2, marginLeft: -20}}
              key={"key"}
    
          >
              <ListItemText primary={`Her kan du holde oversikt over dine årlige kostnader.`} />
          </ListItem>
        </List>
      <Button 
    sx={{width: 300, marginBottom: 5, marginLeft: -20}}
    type="submit" 
    color="primary" 
    variant="contained"
    onClick={toggleDrawer(true)}>
      <Typography>
        Legg til ny kostnad
      </Typography>
    </Button>
    
    {expenses && <YearlyExpensesList expenses={expenses} />}
    
    <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
        <YearlyExpensesForm user={user} setOpen={setOpen} budgetId={budgetId} />
    </Drawer>
  </Box>
  )
}