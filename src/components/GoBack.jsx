/* eslint-disable react/prop-types */

import { Button } from "@mui/material";
import { ArrowBack } from "@material-ui/icons";

import { useNavigate } from "react-router-dom"

export default function GoBack({link}) {
    const navigate = useNavigate();
    return (
        <Button 
            sx={{position: 'absolute', top: '80px', left: '50px'}} 
            variant="contained" 
            startIcon={<ArrowBack />}
            onClick={() => navigate(`${link}`)}
        >
        Dra tilbake
        </Button>
    )
}
