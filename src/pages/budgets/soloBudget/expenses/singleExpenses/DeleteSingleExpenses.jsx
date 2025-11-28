import { useLocation, useNavigate } from "react-router-dom";
import { useSubDocument } from '../../../../../hooks/useSubDocument';
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../../firebase/config";


export default function DeleteSingleExpenses() {

    const navigate = useNavigate();
    const location = useLocation();
    const locationSplit = location.pathname.split("/");
    const budgetId = locationSplit[2];
    const expenseId = locationSplit[4];

    const { document: expenseItem } = useSubDocument('budgets', budgetId, 'singleExpenses', expenseId);

    const handleDelete = async () => {
        const docRef = doc(db, `budgets/${budgetId}/singleExpenses/${expenseId}`);
        await deleteDoc(docRef);

        navigate(`/budsjetter/${budgetId}`);
    }

  return (
    <Box 
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="40vh"
    >
        
        <Typography variant="h5">Er du sikker på at du vil slette enkelt kostnad: {expenseItem?.title}?</Typography>
        
        <Typography sx={{marginTop: 2, marginBottom: 2}} color="red">Dette kan ikke angres.</Typography>
        
        
        
        <ButtonGroup>
            <Button sx={{marginRight: 3}} variant="contained" onClick={() => navigate(`/budsjetter/${budgetId}`)}>Dra tilbake</Button>
            <Button variant="contained" color="error" onClick={handleDelete}>Slett Kostnad</Button>
        </ButtonGroup>
    </Box>
  )
}