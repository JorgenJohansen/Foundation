import { Box, Button, Drawer, Typography } from "@mui/material";

import { useState } from "react";

import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from "../../hooks/useCollection";

import { getWeek } from "date-fns";

import DiaryInfo from "./DiaryInfo";
import DiaryForm from "./DiaryForm";

export default function Diary() {
    const [open, setOpen] = useState(false);

    const date = new Date().toLocaleDateString();

    const { user } = useAuthContext();

    const { documents: diaries } = useCollection('diary', ['uid', '==', user?.uid], ['createdAt', 'desc'], ['date','==',date]);
    const week = getWeek(new Date(), { weekStartsOn: 1 });

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    

  return (
    <Box sx={{margin: 5}}>
        {(diaries.length === 0) && <>
          <Typography variant="h4">Her kan du lage dagbok:</Typography>
          <Typography variant="h5">- Dagen i dag er {date} i uke {week}</Typography>
        </>}
        
        {(diaries.length === 0) && <Button 
            sx={{width: 300, marginBottom: 5}}
            type="submit" 
            color="primary" 
            variant="contained"
            onClick={toggleDrawer(true)}>
        <Typography>
          Lag din dagbok
        </Typography>
      </Button>}

      {(diaries.length === 0) && <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
          <DiaryForm user={user} date={date} week={week} setOpen={setOpen} />
      </Drawer>}


      {(diaries.length > 0) && <DiaryInfo diary={diaries[0]} />}
    </Box>
  )
}