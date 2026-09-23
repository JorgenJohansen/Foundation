import { Box, Button, Drawer, Typography } from "@mui/material";

import { lazy, useState } from "react";

import { useAuthContext } from '../../../hooks/useAuthContext';
import { useCollection } from "../../../hooks/useCollection";


import { useNavigate } from "react-router-dom";

const ReviewInfo = lazy(() => import('./ReviewInfo'));
const ReviewForm = lazy(() => import('./ReviewForm'));
// import ReviewInfo from "./ReviewInfo";
// import ReviewForm from "./ReviewForm";

export default function Review() {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const { user } = useAuthContext();

    const { documents: review } = useCollection('review', ['uid', '==', user?.uid], ['createdAt', 'desc']);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    

  return (
    <Box sx={{margin: 30}}>

        <Button 
            sx={{width: 300, marginLeft: -30, marginTop: -30}}
            type="submit" 
            color="primary" 
            variant="contained"
            onClick={() => navigate('/profil')}>
        <Typography>
          Dra tilbake
        </Typography>
      </Button>

        {(review.length === 0) && <>
          <Typography variant="h4">Her kan du lage din anmeldelse:</Typography>
        </>}
        
        {(review.length === 0) && <Button 
            sx={{width: 300, marginBottom: 5}}
            type="submit" 
            color="primary" 
            variant="contained"
            onClick={toggleDrawer(true)}>
        <Typography>
          Lag din anmeldelse
        </Typography>
      </Button>}

      {(review.length === 0) && <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
          <ReviewForm user={user} setOpen={setOpen} />
      </Drawer>}


      {(review.length > 0) && <ReviewInfo review={review[0]} />}
    </Box>
  )
}