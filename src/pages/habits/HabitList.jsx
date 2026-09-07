/* eslint-disable react/prop-types */

import { Box, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@material-ui/icons";

import { useNavigate } from "react-router-dom";

export default function HabitList({habits}) {


    const navigate = useNavigate();

    const sendToDelete = (id) => {
        navigate(`/vaner/${id}/slett`);
    }
    const sendToEdit = (id) => {
        navigate(`/vaner/${id}/rediger`);
    }

  return (
    <>

        <List>
            {habits?.map(habit => (
                <ListItem sx={{width: 400,  border: "3px solid #1769aa", borderRadius: 2, marginY: 2}}
                    key={habit.id}
                    secondaryAction={
                        <Box display="flex" justifyContent="center" alignItems="center">
                        
                        <Tooltip title={<Typography fontSize={15}>Rediger Todo</Typography>} placement="top">
                            <IconButton onClick={() => sendToEdit(habit.id)}>
                                <EditOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={<Typography fontSize={15}>Slett Todo</Typography>} placement="top">
                            <IconButton onClick={() => sendToDelete(habit.id)}>
                                <DeleteOutlined />
                            </IconButton>
                        </Tooltip>
                        </Box>
                    }
                >
                    <ListItemText primary={habit.title} />
                </ListItem>
            ))}
        </List>
    </>
  )
}