import { Badge, Box, Tab, Tabs } from "@mui/material";

import Media from './media/Media';
import Bookmarks from './bookmarks/Bookmarks';
import Notes from './notes/Notes';

import PropTypes from 'prop-types';
import { useState } from "react";
import { Bookmark, Movie, Note } from "@material-ui/icons";

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
                <Movie />
              </Badge>
              
            } label="Media" {...a11yProps(0)} />
          <Tab icon={
            <Badge color="primary">
              <Bookmark />
            </Badge>
            
            } label="Bokmerker" {...a11yProps(1)} />
          <Tab icon={
            <Badge color="primary">
              <Note />
            </Badge>
            
            } label="Notater" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Media />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Bookmarks />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Notes />
      </CustomTabPanel>
    </Box>
  </Box>
  )
}