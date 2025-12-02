/* eslint-disable react/prop-types */

import { Box, Card, CardContent, CardHeader, Divider, Grid2, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from "@mui/material";
import { Check, DeleteOutlined, EditOutlined, Payment, ViewList } from "@material-ui/icons";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TodoList({todos}) {

    const todoView = JSON.parse(localStorage.getItem('todoView'));

    const [listView, setListView] = useState(todoView?.listView);
    const [cardView, setCardView] = useState(todoView?.cardView);

    const navigate = useNavigate();

    const sendToDelete = (id) => {
        navigate(`/todos/${id}/slett`);
    }
    const sendToEdit = (id) => {
        navigate(`/todos/${id}/rediger`);
    }

    const changeListView = () => {
        setListView(true);
        setCardView(false);
        const view = {
            listView: true,
            cardView: false,
        }
        localStorage.setItem('todoView', JSON.stringify(view));
    }

    const changeCardView = () => {
        setListView(false);
        setCardView(true);
        const view = {
            listView: false,
            cardView: true,
        }
        localStorage.setItem('todoView', JSON.stringify(view));
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
        {(todos?.length > 0) &&
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
        {todos?.map(todo => (
            <Grid2 item="true" key={todo.id} >

            <Card sx={{width: "400px", border: todo?.done ? "3px solid #50C878" : "3px solid #1769aa"}}>
                <CardHeader 
                action={
                    <>
                    {todo?.done && <Tooltip title={<Typography fontSize={15}>Todo er ferdig</Typography>} placement="top">
                    <IconButton>
                        <Check/>
                    </IconButton>
                    </Tooltip>}
                    <Tooltip title={<Typography fontSize={15}>Rediger Todo</Typography>} placement="top">
                    <IconButton onClick={() => sendToEdit(todo.id)}>
                        <EditOutlined />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title={<Typography fontSize={15}>Slett Todo</Typography>} placement="top">
                    <IconButton onClick={() => sendToDelete(todo.id)}>
                    <DeleteOutlined />
                    </IconButton>
                    </Tooltip>
                    </>
                }
                title={todo.title}
                />
                <Divider sx={{ borderBottomWidth: 3 }} />
                <CardContent>
                    <Typography variant="h6" color="textSecondary" margin={1}>
                        {todo.description}
                    </Typography>
        
                </CardContent>
            </Card>
            </Grid2>
        ))}
        </Grid2>}

        { listView && <List>
            {todos?.map(todo => (
                <ListItem sx={{width: 400,  border: todo?.done ? "3px solid #50C878" : "3px solid #1769aa", borderRadius: 2, marginY: 2}}
                    key={todo.id}
                    secondaryAction={
                        <Box display="flex" justifyContent="center" alignItems="center">
                        
                        <Tooltip title={<Typography fontSize={15}>Rediger Todo</Typography>} placement="top">
                            <IconButton onClick={() => sendToEdit(todo.id)}>
                                <EditOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={<Typography fontSize={15}>Slett Todo</Typography>} placement="top">
                            <IconButton onClick={() => sendToDelete(todo.id)}>
                                <DeleteOutlined />
                            </IconButton>
                        </Tooltip>
                        </Box>
                    }
                >
                    <ListItemText primary={todo.title} />
                </ListItem>
            ))}
        </List>}
    </>
  )
}