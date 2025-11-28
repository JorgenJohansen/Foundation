
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

import { useEffect, useState } from "react";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/config";
import { useLocation, useNavigate } from "react-router-dom";
import { useSubDocument } from "../../../../../hooks/useSubDocument";

const classes = {
    field: {
      marginTop: 3,
      marginBottom: 3,
      display: 'block',
      width: 400
    },
}

export default function EditYearlyExpenses() {

  const [title, setTitle] = useState('');
  const [expense, setExpense] = useState(0);
  const [category, setCategory] = useState();
  const [date, setDate] = useState();
  
  const [titleError, setTitleError] = useState(false);
  const [expenseError, setExpenseError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const locationSplit = location.pathname.split("/");
  const budgetId = locationSplit[2];
  const expenseId = locationSplit[4];
  

  const { document: expenseItem } = useSubDocument('budgets', budgetId, 'yearlyExpenses', expenseId);

  const convertToDayjs = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const dateString = date.toLocaleDateString();
    const dateSplit = dateString.split('.');
    const year = dateSplit[2];
    const month = dateSplit[1];
    const day = dateSplit[0];

    const dayjsStringFormat = `${year}-${month}-${day}`;

    return dayjs(dayjsStringFormat);
  }

  useEffect(() => {
      setTitle(expenseItem?.title);
      setExpense(+expenseItem?.expense);
      setCategory(`${expenseItem?.category}`);
      setDate(convertToDayjs(expenseItem?.date.seconds));
  }, [expenseItem?.title, expenseItem?.expense, expenseItem?.category, expenseItem?.date.seconds]);;


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

    const docRef = doc(db, `budgets/${budgetId}/yearlyExpenses/${expenseId}`);

    await updateDoc(docRef, {
      title: title.trim(),
      expense,
      category,
      date: new Date(date),
    });

    navigate(`/budsjetter/${budgetId}`);
  }

  return (
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
          Rediger din kostnad
      </Typography>

      <TextField 
        value={title}
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
        value={expense}
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

      <Box sx={{ minWidth: 200 }}>
    {category && <FormControl fullWidth>
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
    </FormControl>}
  </Box>

  {categoryError && <Typography sx={{marginBottom: 2, color: 'red', border: '2px solid red', borderRadius: 10, padding: 2}}>Kategori må være gitt.</Typography>}
      
      <Box display="flex" justifyContent="center" alignItems="center" marginTop={5} marginBottom={10}>

          {date && <Box width={200}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                      <DatePicker value={date} label="Trekk dato" onChange={(date) => setDate(date)} />
                  </DemoContainer>
              </LocalizationProvider>
          </Box>}
          
      </Box>
      {dateError && <Typography sx={{marginBottom: 2, color: 'red', border: '2px solid red', borderRadius: 10, padding: 2}}>Dato må velges.</Typography>}
      
      
      
      <Button 
      sx={{width: 400}}
      type="submit" 
      color="primary" 
      variant="contained"
      >
      Rediger din kostnad
      </Button>
      </Box>
  </form>
  )
}