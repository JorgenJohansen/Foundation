/* eslint-disable react/prop-types */

import { Box, Button, FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";

import { useState } from "react";

import { db, timestamp } from "../../firebase/config";
import { collection, doc, writeBatch } from "firebase/firestore";

export default function RegisterDailyHabitsForm({user, setOpen2, habits}) {

    const batch = writeBatch(db);

    const [habitsEdited, setHabitsEdited] = useState(habits);
    
    const handleCheckboxChange = (id) => {
        setHabitsEdited((prevHabits) =>
        prevHabits.map((habit) =>
            habit.id === id ? { ...habit, done: !habit.done } : habit
        )
        );
    };

    const date = new Date().toLocaleDateString();

    const handleSubmit = async(e) => {
        e.preventDefault();

        for(let i in habitsEdited){
            if(habitsEdited[i].done){
                const docRef = doc(collection(db, 'habit'))
                batch.set(docRef, {
                    createdAt: timestamp.fromDate(new Date()),
                    uid: user?.uid,
                    title: habitsEdited[i]?.title,
                    done: habitsEdited[i]?.done,
                    date: date,
                })
            }
        }

        batch.commit().then(() => {
            console.log("Nye vaner ble laget med done og dato")
        }).catch(() => {
            console.log("Noe gikk galt!")
        });

        

        setOpen2(false);
    }
  return (
    <>
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
              Registrer hvilke vaner du har utført
          </Typography>
          
          {habits?.map(habit => (
            <Box key={habit?.id} display="flex" justifyContent="center"
              alignItems="center">
            <Typography >{habit?.title}</Typography>
            <FormGroup sx={{padding: 3}}>
                <FormControlLabel 
                    sx={{padding: 1}}
                    control={<Switch onChange={() => handleCheckboxChange(habit?.id)} />}
                    label="Ferdig"
                />
            </FormGroup>
            
            </Box>
          ))}
          
          <Button 
          sx={{width: 400}}
          type="submit" 
          color="primary" 
          variant="contained"
          >
          Registrer vaner
          </Button>
          </Box>
      </form>
      <Button 
          sx={{width: 200, position:'absolute', top: 10, right: 10}}
          type="submit" 
          color="primary" 
          variant="contained"
          onClick={() => setOpen2(false)}
          >
          Lukk skjema
      </Button>
    </>
  )
}