/* eslint-disable react/prop-types */

import { Box, Card, CardContent, CardHeader, Divider, Grid2, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from "@mui/material";
import { DeleteOutlined, EditOutlined, Payment, ViewList, VisibilityOutlined } from "@material-ui/icons";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BudgetList({budgets}) {

    const budgetView = JSON.parse(localStorage.getItem('budgetView'));

    const [listView, setListView] = useState(budgetView?.listView);
    const [cardView, setCardView] = useState(budgetView?.cardView);

    const navigate = useNavigate();

    const sendToDelete = (id) => {
        navigate(`/budsjetter/${id}/slett`);
    }
    const sendToEdit = (id) => {
        navigate(`/budsjetter/${id}/rediger`);
    }
    const sendToView = (id) => {
        navigate(`/budsjetter/${id}`);
    }

    const changeListView = () => {
        setListView(true);
        setCardView(false);
        const view = {
            listView: true,
            cardView: false,
        }
        localStorage.setItem('budgetView', JSON.stringify(view));
    }

    const changeCardView = () => {
        setListView(false);
        setCardView(true);
        const view = {
            listView: false,
            cardView: true,
        }
        localStorage.setItem('budgetView', JSON.stringify(view));
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
        {(budgets?.length > 0) &&
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
        {budgets?.map(budget => (
            <Grid2 item="true" key={budget.id} >

            <Card sx={{width: "400px", border: "3px solid #1769aa"}}>
                <CardHeader 
                action={
                    <>
                    <Tooltip title={<Typography fontSize={15}>Se Budsjett</Typography>} placement="top">
                    <IconButton onClick={() => sendToView(budget.id)}>
                        <VisibilityOutlined />
                    </IconButton>
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
                title={budget.title}
                />
                <Divider sx={{ borderBottomWidth: 3 }} />
                <CardContent>
                    <Typography variant="h6" color="textSecondary" margin={1}>
                        {budget.budget}kr i budsjettet
                    </Typography>
                    <Typography variant="h6" color="textSecondary" margin={1}>
                        Start dato: {convertToDateString(budget.startDate.seconds)}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" margin={1}>
                        Slutt dato: {convertToDateString(budget.endDate.seconds)}
                    </Typography>
                </CardContent>
            </Card>
            </Grid2>
        ))}
        </Grid2>}

        { listView && <List>
            {budgets?.map(budget => (
                <ListItem sx={{width: 400, border: "3px solid #1769aa", borderRadius: 2, marginY: 2}}
                    key={budget.id}
                    secondaryAction={
                        <Box display="flex" justifyContent="center" alignItems="center">
                        
                        <Tooltip title={<Typography fontSize={15}>Se Budsjett</Typography>} placement="top">
                            <IconButton onClick={() => sendToView(budget.id)}>
                                <VisibilityOutlined />
                            </IconButton>
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
                        </Box>
                    }
                >
                    <ListItemText primary={budget.title} />
                </ListItem>
            ))}
        </List>}
    </>
  )
}