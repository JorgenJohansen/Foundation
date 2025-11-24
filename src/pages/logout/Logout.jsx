import { Box, Link, Typography } from "@mui/material";

export default function Logout() {
  
  return (
    <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
    >
      <Typography
          variant="h5" 
          color="textSecondary"
          component="h2" 
          gutterBottom
      >Du er nå logget ut.</Typography>
      <Link href="logg-inn" sx={{cursor:'pointer'}}>
      <Typography
          variant="h6" 
          color="textSecondary"
          component="h2" 
          gutterBottom
      >
      Logg inn på nytt.
      </Typography>
      </Link>
    </Box>
  )
}
