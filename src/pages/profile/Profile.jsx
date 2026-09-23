import { Box, Button, Typography } from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";

export default function Profile() {
  const { user } = useAuthContext();

  const { documents: user2 } = useCollection('brukere',['uid','==', user?.uid]);

  //console.log(user2);
  const isAdmin = () => {
    return user2[0]?.admin;
  }

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
          color="error"
          sx={{width: 300, margin: 2}}
          onClick={() => navigate("/profil/rapporter")}
        >Rapporter en feil</Button>
        {isAdmin() && <Button 
          variant="contained" 
          color="secondary"
          sx={{width: 300, margin: 2}}
          onClick={() => navigate("/profil/admin")}
        >Admin</Button>}
    </Box>
  )
}
