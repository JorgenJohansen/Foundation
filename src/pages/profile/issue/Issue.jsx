import { Box, Button, Drawer, Typography } from "@mui/material";

import { useState } from "react";

import { useAuthContext } from '../../../hooks/useAuthContext';
import { useCollection } from "../../../hooks/useCollection";

import IssueForm from "./IssueForm";
import { useNavigate } from "react-router-dom";

export default function Issue() {

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const { user } = useAuthContext();

    const date = new Date().toLocaleDateString();

    const { documents: issue } = useCollection('issue', ['uid', '==', user?.uid], ['createdAt', 'desc'], ['date','==',date]);


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
    
            {(issue.length === 0) && <>
              <Typography variant="h4">Her kan du rapportere en feil:</Typography>
            </>}
            
            {(issue.length === 0) && <Button 
                sx={{width: 300, marginBottom: 5}}
                type="submit" 
                color="error" 
                variant="contained"
                onClick={toggleDrawer(true)}>
            <Typography>
              Rapporter feilen
            </Typography>
          </Button>}
    
          {(issue.length === 0) && <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
              <IssueForm user={user} date={date} setOpen={setOpen} />
          </Drawer>}
    
    
          {(issue.length > 0) && <Typography variant="h5">Takk for din tilbakemelding! :D</Typography>}
        </Box>
  )
}