import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";

 import dayjs from 'dayjs';

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



export default function EditBudget() {

  const [title, setTitle] = useState();
  const [budget, setBudget] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [titleError, setTitleError] = useState(false);
  const [budgetError, setBudgetError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const { document: budgetItem } = useDocument('budgets', id);

  console.log(budgetItem);

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
        setTitle(budgetItem?.title);
        setBudget(+budgetItem?.budget);
        setStartDate(convertToDayjs(budgetItem?.startDate.seconds));
        setEndDate(convertToDayjs(budgetItem?.endDate.seconds));
    }, [budgetItem?.title, budgetItem?.budget, budgetItem?.startDate, budgetItem?.endDate]);;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTitleError(false);
    setBudgetError(false);
    setStartDateError(false);
    setEndDateError(false);

    if(title === '' || title.trim().length === 0){
      setTitleError(true);
      return;
    }

    if(budget === '' || budget <= 1){
      setBudgetError(true);
      return;
    }

    const startDateObject = new Date(startDate);

    if(isNaN(startDateObject.getTime())){
      setStartDateError(true);
      return;
    }

    const endDateObject = new Date(endDate);

    if(isNaN(endDateObject.getTime())){
      setEndDateError(true);
      return;
    }

    const docRef = doc(db, 'budgets', id);

    await updateDoc(docRef, {
      title: title.trim(),
      budget,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    navigate('/budsjetter');

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
            Rediger {budgetItem?.title}
        </Typography>
    
        <Typography>Tittel på budsjettet:</Typography>
        <TextField 
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            sx={classes.field}
            variant="outlined"
            color="secondary"
            fullWidth
            required
            error={titleError}
        />
        {titleError && <Typography sx={{marginBottom: 2, color: 'red', border: '2px solid red', borderRadius: 10, padding: 2}}>Tittel på budsjett må være gitt.</Typography>}
        
        <Typography>Hvor mye har du i budsjettet ditt?</Typography>
        <TextField 
            value={budget}
            type="number"
            onChange={(e) => setBudget(e.target.value)}
            sx={classes.field}
            variant="outlined"
            color="secondary"
            fullWidth
            required
            error={budgetError}
        />

        <Box display="flex" justifyContent="center" alignItems="center" marginTop={5} marginBottom={10}>
            {startDate && <Box width={200}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker value={startDate} label="Start dato" onChange={(date) => setStartDate(date)} />
                    </DemoContainer>
                </LocalizationProvider>
            </Box>}
            {endDate && <Box width={200}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker value={endDate} label="Slutt dato" onChange={(date) => setEndDate(date)} />
                    </DemoContainer>
                </LocalizationProvider>
            </Box>}
            
        </Box>
        {startDateError && <Typography sx={{marginBottom: 2, color: 'red', border: '2px solid red', borderRadius: 10, padding: 2}}>Start dato må velges.</Typography>}
        {endDateError && <Typography sx={{marginTop: 2, marginBottom: 3, color: 'red', border: '2px solid red', borderRadius: 10, padding: 2}}>Slutt dato må velges.</Typography>}
        
        
        <Button 
        sx={{width: 400}}
        type="submit" 
        color="primary" 
        variant="contained"
        >
        Rediger ditt budsjett
        </Button>
        </Box>
    </form>
    </div>
  )
}