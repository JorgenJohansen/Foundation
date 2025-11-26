/* eslint-disable react/prop-types */

import { Box, Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";

export default function BudgetInfo({ budget, monthlyExpenses, yearlyExpenses, singleExpenses }) {

  const convertToDateString = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }

  const generateTotalExpenses = () => {
    let sum = 0;
    for(let expense of monthlyExpenses){
      sum += (+expense.expense * 12);
    }
    for(let expense of yearlyExpenses){
      sum += +expense.expense;
    }
    for(let expense of singleExpenses){
      sum += +expense.expense;
    }

    return sum;
  }
  return (
    <Box sx={{marginY: 10}}>
        <Card sx={{width: "400px", border: "3px solid #1769aa"}}>
            <CardHeader 
            
            title={`${budget?.title}`}
            />
            <Divider sx={{ borderBottomWidth: 3 }} />
            <CardContent>
                <Typography variant="h6" color="textSecondary" margin={1}>
                    {budget?.budget}kr i budsjettet.
                </Typography>
                <Typography variant="h6" color="textSecondary" margin={1}>
                    {generateTotalExpenses()}kr i totale kostnader.
                </Typography>
                <Typography variant="h6" color="textSecondary" margin={1}>
                    Start dato: {convertToDateString(budget?.startDate.seconds)}
                </Typography>
                <Typography variant="h6" color="textSecondary" margin={1}>
                    Slutt dato: {convertToDateString(budget?.endDate.seconds)}
                </Typography>
                
                
            </CardContent>
        </Card>
    </Box>
  )
}