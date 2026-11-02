/* eslint-disable react/prop-types */

import { lazy, useState } from "react";
import { Box, Button, Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";
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

            <List>
              <ListItem sx={{width: 400,  border: "3px solid #1769aa", borderRadius: 2, marginY: 2, marginLeft: -20}}
                  key={"key"}
        
              >
                  <ListItemText primary={`Her kan du holde oversikt over dine månedlige kostnader.`} />
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
          
          {expenses && <MonthlyExpensesList expenses={expenses} />}
          
          <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
              <MonthlyExpensesForm user={user} setOpen={setOpen} budgetId={budgetId} />
          </Drawer>
        </Box>
  )
}