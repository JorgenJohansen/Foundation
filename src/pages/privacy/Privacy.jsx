import { Box, Typography } from "@mui/material";

export default function Privacy() {
  return (
    <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
    >
        <Typography variant="h4">Personvern</Typography>
        <Typography variant="h6" sx={{borderBottom: '3px solid black', marginBottom: 3, marginTop: 1}}>Rett til innsyn</Typography>
        <Typography sx={{width: 400, marginLeft: 10}}>Vi har lagret ditt passord(kryptert), e-post og navn, sammen med en unik identifikator i din bruker.</Typography>
        <Typography variant="h6" sx={{borderBottom: '3px solid black', marginBottom: 3, marginTop: 1}}>Rett til sletting</Typography>
        <Typography sx={{width: 400, marginLeft: 10}}>Du har rett til å få din profil og innhold slettet, da må du ta kontakt med oss. Vær oppmerksom på at all slettet data er lagret 30 dager på disk før det blir slettet permanent.</Typography>
        <Typography variant="h6" sx={{borderBottom: '3px solid black', marginBottom: 3, marginTop: 1}}>Deling av data</Typography>
        <Typography sx={{width: 400, marginLeft: 10}}>Vi deler ikke din data.</Typography>
    </Box>
  )
}
