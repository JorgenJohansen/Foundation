import { Badge, Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { Payment } from "@material-ui/icons";

import { ArrowBack } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDocument } from '../../../hooks/useDocument';
import { useSubCollection } from '../../../hooks/useSubCollection';
import BudgetInfo from "./BudgetInfo";
import CakeChart from "./PieChart";
import MonthlyExpenses from "./expenses/MonthlyExpenses";
import YearlyExpenses from "./expenses/YearlyExpenses";
import SingleExpenses from "./expenses/SingleExpenses";
import PropTypes from 'prop-types';
import { useState } from "react";

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


export default function SoloBudget() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { document: budget} = useDocument('budgets', id);
    const { documents: monthlyExpenses } = useSubCollection('budgets', id, 'monthlyExpenses');
    const { documents: yearlyExpenses } = useSubCollection('budgets', id, 'yearlyExpenses');
    const { documents: singleExpenses } = useSubCollection('budgets', id, 'singleExpenses');

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <Box sx={{margin: 10}}>
        <Button 
            sx={{position: 'absolute', top: '80px', left: '50px'}} 
            variant="contained" 
            startIcon={<ArrowBack />}
            onClick={() => navigate(`/budsjetter`)}
        >
        Dra tilbake
        </Button>
        <Typography variant="h5" sx={{marginY: 20}}>Denne siden skal vise fram budsjettinfo, kakediagram, kostnader og PDF nedlastning</Typography>
        <Box sx={{display: 'flex', flexDirection: 'column', margin: 10}}>
          <BudgetInfo budget={budget} monthlyExpenses={monthlyExpenses} yearlyExpenses={yearlyExpenses} singleExpenses={singleExpenses} />
          <CakeChart monthlyExpenses={monthlyExpenses} yearlyExpenses={yearlyExpenses} singleExpenses={singleExpenses} />
        </Box>
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
              <Badge badgeContent={monthlyExpenses?.length || 0} color="primary">
                <Payment />
              </Badge>
              
            } label="Månedlige kostnader" {...a11yProps(0)} />
          <Tab icon={
            <Badge badgeContent={yearlyExpenses?.length || 0} color="primary">
              <Payment />
            </Badge>
            
            } label="Årlige kostnader" {...a11yProps(1)} />
          <Tab 
            icon={
              <Badge badgeContent={singleExpenses?.length || 0} color="primary">
                <Payment />
              </Badge>
              
            } label="Enkelt kostnader" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <MonthlyExpenses expenses={monthlyExpenses} budgetId={id} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <YearlyExpenses expenses={yearlyExpenses} budgetId={id} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <SingleExpenses expenses={singleExpenses} budgetId={id} />
      </CustomTabPanel>
    </Box>
    </Box>
  )
}