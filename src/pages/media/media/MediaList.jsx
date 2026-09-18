/* eslint-disable react/prop-types */

import { Box, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@material-ui/icons";

import { useNavigate } from "react-router-dom";

export default function MediaList({media}) {


    const navigate = useNavigate();

    const sendToDelete = (id) => {
        navigate(`/medier/${id}/slett`);
    }
    const sendToEdit = (id) => {
        navigate(`/medier/${id}/rediger`);
    }

  return (
    <>

        <List>
            {media?.map(media => (
                <ListItem sx={{width: 400,  border: media?.done ? "3px solid #50C878" : "3px solid #1769aa", borderRadius: 2, marginY: 2}}
                    key={media.id}
                    secondaryAction={
                        <Box display="flex" justifyContent="center" alignItems="center">
                        
                        <Tooltip title={<Typography fontSize={15}>Rediger Media</Typography>} placement="top">
                            <IconButton onClick={() => sendToEdit(media.id)}>
                                <EditOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={<Typography fontSize={15}>Slett Media</Typography>} placement="top">
                            <IconButton onClick={() => sendToDelete(media.id)}>
                                <DeleteOutlined />
                            </IconButton>
                        </Tooltip>
                        </Box>
                    }
                >
                    <ListItemText primary={media.title} />
                </ListItem>
            ))}
        </List>
    </>
  )
}