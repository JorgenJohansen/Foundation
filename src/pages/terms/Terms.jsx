import { Box, Typography } from "@mui/material";

export default function Terms() {
  return (
    <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
    >
        <Typography variant="h4">Vilkår for bruk</Typography>
        <Typography variant="h6" sx={{borderBottom: '3px solid black', marginBottom: 2, marginTop: 1}}>Du godtar at</Typography>
        <Typography sx={{width: 400}}>Programvaren ikke kan reverseres, kopieres, eller hackes.</Typography>
        <Typography sx={{width: 400, marginTop: 2}}>Vi bruker cookies for å autentisere deg som lagres på din maskin.</Typography>
        <Typography sx={{width: 400, marginTop: 2}}>Personlig eller inkriminerende informasjon skal ikke være i gruppe, saker, todos eller prosjekter sitt innhold.</Typography>
        <Typography sx={{width: 400, marginTop: 2}}>Dine medlemmer kan se alt innhold, men du må velge hva de kan gjøre med det innholdet.</Typography>
    </Box>
  )
}
