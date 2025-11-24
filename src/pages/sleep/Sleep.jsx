import { Box, Button, Drawer, Typography } from "@mui/material";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from "../../hooks/useCollection";

import { useState } from "react";
import SleepForm from "./SleepForm";
import { getWeek } from "../../util/getweek";
import SleepInfo from "./SleepInfo";

export default function Sleep() {
    const [open, setOpen] = useState(false);

    const date = new Date().toLocaleDateString();
    const { user } = useAuthContext();
    const { documents: sleep } = useCollection('sleep', ['uid', '==', user?.uid], ['createdAt', 'desc'], ['date','==',date]);
    console.log(sleep[0]);
    const week = getWeek();


    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

  return (
    <Box sx={{margin: 20}}>
        {(sleep.length === 0) && <>
          <Typography variant="h4">Her registrer du søvn:</Typography>
          <Typography variant="h5">- Dagen i dag er {date} i uke {week}</Typography>
        </>}
        
        {(sleep.length === 0) && <Button 
            sx={{width: 200, marginBottom: 5}}
            type="submit" 
            color="primary" 
            variant="contained"
            onClick={toggleDrawer(true)}>
        <Typography>
          Registrer din søvn
        </Typography>
      </Button>}

      {(sleep.length === 0) && <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
          <SleepForm user={user} date={date} week={week} setOpen={setOpen} />
      </Drawer>}

      {(sleep.length > 0) && <SleepInfo sleep={sleep[0]} />}
    </Box>
  )
}