import { Box, Button, Typography } from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useAuthContext();

  const navigate = useNavigate();

  return (
    <Box sx={{margin: 20, display:'flex', flexDirection:'column'}} >
        <Typography>Heisann {user.displayName}, hva ønsker du å gjøre?</Typography>
        <Button 
          variant="contained" 
          sx={{width: 300, margin: 2}}
          onClick={() => navigate("/profil/anmeldelse")}
        >Lag en anmeldelse</Button>
        <Button 
          variant="contained" 
          sx={{width: 300, margin: 2}}
          onClick={() => navigate("/profil/brukerinfo")}
        >Endre brukerinfo</Button>
        <Button 
          variant="contained" 
          sx={{width: 300, margin: 2}}
          onClick={() => navigate("/profil/rapporter")}
        >Rapporter et problem</Button>
    </Box>
  )
}
