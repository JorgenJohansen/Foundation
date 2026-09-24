/* eslint-disable react/prop-types */

import { Box, Card, CardContent, CardHeader, Divider, Grid2, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from "@mui/material";
import { DeleteOutlined, EditOutlined, Payment, ViewList } from "@material-ui/icons";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ResolvedList({resolved}) {

    const resolvedView = JSON.parse(localStorage.getItem('resolvedView'));

    const [listView, setListView] = useState(resolvedView?.listView);
    const [cardView, setCardView] = useState(resolvedView?.cardView);

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
        localStorage.setItem('resolvedView', JSON.stringify(view));
    }

    const changeCardView = () => {
        setListView(false);
        setCardView(true);
        const view = {
            listView: false,
            cardView: true,
        }
        localStorage.setItem('resolvedView', JSON.stringify(view));
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
        {(resolved?.length > 0) &&
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
        {resolved?.map(resolve => (
            <Grid2 item="true" key={resolve.id} >

            <Card sx={{width: "400px", border: "3px solid #1769aa"}}>
                <CardHeader 
                action={
                    <>
                    <Tooltip title={<Typography fontSize={15}>Rediger Løst</Typography>} placement="top">
                    <IconButton onClick={() => sendToEdit(resolve.id)}>
                        <EditOutlined />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title={<Typography fontSize={15}>Slett Løst</Typography>} placement="top">
                    <IconButton onClick={() => sendToDelete(resolve.id)}>
                    <DeleteOutlined />
                    </IconButton>
                    </Tooltip>
                    </>
                }
                title={resolve.title}
                />
                <Divider sx={{ borderBottomWidth: 3 }} />
                <CardContent>
                    <Typography variant="h6" color="textSecondary" margin={1}>
                        {resolve.content}
                    </Typography>
        
                </CardContent>
            </Card>
            </Grid2>
        ))}
        </Grid2>}

        { listView && <List>
            {resolved?.map(resolve => (
                <ListItem sx={{width: 400,  border: "3px solid #1769aa", borderRadius: 2, marginY: 2}}
                    key={resolve.id}
                    secondaryAction={
                        <Box display="flex" justifyContent="center" alignItems="center">
                        
                        <Tooltip title={<Typography fontSize={15}>Rediger Løst</Typography>} placement="top">
                            <IconButton onClick={() => sendToEdit(resolve.id)}>
                                <EditOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={<Typography fontSize={15}>Slett Løst</Typography>} placement="top">
                            <IconButton onClick={() => sendToDelete(resolve.id)}>
                                <DeleteOutlined />
                            </IconButton>
                        </Tooltip>
                        </Box>
                    }
                >
                    <ListItemText primary={resolve.title} />
                </ListItem>
            ))}
        </List>}
    </>
  )
}
