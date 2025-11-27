import { Box, Button, ButtonGroup, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";

import { db } from "../../firebase/config";
import { doc, writeBatch } from "firebase/firestore";
import { useSubCollection } from "../../hooks/useSubCollection";

export default function DeleteBudget() {

  const batch = writeBatch(db);
  const { id } = useParams();
  const navigate = useNavigate();

  const { document: budget } = useDocument('budgets', id);
  const { documents: monthlyExpenses } = useSubCollection('budgets', id, 'monthlyExpenses');
  const { documents: yearlyExpenses } = useSubCollection('budgets', id, 'yearlyExpenses');
  const { documents: singleExpenses } = useSubCollection('budgets', id, 'singleExpenses');

  const handleDelete = async () => {

    //Sletter budsjett
    let docRef = doc(db, 'budgets', id);
    batch.delete(docRef);

    for(let i in monthlyExpenses){
      let docRef = doc(db, `budgets/${id}/monthlyExpenses/${monthlyExpenses[i]?.id}`)
      batch.delete(docRef);
    }
    for(let i in yearlyExpenses){
      let docRef = doc(db, `budgets/${id}/yearlyExpenses/${yearlyExpenses[i]?.id}`)
      batch.delete(docRef);
    }
    for(let i in singleExpenses){
      let docRef = doc(db, `budgets/${id}/singleExpenses/${singleExpenses[i]?.id}`)
      batch.delete(docRef);
    }

    batch.commit().then(() => {
        console.log("Budsjett og kostnader ble slettet");
        navigate('/budsjetter');
    }).catch(() => {
        console.log("Noe gikk galt");
    });

  }

  const getMonthlyExpensesText = () => {
    let text = '';
    if(monthlyExpenses?.length === 1){
        text = `1 månedlig kostnad`
    }else if(monthlyExpenses?.length > 1){
        text = `${monthlyExpenses?.length} månedlige kostnader`
    }
    return text;
  }
  const getYearlyExpensesText = () => {
    let text = '';
    if(yearlyExpenses?.length === 1){
        text = `1 årlig kostnad`
    }else if(yearlyExpenses?.length > 1){
        text = `${yearlyExpenses?.length} årlige kostnader`
    }
    return text;
  }
  const getSingleExpensesText = () => {
    let text = '';
    if(singleExpenses?.length === 1){
        text = `1 enkelt kostnad`
    }else if(singleExpenses?.length > 1){
        text = `${singleExpenses?.length} enkelt kostnader`
    }
    return text;
  }


  const textArray = [
    getMonthlyExpensesText(),
    getYearlyExpensesText(),
    getSingleExpensesText(),
  ]

  const filterTextArray = textArray.filter(text => text !== '');

  const hasCollectionsToDelete = () => {
        return filterTextArray?.length > 0
    }

  return (
    <Box 
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
      >
      <Typography variant="h5">Er du sikker på at du vil slette budsjett: {budget?.title}?</Typography>
      <Box
          display="flex"
          flexDirection="column"
          justifyContent="left"
          alignItems="left"
          color="blue"
      >
      {hasCollectionsToDelete() && <Typography sx={{marginTop: 2, marginBottom: 1}}>Da vil</Typography>}
      <List sx={{ listStyleType: 'disc', marginLeft: 3 }} >
          {filterTextArray.length > 1 && filterTextArray.map((text, index) => (
              text !== '' ? 
              <ListItem key={index} sx={{ display: 'list-item' }}>
                  <ListItemText
                  primary={(parseInt(index) + 1) !== filterTextArray.length ? `${text},` : `og ${text}`}
                  />
              </ListItem> : <></>
          ))}
          {filterTextArray.length === 1 && filterTextArray.map((text, index) => (
              text !== '' ? 
              <ListItem key={index} sx={{ display: 'list-item' }}>
                  <ListItemText
                  primary={text}
                  />
              </ListItem> : <></>
          ))}
          {}
      </List>
      {hasCollectionsToDelete() && <Typography sx={{marginTop: 1}}>også slettes.</Typography>}
      
      </Box>
      <Typography sx={{marginTop: 2, marginBottom: 4, marginLeft: -7}} color="red">Dette kan ikke angres.</Typography>
      
      <ButtonGroup>
      <Button sx={{marginRight: 3}} variant="contained" onClick={() => navigate("/budsjetter")}>Dra tilbake</Button>
      <Button variant="contained" color="error" onClick={handleDelete}>Slett gruppe</Button>
      </ButtonGroup>
  </Box>
  )
}