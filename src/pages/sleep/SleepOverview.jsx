import { Badge, Box, Tab, Tabs } from "@mui/material";

import PropTypes from 'prop-types';
import { lazy, useState } from "react";
import { BarChart, Book, Search, SingleBed } from "@material-ui/icons";

//Må kode splittes:
const Sleep = lazy(() => import('./Sleep'));
// import Sleep from './Sleep';
const SleepStats = lazy(() => import('./SleepStats'));
// import SleepStats from "./SleepStats";
const Diary = lazy(() => import('./Diary'));
// import Diary from "./Diary";
const DiarySearch = lazy(() => import('./DiarySearch'));
// import DiarySearch from "./DiarySearch";


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

CustomTabPanel.propTypes = {
children: PropTypes.node,
index: PropTypes.number.isRequired,
value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



export default function SleepOverview() {

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  return (
    <Box sx={{margin: 10}}>
    
        
    <Box sx={{ width: '90%', margin: 10 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
        value={value} 
        onChange={handleChange} 
        aria-label="basic tabs example"
        sx={{
          '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
          },
        }}
        >
          <Tab 
            icon={
              <Badge color="primary">
                <SingleBed />
              </Badge>
              
            } label="Registrer søvn" {...a11yProps(0)} />
          <Tab icon={
            <Badge color="primary">
              <BarChart />
            </Badge>
            
            } label="Søvn statistikk" {...a11yProps(1)} />
          <Tab icon={
            <Badge color="primary">
              <Book />
            </Badge>
            
            } label="Dagbok" {...a11yProps(2)} />
          <Tab icon={
            <Badge color="primary">
              <Search />
            </Badge>
            
            } label="Søk Dagbøker" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Sleep />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SleepStats />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Diary />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <DiarySearch />
      </CustomTabPanel>
    </Box>
  </Box>
  )
}