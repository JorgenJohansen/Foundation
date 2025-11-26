/* eslint-disable react/prop-types */

import { Box, Button, TextField, Typography } from "@mui/material";

import { useState } from "react";

import { db, timestamp } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {nb} from 'date-fns/locale';
import { TimePicker } from "@mui/x-date-pickers";

const classes = {
    field: {
      marginTop: 3,
      marginBottom: 3,
      display: 'block',
      width: 400
    },
}


export default function SleepForm({user, date, week, setOpen}) {
    const [sleepTime, setSleepTime] = useState('');
    const [awakeTime, setAwakeTime] = useState('');
    const [sleepQuality, setSleepQuality] = useState(0);
    const [energyLevel, setEnergyLevel] = useState(0);

    const [sleepTimeError, setSleepTimeError] = useState(false);
    const [awakeTimeError, setAwakeTimeError] = useState(false);
    const [sleepQualityError, setSleepQualityError] = useState(false);
    const [energyLevelError, setEnergyLevelError] = useState(false);

    const getYear = (date1) => {
        const dateList = date1.split(".");
        const year = dateList[2];
        return +year;
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        setSleepTimeError(false);
        setAwakeTimeError(false);
        setSleepQualityError(false);
        setEnergyLevelError(false);

        if(!sleepTime){
          setSleepTimeError(true);
          return;
        }

        if(!awakeTime){
          setAwakeTimeError(true);
          return;
        }

        if(sleepQuality < 1 || sleepQuality > 5){
          setSleepQualityError(true);
          return;
        }

        if(energyLevel < 1 || energyLevel > 5){
          setEnergyLevelError(true);
          return;
        }

        const colRef = collection(db, 'sleep');

        await addDoc(colRef, {
            createdAt: timestamp.fromDate(new Date()),
            date: date,
            week: week,
            year: getYear(date),
            sleepTime: sleepTime,
            awakeTime: awakeTime,
            sleepQuality: sleepQuality,
            energyLevel: energyLevel,
            uid: user?.uid,
        })
        // console.log({
        //     createdAt: timestamp.fromDate(new Date()),
        //     date: date,
        //     week: week,
        //     sleepTime: sleepTime,
        //     awakeTime: awakeTime,
        //     sleepQuality: sleepQuality,
        //     energyLevel: energyLevel,
        //     uid: user?.uid,
        // })

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
                    Registrer din søvn
                </Typography>
            
                <TextField 
                    type="number"
                    onChange={(e) => setSleepQuality(e.target.value)}
                    sx={classes.field}
                    label="Registrer din søvnkvalitet(1-5)"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={sleepQualityError}
                />
                {sleepQualityError && <Typography sx={{marginBottom: 2, color: 'red', border: '2px solid red', borderRadius: 10, padding: 2}}>Søvn kvalitet må være mellom 1 og 5.</Typography>}
                <TextField 
                    type="number"
                    onChange={(e) => setEnergyLevel(e.target.value)}
                    sx={classes.field}
                    label="Registrer ditt energinivå(1-5)"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={energyLevelError}
                />
    
                
                <Box display="flex" justifyContent="center" alignItems="center" marginTop={5} marginBottom={10}>

                    <Box width={200}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={nb}>
                            <TimePicker renderInput={(props) => <TextField {...props} variant="outlined" />} label="Når la du deg?" value={sleepTime} onChange={(newTime) => setSleepTime(newTime)} />
                        </LocalizationProvider>
                    </Box>
                    
                    <Box width={200}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={nb}>
                            <TimePicker renderInput={(props) => <TextField {...props} variant="outlined" />} label="Når stod du opp" value={awakeTime} onChange={(newTime) => setAwakeTime(newTime)} />
                        </LocalizationProvider>
                    </Box>
                </Box>
                {sleepTimeError && <Typography sx={{marginBottom: 2, color: 'red', border: '2px solid red', borderRadius: 10, padding: 2}}>Søvn tid må velges.</Typography>}
                {awakeTimeError && <Typography sx={{marginTop: 2, marginBottom: 3, color: 'red', border: '2px solid red', borderRadius: 10, padding: 2}}>Slutt tid må velges.</Typography>}
                
                
                <Button 
                sx={{width: 400}}
                type="submit" 
                color="primary" 
                variant="contained"
                >
                Registrer din søvn
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