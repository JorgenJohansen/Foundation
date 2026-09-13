
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useState } from 'react';
import {nb} from 'date-fns/locale'

import './Todos.css';
import { Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutline } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

export default function Todos() {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());

  const navigateToDay = () => {
    const dateString = value.toLocaleDateString();
    navigate(`/todos/${dateString}`);
  }

  return (
    <Box sx={{margin: 15}}>
    <Typography variant='h5'>Velg hvilken dag du ønsker å lage todos i.</Typography>
    <Box sx={{marginLeft: -80}}>

    <LocalizationProvider dateAdapter={AdapterDateFns} locale={nb}>
      <StaticDatePicker 
        orientation="portrait" 
        
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}
      />
    </LocalizationProvider>
    </Box>
      <IconButton sx={{marginLeft: 3, marginTop: -7}} onClick={navigateToDay} >
        <AddCircleOutline color='primary' fontSize='large' />
      </IconButton>
    </Box>
  )
}