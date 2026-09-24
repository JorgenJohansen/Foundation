/* eslint-disable react/prop-types */

import { Box, Card, CardContent, CardHeader, Divider, Grid2, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from "@mui/material";
import { DeleteOutlined, EditOutlined, Payment, ViewList } from "@material-ui/icons";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ReviewList({reviews}) {

    const reviewView = JSON.parse(localStorage.getItem('reviewView'));

    const [listView, setListView] = useState(reviewView?.listView);
    const [cardView, setCardView] = useState(reviewView?.cardView);

    const navigate = useNavigate();

    const {id: date} = useParams();

    const sendToDelete = (id) => {
        navigate(`/todos/${date}/slett/${id}`);
    }
    const sendToEdit = (id) => {
        navigate(`/todos/${date}/rediger/${id}`);
    }

    const changeListView = () => {
        setListView(true);
        setCardView(false);
        const view = {
            listView: true,
            cardView: false,
        }
        localStorage.setItem('reviewView', JSON.stringify(view));
    }

    const changeCardView = () => {
        setListView(false);
        setCardView(true);
        const view = {
            listView: false,
            cardView: true,
        }
        localStorage.setItem('reviewView', JSON.stringify(view));
    }

    let defaultView;

    if(listView === undefined || cardView === undefined){
        defaultView = true;
    }else {
        defaultView = false;
    }

  return (
    <>
        <Box margin={2}>
        {(reviews?.length > 0) &&
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
        {(defaultView || cardView) && <Grid2 container spacing={2} sx={{marginLeft: -10}} xs={12} sm={6} md={4} lg={3} >
        {reviews?.map(review => (
            <Grid2 item="true" key={review.id} >

            <Card sx={{width: "400px", border: "3px solid blue"}}>
                <CardHeader 
                action={
                    <>
                    <Tooltip title={<Typography fontSize={15}>Rediger Anmeldelse</Typography>} placement="top">
                    <IconButton onClick={() => sendToEdit(review.id)}>
                        <EditOutlined />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title={<Typography fontSize={15}>Slett Anmeldelse</Typography>} placement="top">
                    <IconButton onClick={() => sendToDelete(review.id)}>
                    <DeleteOutlined />
                    </IconButton>
                    </Tooltip>
                    </>
                }
                title={review.title}
                />
                <Divider sx={{ borderBottomWidth: 3 }} />
                <CardContent>
                    <Typography variant="h6" color="textSecondary" margin={1}>
                        {review.content}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" margin={1}>
                        {review.score}
                    </Typography>
        
                </CardContent>
            </Card>
            </Grid2>
        ))}
        </Grid2>}

        { listView && <List>
            {reviews?.map(review => (
                <ListItem sx={{width: 400,  border: "3px solid blue", borderRadius: 2, marginY: 2}}
                    key={review.id}
                    secondaryAction={
                        <Box display="flex" justifyContent="center" alignItems="center">
                        
                        <Tooltip title={<Typography fontSize={15}>Rediger Anmeldelse</Typography>} placement="top">
                            <IconButton onClick={() => sendToEdit(review.id)}>
                                <EditOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={<Typography fontSize={15}>Slett Anmeldelse</Typography>} placement="top">
                            <IconButton onClick={() => sendToDelete(review.id)}>
                                <DeleteOutlined />
                            </IconButton>
                        </Tooltip>
                        </Box>
                    }
                >
                    <ListItemText primary={review.title} />
                </ListItem>
            ))}
        </List>}
    </>
  )
}
