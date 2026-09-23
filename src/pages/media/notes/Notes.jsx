import { Box, Button, Drawer, Typography } from "@mui/material";

import { lazy, useState } from "react";

import { useAuthContext } from '../../../hooks/useAuthContext';
import { useCollection } from "../../../hooks/useCollection";

// import NoteForm from './NoteForm'
// import NoteList from './NoteList'

const NoteForm = lazy(() => import('./NoteForm')); 
const NoteList = lazy(() => import('./NoteList')); 

export default function Notes() {

    const [open, setOpen] = useState(false);

    const { user } = useAuthContext();

    const { documents: notes } = useCollection('note', ['uid', '==', user?.uid], ['createdAt', 'desc']);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };


  return (
    <Box sx={{margin: 5}}>
           
            <Typography variant="h4">Her kan du legge til notater.</Typography>
            
            <Button 
                sx={{width: 300, marginBottom: 5}}
                type="submit" 
                color="primary" 
                variant="contained"
                onClick={toggleDrawer(true)}>
            <Typography>
              Legg til notat
            </Typography>
          </Button>
    
          <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
              <NoteForm user={user} setOpen={setOpen} />
          </Drawer>
    
    
          {notes && <NoteList notes={notes} />}
        </Box>
  )
}