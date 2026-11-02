
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useState } from 'react';
import {nb} from 'date-fns/locale'

import './Todos.css';
import { Box, Button, List, ListItem, ListItemText } from '@mui/material';

import { useNavigate } from 'react-router-dom';

export default function Todos() {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());

  const navigateToDay = () => {
    const dateString = value.toLocaleDateString();
    navigate(`/todos/${dateString}`);
  }

  return (
    <Box sx={{margin: 15, display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
    <List>
        <ListItem sx={{width: 400,  border: "3px solid #1769aa", borderRadius: 2, marginY: 2, marginLeft: -10}}
            key={"key"}
  
        >
            <ListItemText primary={`Velg hvilken dag du ønsker å lage todos i.`} />
        </ListItem>
    </List>
    <Box sx={{}}>

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
      {/* <IconButton sx={{margin: 35}} onClick={navigateToDay} >
        <AddCircleOutline color='primary' fontSize='large' />
      </IconButton> */}
      <Button 
       onClick={navigateToDay}
        sx={{width: 400, margin: 5}}
        type="submit" 
        color="primary" 
        variant="contained"
        >
        Velg dagen {value.toLocaleDateString()}
        </Button>
    </Box>
  )
}