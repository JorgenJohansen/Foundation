/* eslint-disable react/prop-types */

import { Box, IconButton, Link, List, ListItem, ListItemText, Tooltip, Typography,  } from "@mui/material";
import { DeleteOutlined, EditOutlined, VisibilityOutlined } from "@material-ui/icons";

import { useNavigate } from "react-router-dom";

export default function BookmarkList({bookmarks}) {


    const navigate = useNavigate();

    const sendToDelete = (id) => {
        navigate(`/bokmerker/${id}/slett`);
    }
    const sendToEdit = (id) => {
        navigate(`/bokmerker/${id}/rediger`);
    }

  return (
    <>

        <List>
            {bookmarks?.map(bookmark => (
                <ListItem sx={{width: 400,  border: "3px solid #1769aa", borderRadius: 2, marginY: 2}}
                    key={bookmark.id}
                    secondaryAction={
                        <Box display="flex" justifyContent="center" alignItems="center">

                       <Tooltip title={<Typography fontSize={15}>Sjekk ut Githuben</Typography>} placement="top">
                        <Link sx={{fontSize: 30}} href={bookmark?.link} underline='hover'>
                            <IconButton >
                                <VisibilityOutlined/>
                            </IconButton>
                        </Link>
                    </Tooltip>
                        <Tooltip title={<Typography fontSize={15}>Rediger Bokmerke</Typography>} placement="top">
                            <IconButton onClick={() => sendToEdit(bookmark.id)}>
                                <EditOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={<Typography fontSize={15}>Slett Bokmerke</Typography>} placement="top">
                            <IconButton onClick={() => sendToDelete(bookmark.id)}>
                                <DeleteOutlined />
                            </IconButton>
                        </Tooltip>
                        </Box>
                    }
                >
                    <ListItemText primary={bookmark.title} />
                </ListItem>
            ))}
        </List>
    </>
  )
}