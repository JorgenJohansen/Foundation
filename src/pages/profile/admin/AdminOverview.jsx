import { Badge, Box, Tab, Tabs } from "@mui/material";

import PropTypes from 'prop-types';
import { lazy, useState } from "react";
import { BugReport, Check, Star } from "@material-ui/icons";

const Issue = lazy(() => import('./Issue'));
const Review = lazy(() => import('./Review'));
const Resolved = lazy(() => import('./Resolved'));

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
                <Star />
              </Badge>
              
            } label="Anmeldelser" {...a11yProps(0)} />
          <Tab icon={
            <Badge color="primary">
              <BugReport />
            </Badge>
            
            } label="Feil" {...a11yProps(1)} />
          <Tab icon={
            <Badge color="primary">
              <Check />
            </Badge>
            
            } label="Løst" {...a11yProps(2)} />
          
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Review />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Issue />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Resolved />
      </CustomTabPanel>
    </Box>
  </Box>
  )
}