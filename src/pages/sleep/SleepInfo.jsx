/* eslint-disable react/prop-types */

import { Box, Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";

export default function SleepInfo({sleep}) {

    const convertToTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const hours = date.getHours();
        let minutes;
        if(date.getMinutes().toString().length < 2){
            minutes = '0' + date.getMinutes();
        }else{
            minutes = date.getMinutes();
        }

        return `${hours}:${minutes}`;
    }

    const calculateSleepTime = (timestamp1, timestamp2) => {

        const date1 = new Date(timestamp1 * 1000);
        const date2 = new Date(timestamp2 * 1000);

        let sleepCount;

        if(date1.getHours() >= 20 && date1.getHours() <= 24){
            sleepCount = 24 - date1.getHours() - date1.getMinutes()/60 + date2.getHours() + date2.getMinutes()/60;
        }else {
            sleepCount = date2.getHours() + date2.getMinutes()/60 - date1.getHours() - date1.getMinutes()/60;
        }

        return `Du sov ${sleepCount} timer i natt.`
    }
  return (
    <Box sx={{marginY: 10, marginLeft: -20}}>
        <Card sx={{width: "400px", border: "3px solid #1769aa"}}>
            <CardHeader 
            
            title={`Resultat for dagen: ${sleep.date}`}
            />
            <Divider sx={{ borderBottomWidth: 3 }} />
            <CardContent>
                <Typography variant="h6" color="textSecondary" margin={1}>
                    Du la deg: {convertToTime(sleep.sleepTime.seconds)}
                </Typography>
                <Typography variant="h6" color="textSecondary" margin={1}>
                    Du stod opp: {convertToTime(sleep.awakeTime.seconds)}
                </Typography>
                <Typography variant="h6" color="textSecondary" margin={1}>
                    {calculateSleepTime(sleep.sleepTime.seconds, sleep.awakeTime.seconds)}
                </Typography>
                <Typography variant="h6" color="textSecondary" margin={1}>
                    Søvnkvalitet: {sleep.sleepQuality}
                </Typography>
                <Typography variant="h6" color="textSecondary" margin={1}>
                    Energinivå: {sleep.energyLevel}
                </Typography>
                
            </CardContent>
        </Card>
    </Box>
  )
}