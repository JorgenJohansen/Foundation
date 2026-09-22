/* eslint-disable react/prop-types */

import { Box, Card, CardContent, CardHeader, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

export default function ReviewInfo({review}) {

    const navigate = useNavigate();

    const sendToEdit = (id) => {
        navigate(`/profil/anmeldelse/${id}/rediger`);
    }

    const sendToDelete = (id) => {
        navigate(`/profil/anmeldelse/${id}/slett`);
    }
    
  return (
    <Box sx={{marginY: 10, marginLeft: -20}}>
        <Card sx={{width: "400px", border: "3px solid #1769aa"}}>
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
            title={`Anmeldelse`}
            />
            <Divider sx={{ borderBottomWidth: 3 }} />
            <CardContent>
                <Typography variant="h6" color="textSecondary" margin={1}>
                   {review?.title}
                </Typography>
                <Typography variant="h5" color="textSecondary" margin={1}>
                    {review?.content}
                </Typography>
                <Typography variant="h5" color="textSecondary" margin={1}>
                    {review?.score}
                </Typography>
                
            </CardContent>
        </Card>
    </Box>
  )
}