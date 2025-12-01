import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import SleepCharts from "./SleepCharts";
import { getWeek } from "date-fns";

const classes = {
    field: {
      marginTop: 3,
      marginBottom: 3,
      display: 'block',
      width: 200
    },
}

export default function SleepStats() {
    const weekFromDateFns = getWeek(new Date(), { weekStartsOn: 1 });

    const yearCalculated = new Date().toLocaleDateString().split(".")[2];
    const [week, setWeek] = useState(weekFromDateFns);
    const [year, setYear] = useState(yearCalculated);
    const [dates, setDates] = useState([]);

    const [weekError, setWeekError] = useState(false);
    const [yearError, setYearError] = useState(false);

    const { user } = useAuthContext();

    const handleSubmit = async(e) => {
        e.preventDefault();

        setWeekError(false);
        setYearError(false);

        if(week.toString().length !== 2){
            setWeekError(true);
            return;
        }

        if(year.length !== 4){
            setYearError(true);
            return;
        }

        const colRef = collection(db, 'sleep');
        const q = query(
            colRef,
            where('uid', '==', user?.uid),
            where('year','==', +year),
            where('week','==', +week),
            orderBy('createdAt', 'asc'),
            limit(7)
        );

        let results = [];

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            results.push({...doc.data(), id: doc.id});
        });

        setDates(results);
    }
  return (
    <Box>
        
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Box
                    display="flex"
                    flexDirection="column"
                    // justifyContent="center"
                    // alignItems="center"
                    minHeight="40vh"
                    marginLeft="-40px"
                >
                <Typography  
                    variant="h6" 
                    color="textSecondary"
                    component="h2" 
                    gutterBottom
                    sx={{textTransform: 'uppercase'}}
                >
                    Søk opp søvn
                </Typography>
            
                <TextField 
                    value={week}
                    type="number"
                    onChange={(e) => setWeek(e.target.value)}
                    sx={classes.field}
                    label="Registrer uke"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={weekError}
                />

                <TextField 
                    value={year}
                    type="number"
                    onChange={(e) => setYear(e.target.value)}
                    sx={classes.field}
                    label="Registrer år"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={yearError}
                />
                
                
                
                <Button 
                sx={{width: 200}}
                type="submit" 
                color="primary" 
                variant="contained"
                >
                Søk
                </Button>
                </Box>
            </form>

            {dates?.length > 0 && <SleepCharts dates={dates} />}
    </Box>
  )
}