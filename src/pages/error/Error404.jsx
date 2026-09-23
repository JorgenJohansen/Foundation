import { Box, Button, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function Error404() {
    const navigate = useNavigate();

  return (
    <Box sx={{margin: 40}}>
        <Typography variant="h6">Oops, denne siden finnes ikke!</Typography>
        <Button
            variant="contained"
            onClick={() => navigate('/')}
        >Gå til hjemmesiden.</Button>
    </Box>
  )
}