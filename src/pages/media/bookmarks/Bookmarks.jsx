import { Box, Button, Drawer, Typography } from "@mui/material";

import { lazy, useState } from "react";

import { useAuthContext } from '../../../hooks/useAuthContext';
import { useCollection } from "../../../hooks/useCollection";

// import BookmarkForm from './BookmarkForm'
// import BookmarkList from './BookmarkList'

const BookmarkForm = lazy(() => import('./BookmarkForm'));
const BookmarkList = lazy(() => import('./BookmarkList'));

export default function Bookmarks() {

    const [open, setOpen] = useState(false);

    const { user } = useAuthContext();

    const { documents: bookmarks } = useCollection('bookmark', ['uid', '==', user?.uid], ['createdAt', 'desc']);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };


  return (
    <Box sx={{margin: 5}}>
           
            <Typography variant="h4">Her kan du legge til bokmerker.</Typography>
            
            <Button 
                sx={{width: 300, marginBottom: 5}}
                type="submit" 
                color="primary" 
                variant="contained"
                onClick={toggleDrawer(true)}>
            <Typography>
              Legg til bokmerke
            </Typography>
          </Button>
    
          <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
              <BookmarkForm user={user} setOpen={setOpen} />
          </Drawer>
    
    
          {bookmarks && <BookmarkList bookmarks={bookmarks} />}
        </Box>
  )
}