import { Box, Button, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function NoAccess() {
  const navigate = useNavigate();
  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    margin={30}
    >
        <Typography>Du har ikke tilgang til denne siden.</Typography>
        <Button sx={{margin: 2, padding: 2}} variant="contained" onClick={() => navigate("/")}>Hjemmesiden</Button>
    </Box>
  )
}
