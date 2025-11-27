/* eslint-disable react/prop-types */

import { CloudDownload, DeleteOutlined, EditOutlined } from "@material-ui/icons";
import { Box, Card, CardContent, CardHeader, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import {Page, Text, Document, StyleSheet, PDFDownloadLink, View} from '@react-pdf/renderer';
import { useNavigate } from "react-router-dom";


export default function BudgetInfo({ budget, monthlyExpenses, yearlyExpenses, singleExpenses }) {

  const navigate = useNavigate();

  const sendToDelete = (id) => {
        navigate(`/budsjetter/${id}/slett`);
    }
    const sendToEdit = (id) => {
        navigate(`/budsjetter/${id}/rediger`);
    }

  const convertToDateString = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }

  const generateTotalExpenses = () => {
    let sum = 0;
    for(let i = 0; i < monthlyExpenses?.length; i++){
      sum += +monthlyExpenses[i].expense * 12
    }

    for(let i = 0; i < yearlyExpenses?.length; i++){
      sum += +yearlyExpenses[i].expense
    }

    for(let i = 0; i < singleExpenses?.length; i++){
      sum += +singleExpenses[i].expense
    }

    return sum;
  }

  const styles = StyleSheet.create({
    header: {
      fontSize: 22,
      margin: 10
    },
    budgetAmount: {
      fontSize: 18,
      margin: 10
    },
    budgetExpenses: {
      fontSize: 18,
      margin: 10
    },
    budgetText: {
      fontSize: 18,
      margin: 10
    },
    budgetDate: {
      fontSize: 18,
      margin: 10
    },
    subHeader: {
      fontSize: 20,
      margin: 10,
      fontWeight: 'extrabold',
      textDecoration: 'underline',
    },
    card: {
      border: '2px solid black',
      margin: 5,
      display: 'flex',
      flexDirection: 'column',
      width: 300
    },
    expenseName: {
      fontSize: 18,
      margin: 5
    },
    expenseAmount: {
      fontSize: 18,
      margin: 5
    },
    expenseDate: {
      fontSize: 18,
      margin: 5
    },
    expenseCategory: {
      fontSize: 18,
      margin: 5
    },
    expenseRepeat: {
      fontSize: 18,
      margin: 5
    },
  });

  const checkIfOverBudgetForDownload = (amount, expenses) => {
    let message = ``;
    if(amount > expenses){
      message = <Text style={{color: 'green', fontWeight: 'bold'}}>{`Gjenværende penger: ${amount-expenses}kr`}</Text>;
    }else if(amount < expenses){
      message = <Text style={{color: 'red', fontWeight: 'bold'}}>{`Over budsjett: ${expenses-amount}kr`}</Text>;
    }else {
      message = <Text style={{color: 'blue', fontWeight: 'bold'}}>Budsjett og kostnader er like</Text>;
    }
    return message;
  }

  const convertToDay = (timestamp) => {
    let date = new Date(timestamp * 1000);
    let dateString = date.toLocaleDateString();
    let dateSplit = dateString.split('.');

    let day = dateSplit[0];

    if(day[0] === "0"){
      day = day[1];
    }

    return `${day}.`;
  }

  for(let i in monthlyExpenses){
    console.log(convertToDay(monthlyExpenses[i].date.seconds));
  }

  const documentTemplate = 
  <Document>
    <Page>
      <Text style={styles.header}>Budsjett: {budget?.title}</Text>
      <Text style={styles.budgetAmount}>Totalt budsjett: {budget?.budget}kr</Text>
      <Text style={styles.budgetExpenses}>Totale kostnader: {generateTotalExpenses()}kr</Text>
      <Text style={styles.budgetText}>{checkIfOverBudgetForDownload(parseInt(budget?.budget), parseInt(generateTotalExpenses()))}</Text>
      <Text style={styles.budgetDate}>Periode: {convertToDateString(budget?.startDate.seconds)}-{convertToDateString(budget?.endDate.seconds)}</Text>
      <Text style={styles.budgetDate}>Opprettelsesdato: {budget?.createdAt.toDate().toLocaleDateString()}</Text>
      {monthlyExpenses?.length > 0 && <Text style={styles.subHeader}>Månedlige kostnader</Text>}
      {monthlyExpenses?.map(expense => (
        <View style={styles.card} key={expense.id}>
          <Text style={styles.expenseName}>{expense.title}</Text>
          <Text style={styles.expenseAmount}>{expense.expense}kr pr mnd</Text>
          <Text style={styles.expenseDate}>Trekkdato: {convertToDay(expense.date.seconds)} hver mnd</Text>
          <Text style={styles.expenseCategory}>Kategori: {expense.category}</Text>
        </View>
      ))}
      {yearlyExpenses?.length > 0 && <Text style={styles.subHeader}>Årlige kostnader</Text>}
      {yearlyExpenses?.map(expense => (
        <View style={styles.card} key={expense.id}>
          <Text style={styles.expenseName}>{expense.title}</Text>
          <Text style={styles.expenseAmount}>{expense.expense}kr pr år</Text>
          <Text style={styles.expenseDate}>Trekkdato: {convertToDateString(expense.date.seconds)}</Text>
          <Text style={styles.expenseCategory}>Kategori: {expense.category}</Text>
        </View>
      ))}
      {singleExpenses?.length > 0 && <Text style={styles.subHeader}>Enkelt kostnader</Text>}
      {singleExpenses?.map(expense => (
        <View style={styles.card} key={expense.id}>
          <Text style={styles.expenseName}>{expense.title}</Text>
          <Text style={styles.expenseAmount}>{expense.expense}kr</Text>
          <Text style={styles.expenseDate}>Kjøpdato: {convertToDateString(expense.date.seconds)}</Text>
          <Text style={styles.expenseCategory}>Kategori: {expense.category}</Text>
        </View>
      ))}
      <Text
        style={styles.pageNumber}
        render={({pageNumber, totalPages}) => `${pageNumber} av ${totalPages}`}
        fixed
      />
    </Page>
  </Document>

  return (
    <Box sx={{marginY: 10}}>
        <Card sx={{width: "400px", border: "3px solid #1769aa"}}>
            <CardHeader 
            action={
              <>
                <Tooltip title={<Typography fontSize={15}>Last ned Budsjett</Typography>} placement="top">
                <PDFDownloadLink className='nostylelink' document={documentTemplate} fileName={`Budsjett ${budget?.title}`}>
                  {({loading}) => (loading ? <IconButton disabled>Vent på nedlastning</IconButton> : <IconButton><CloudDownload /></IconButton>)}
                </PDFDownloadLink>
                </Tooltip>
                <Tooltip title={<Typography fontSize={15}>Rediger Budsjett</Typography>} placement="top">
                <IconButton onClick={() => sendToEdit(budget.id)}>
                    <EditOutlined />
                </IconButton>
                </Tooltip>
                <Tooltip title={<Typography fontSize={15}>Slett Budsjett</Typography>} placement="top">
                <IconButton onClick={() => sendToDelete(budget.id)}>
                <DeleteOutlined />
                </IconButton>
                </Tooltip>
              </>
            }
            title={`${budget?.title}`}
            />
            <Divider sx={{ borderBottomWidth: 3 }} />
            <CardContent>
                <Typography variant="h6" color="textSecondary" margin={1}>
                    {budget?.budget}kr i budsjettet.
                </Typography>
                <Typography variant="h6" color="textSecondary" margin={1}>
                    {generateTotalExpenses()}kr i totale kostnader.
                </Typography>
                <Typography variant="h6" color="textSecondary" margin={1}>
                    Start dato: {convertToDateString(budget?.startDate.seconds)}
                </Typography>
                <Typography variant="h6" color="textSecondary" margin={1}>
                    Slutt dato: {convertToDateString(budget?.endDate.seconds)}
                </Typography>
                
                
            </CardContent>
        </Card>
    </Box>
  )
}