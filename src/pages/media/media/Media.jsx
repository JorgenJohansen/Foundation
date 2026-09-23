import { Box, Button, Drawer, Typography } from "@mui/material";

import { lazy, useState } from "react";

import { useAuthContext } from '../../../hooks/useAuthContext';
import { useCollection } from "../../../hooks/useCollection";

// import MediaForm from './MediaForm'
// import MediaList from './MediaList'

const MediaForm = lazy(() => import('./MediaForm'));
const MediaList = lazy(() => import('./MediaList'));

export default function Media() {

    const [open, setOpen] = useState(false);

    const { user } = useAuthContext();

    const { documents: media } = useCollection('media', ['uid', '==', user?.uid], ['createdAt', 'desc']);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };


  return (
    <Box sx={{margin: 5}}>
           
            <Typography variant="h4">Her kan du legge til serier, filmer og annet media du ønsker å se/lese:</Typography>
            
            <Button 
                sx={{width: 300, marginBottom: 5}}
                type="submit" 
                color="primary" 
                variant="contained"
                onClick={toggleDrawer(true)}>
            <Typography>
              Legg til media
            </Typography>
          </Button>
    
          <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
              <MediaForm user={user} setOpen={setOpen} />
          </Drawer>
    
    
          {media && <MediaList media={media} />}
        </Box>
  )
}