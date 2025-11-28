/* eslint-disable react/prop-types */

import { Box, Card, CardContent, CardHeader, Divider, Grid2, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from "@mui/material";
import { DeleteOutlined, EditOutlined, Payment, ViewList } from "@material-ui/icons";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SingleExpensesList({expenses}) {

  const expenseView = JSON.parse(localStorage.getItem(`singleExpensesView`));
  
  const [listView, setListView] = useState(expenseView?.listView);
  const [cardView, setCardView] = useState(expenseView?.cardView);

  const navigate = useNavigate();

  const sendToDelete = (id) => {
        navigate(`enkeltKostnader/${id}/slett`);
    }
    const sendToEdit = (id) => {
        navigate(`enkeltKostnader/${id}/rediger`);
    }

    const changeListView = () => {
        setListView(true);
        setCardView(false);
        const view = {
            listView: true,
            cardView: false,
        }
        localStorage.setItem('singleExpensesView', JSON.stringify(view));
    }

    const changeCardView = () => {
        setListView(false);
        setCardView(true);
        const view = {
            listView: false,
            cardView: true,
        }
        localStorage.setItem('singleExpensesView', JSON.stringify(view));
    }

    let defaultView;

    if(listView === undefined || cardView === undefined){
        defaultView = true;
    }else {
        defaultView = false;
    }

    const convertToDateString = (timestamp) => {
        const date = new Date(timestamp * 1000);

        return date.toLocaleDateString();
    }

  return (
    <>
        <Box margin={2}>
        {(expenses?.length > 0) &&
            <>
            <Tooltip placement="top" title={<Typography fontSize={15}>Listevisning</Typography>}>
                <IconButton onClick={changeListView} >
                    <ViewList fontSize="large"/>
                </IconButton>
            </Tooltip>
            <Tooltip placement="top" title={<Typography fontSize={15}>Kortvisning</Typography>}>
                <IconButton onClick={changeCardView}>
                    <Payment fontSize="large"/>
                </IconButton>
            </Tooltip>
            </>}

        </Box>
        {(defaultView || cardView) && <Grid2 container spacing={2} sx={{marginLeft: 0}} xs={12} sm={6} md={4} lg={3} >
        {expenses?.map(expense => (
            <Grid2 item="true" key={expense.id} >

            <Card sx={{width: "400px", border: "3px solid #1769aa"}}>
                <CardHeader 
                action={
                    <>
                    <Tooltip title={<Typography fontSize={15}>Rediger Kostnad</Typography>} placement="top">
                    <IconButton onClick={() => sendToEdit(expense.id)}>
                        <EditOutlined />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title={<Typography fontSize={15}>Slett Kostnad</Typography>} placement="top">
                    <IconButton onClick={() => sendToDelete(expense.id)}>
                    <DeleteOutlined />
                    </IconButton>
                    </Tooltip>
                    </>
                }
                title={expense.title}
                />
                <Divider sx={{ borderBottomWidth: 3 }} />
                <CardContent>
                    <Typography variant="h6" color="textSecondary" margin={1}>
                        {expense.expense}kr i kostnad.
                    </Typography>
                    <Typography variant="h6" color="textSecondary" margin={1}>
                      Kategori: {expense.category}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" margin={1}>
                        Dato: {convertToDateString(expense.date.seconds)}
                    </Typography>
                    
                </CardContent>
            </Card>
            </Grid2>
        ))}
        </Grid2>}

        { listView && <List>
            {expenses?.map(expense => (
                <ListItem sx={{width: 400, border: "3px solid #1769aa", borderRadius: 2, marginY: 2}}
                    key={expense.id}
                    secondaryAction={
                        <Box display="flex" justifyContent="center" alignItems="center">
                        <Tooltip title={<Typography fontSize={15}>Rediger Månedlig Kostnad</Typography>} placement="top">
                            <IconButton onClick={() => sendToEdit(expense.id)}>
                                <EditOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={<Typography fontSize={15}>Slett Månedlig Kostnad</Typography>} placement="top">
                            <IconButton onClick={() => sendToDelete(expense.id)}>
                                <DeleteOutlined />
                            </IconButton>
                        </Tooltip>
                        </Box>
                    }
                >
                    <ListItemText primary={expense.title} />
                </ListItem>
            ))}
        </List>}
    </>
  )
}