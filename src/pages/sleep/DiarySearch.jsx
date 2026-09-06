import { Box, Button, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { getWeek } from "date-fns";
import DiaryList from './DiaryList';

const classes = {
    field: {
      marginTop: 3,
      marginBottom: 3,
      display: 'block',
      width: 200
    },
}

export default function DiarySearch() {
    const weekFromDateFns = getWeek(new Date(), { weekStartsOn: 1 });

    const yearCalculated = new Date().toLocaleDateString().split(".")[2];
    const [week, setWeek] = useState(weekFromDateFns);
    const [year, setYear] = useState(yearCalculated);
    const [diaries, setDiaries] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

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

        const colRef = collection(db, 'diary');
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

        setDiaries(results);
        setHasSearched(true);
    }
  return (
    <Box>
        
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Box
                    display="flex"
                    flexDirection="column"
                    // justifyContent="center"
                    // alignItems="center"
                    minHeight="20vh"
                    marginLeft="-40px"
                >
                <Typography  
                    variant="h6" 
                    color="textSecondary"
                    component="h2" 
                    gutterBottom
                    sx={{textTransform: 'uppercase'}}
                >
                    Søk opp dagbøker
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

            {diaries?.length > 0 && <DiaryList diaries={diaries} />}
        
            {hasSearched && diaries?.length === 0 && <List>
                <ListItem sx={{width: 400,  border: "3px solid #1769aa", borderRadius: 2, marginY: 2, marginX:-20}} key={"message"}>
                    <ListItemText primary={`Det er ikke registrert noen dagbøker for uke ${week} i år ${year}`} />
                </ListItem>
            </List>}
    </Box>
  )
}