import { Box, Button, Drawer, Typography } from "@mui/material";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from "../../hooks/useCollection";

import { db } from "../../firebase/config";

import { useEffect, useState, useCallback } from "react";
import SleepForm from "./SleepForm";
import SleepFormFilled from "./SleepFormFilled";
import { getWeek, subDays } from "date-fns";
import SleepInfo from "./SleepInfo";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Sleep() {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [dateObj, setDateObj] = useState({});

    const date = new Date().toLocaleDateString();
    const { user } = useAuthContext();
    const { documents: sleep } = useCollection('sleep', ['uid', '==', user?.uid], ['createdAt', 'desc'], ['date','==',date]);
    const week = getWeek(new Date(), { weekStartsOn: 1 });


    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const toggleDrawer2 = (newOpen) => () => {
        setOpen2(newOpen);
    };

    const fetchPreviousDate = useCallback(async() => {
        const yesterday = subDays(new Date(), 1);
        const date = yesterday.toLocaleDateString()
        const colRef = collection(db, 'sleep');

        const q = query(
            colRef,
            where('uid', '==', user?.uid),
            where('date', '==', date)
        )

        let result = [];
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            result.push({...doc.data(), id: doc.id});
        });

        return result[0]
    }, [user?.uid]);

    useEffect(() => {
      fetchPreviousDate().then(data => {
        setDateObj(data);
      })
    }, [fetchPreviousDate])

    const {energyLevel, sleepQuality, awakeTime, sleepTime } = dateObj;

  return (
    <Box sx={{margin: 5}}>
        {(sleep.length === 0) && <>
          <Typography variant="h4">Her registrer du søvn:</Typography>
          <Typography variant="h5">- Dagen i dag er {date} i uke {week}</Typography>
        </>}
        
        {(sleep.length === 0) && <Button 
            sx={{width: 300, marginBottom: 5}}
            type="submit" 
            color="primary" 
            variant="contained"
            onClick={toggleDrawer(true)}>
        <Typography>
          Registrer din søvn
        </Typography>
      </Button>}
        {(sleep.length === 0) && dateObj && <Button 
            sx={{width: 400, marginBottom: 5}}
            type="submit" 
            color="secondary" 
            variant="contained"
            onClick={toggleDrawer2(true)}>
        <Typography>
          Bruk resultat fra forrige dag
        </Typography>
      </Button>}

      {(sleep.length === 0) && <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
          <SleepForm user={user} date={date} week={week} setOpen={setOpen} />
      </Drawer>}

      {(sleep.length === 0) && dateObj && <Drawer anchor="bottom" open={open2} onClose={toggleDrawer2(false)}>
          <SleepFormFilled user={user} date={date} week={week} 
          energyLevelInput={+energyLevel} sleepQualityInput={+sleepQuality} 
          awakeTimeInput={awakeTime} sleepTimeInput={sleepTime}
          setOpen2={setOpen2} />
      </Drawer>}

      {(sleep.length > 0) && <SleepInfo sleep={sleep[0]} />}
    </Box>
  )
}