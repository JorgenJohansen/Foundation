/* eslint-disable react/prop-types */

import { Box, Card, CardContent, CardHeader, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { EditOutlined } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

export default function DiaryInfo({diary}) {

    const navigate = useNavigate();

    const sendToEdit = (id) => {
        navigate(`/dagbok/${id}/rediger`);
    }
    
  return (
    <Box sx={{marginY: 10, marginLeft: -20}}>
        <Card sx={{width: "400px", border: "3px solid #1769aa"}}>
            <CardHeader 
            action={
                <>
                <Tooltip title={<Typography fontSize={15}>Rediger Todo</Typography>} placement="top">
                    <IconButton onClick={() => sendToEdit(diary.id)}>
                        <EditOutlined />
                    </IconButton>
                    </Tooltip>
                </>
            }
            title={`Dagbok for dagen: ${diary.date}`}
            />
            <Divider sx={{ borderBottomWidth: 3 }} />
            <CardContent>
                <Typography variant="h6" color="textSecondary" margin={1}>
                   {diary.title}
                </Typography>
                <Typography variant="h5" color="textSecondary" margin={1}>
                    {diary.content}
                </Typography>
                
            </CardContent>
        </Card>
    </Box>
  )
}