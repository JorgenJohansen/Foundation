/* eslint-disable react/prop-types */

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

import { useState } from "react";

import { db, timestamp } from "../../../../../firebase/config";
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


export default function YearlyExpensesForm({user, setOpen, budgetId}) {
  const [title, setTitle] = useState('');
  const [expense, setExpense] = useState(0);
  const [category, setCategory] = useState();
  const [date, setDate] = useState();
  
  const [titleError, setTitleError] = useState(false);
  const [expenseError, setExpenseError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();

    setTitleError(false);
    setExpenseError(false);
    setCategoryError(false);
    setDateError(false);

    if(title === '' || title.trim().length === 0){
      setTitleError(true);
      return;
    }

    if(expense < 0){
      setExpenseError(true);
      return;
    }

    if(category === ''){
      setCategoryError(true);
      return;
    }

    const dateObject = new Date(date);
    if(isNaN(dateObject.getTime())){
      setDateError(true);
      return;
    }

    const colRef = collection(db, 'budgets', budgetId, 'yearlyExpenses');

    await addDoc(colRef, {
      createdAt: timestamp.fromDate(new Date()),
      title,
      expense,
      category,
      date: new Date(date),
      uid: user?.uid,
    });

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
            Registrer din kostnad
        </Typography>
    
        <TextField 
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            sx={classes.field}
            label="Tittel på kostnaden"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            error={titleError}
        />
        {titleError && <Typography sx={{marginBottom: 2, color: 'red', border: '2px solid red', borderRadius: 10, padding: 2}}>Tittel på budsjett må være gitt.</Typography>}
        <TextField 
            type="number"
            onChange={(e) => setExpense(e.target.value)}
            sx={classes.field}
            label="Hvor mye koster det?"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            error={expenseError}
        />

        <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Kategori"
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value={'bolig'}>Bolig</MenuItem>
          <MenuItem value={'forsikring'}>Forsikring</MenuItem>
          <MenuItem value={'transport'}>Transport</MenuItem>
          <MenuItem value={'dyr'}>Dyr</MenuItem>
          <MenuItem value={'mobil'}>Mobil</MenuItem>
          <MenuItem value={'underholdning'}>Underholdning</MenuItem>
          <MenuItem value={'husholdningsartikler'}>Husholdningsartikler</MenuItem>
        </Select>
      </FormControl>
    </Box>

    {categoryError && <Typography sx={{marginBottom: 2, color: 'red', border: '2px solid red', borderRadius: 10, padding: 2}}>Kategori må være gitt.</Typography>}

        
        <Box display="flex" justifyContent="center" alignItems="center" marginTop={5} marginBottom={10}>

            <Box width={200}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Trekk dato" onChange={(date) => setDate(date)} />
                    </DemoContainer>
                </LocalizationProvider>
            </Box>
            
        </Box>
        {dateError && <Typography sx={{marginBottom: 2, color: 'red', border: '2px solid red', borderRadius: 10, padding: 2}}>Dato må velges.</Typography>}
        
        
        
        <Button 
        sx={{width: 400}}
        type="submit" 
        color="primary" 
        variant="contained"
        >
        Registrer din kostnad
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