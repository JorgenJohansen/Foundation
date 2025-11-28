/* eslint-disable react/prop-types */

import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale,  
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js"
import { Box } from '@mui/material';

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement,
    Title,
    Tooltip,
    Legend
  );



export default function SleepCharts({dates}) {

    console.log(dates);

    const calculateSleepTime = (timestamp1, timestamp2) => {

        const date1 = new Date(timestamp1 * 1000);
        const date2 = new Date(timestamp2 * 1000);

        let sleepCount;

        if(date1.getHours() >= 21 || date1.getHours() <= 24){
            sleepCount = 24 - date1.getHours() + date2.getHours();
        }

        return sleepCount;
    }

    const generateSleepCountData = () => {
        let sleepCountData = [];
        for(let i in dates){
            sleepCountData.push(calculateSleepTime(dates[i].sleepTime.seconds, dates[i].awakeTime.seconds))
        }
        return sleepCountData;
    }

    const generateEnergyLevelData = () => {
        let energyLevelData = [];
        for(let i in dates){
            energyLevelData.push(dates[i].energyLevel);
        }
        return energyLevelData;
    }

    const generateSleepQualityData = () => {
        let sleepQualityData = [];
        for(let i in dates){
            sleepQualityData.push(dates[i].sleepQuality);
        }
        return sleepQualityData;
    }

    const generateLabels = () => {
        let labels = [];
        for(let i in dates){
            labels.push(dates[i].date)
        }
        return labels;
        
    }

    const barChartEnergyLevelData = {
        labels: generateLabels(),
        datasets: [
            {
                label: 'Energinivå',
                data: generateEnergyLevelData(),
                backgroundColor: [
                    "#2196f3"
                ]
            }
        ]
    }

    const barChartSleepQualityData = {
        labels: generateLabels(),
        datasets: [
            {
                label: 'Søvnkvalitet',
                data: generateSleepQualityData(),
                backgroundColor: [
                    "#2196f3"
                ]
            }
        ]
    }
    const barChartSleepCountData = {
        labels: generateLabels(),
        datasets: [
            {
                label: 'Antall timer søvn',
                data: generateSleepCountData(),
                backgroundColor: [
                    "#2196f3"
                ]
            }
        ]
    }

    const options = {};

  return (
    <>
    <Box sx={{width: 800, height: 400}}>
        <Bar options={options} data={barChartSleepCountData}/>
    </Box>
    <Box sx={{width: 800, height: 400}}>
        <Bar options={options} data={barChartEnergyLevelData}/>
    </Box>
    <Box sx={{width: 800, height: 400}}>
        <Bar options={options} data={barChartSleepQualityData}/>
    </Box>
    
    </>
  )
}