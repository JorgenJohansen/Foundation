/* eslint-disable react/prop-types */

import { Box, Button, TextField, Typography } from "@mui/material";

import { useState } from "react";

import { db, timestamp } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const classes = {
    field: {
      marginTop: 3,
      marginBottom: 3,
      display: 'block',
      width: 400
    },
}


export default function BudgetForm({user, setOpen}) {
    const [title, setTitle] = useState();
    const [budget, setBudget] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [titleError, setTitleError] = useState(false);
    const [budgetError, setBudgetError] = useState(false);
    const [startDateError, setStartDateError] = useState(false);
    const [endDateError, setEndDateError] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();

        setTitleError(false);
        setBudgetError(false);
        setStartDateError(false);
        setEndDateError(false);

        if(title === '' || title.trim().length === 0){
            setTitleError(true);
            return;
        }

        if(budget === '' || budget.trim().length === 0 || budget <= 1){
            setBudgetError(true);
            return;
        }
        const startDateObject = new Date(startDate);
        console.log(startDateObject);

        if(isNaN(startDateObject.getTime())){
            setStartDateError(true);
            return;
        }

        const endDateObject = new Date(endDate);
        console.log(endDateObject);

        if(isNaN(endDateObject.getTime())){
            setEndDateError(true);
            return;
        }

        const colRef = collection(db, 'budgets');

        await addDoc(colRef, {
            createdAt: timestamp.fromDate(new Date()),
            title,
            budget,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            uid: user?.uid,
        })

        setOpen(false);
    }
  return (
    <div>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                <Typography  
                    variant="h6" 
                    color="textSecondary"
                    component="h2" 
                    gutterBottom
                    sx={{textTransform: 'uppercase'}}
                >
                    Registrer ditt budsjett
                </Typography>
            
                <TextField 
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    sx={classes.field}
                    label="Tittel på budsjettet"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={titleError}
                />
                {titleError && <Typography sx={{marginBottom: 2, color: 'red', border: '2px solid red', borderRadius: 10, padding: 2}}>Tittel på budsjett må være gitt.</Typography>}
                <TextField 
                    type="number"
                    onChange={(e) => setBudget(e.target.value)}
                    sx={classes.field}
                    label="Hvor mye har du i budsjettet ditt?"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={budgetError}
                />
    
                
                <Box display="flex" justifyContent="center" alignItems="center" marginTop={5} marginBottom={10}>

                    <Box width={200}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Start dato" onChange={(date) => setStartDate(date)} />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    <Box width={200}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Slutt dato" onChange={(date) => setEndDate(date)} />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    
                </Box>
                {startDateError && <Typography sx={{marginBottom: 2, color: 'red', border: '2px solid red', borderRadius: 10, padding: 2}}>Start dato må velges.</Typography>}
                {endDateError && <Typography sx={{marginTop: 2, marginBottom: 3, color: 'red', border: '2px solid red', borderRadius: 10, padding: 2}}>Slutt dato må velges.</Typography>}
                
                
                <Button 
                sx={{width: 400}}
                type="submit" 
                color="primary" 
                variant="contained"
                >
                Registrer ditt budsjett
                </Button>
                </Box>
            </form>
            <Button 
                sx={{width: 200, position:'absolute', top: 10, right: 10}}
                type="submit" 
                color="primary" 
                variant="contained"
                onClick={() => setOpen(false)}
                >
                Lukk skjema
            </Button>
    </div>
  )
}