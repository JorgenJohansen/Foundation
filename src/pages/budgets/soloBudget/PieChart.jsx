/* eslint-disable react/prop-types */

import { Box } from "@mui/material";

import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js"
ChartJS.register(Tooltip, Legend, ArcElement);


export default function PieChart({monthlyExpenses, yearlyExpenses, singleExpenses}) {
  

  const getHousingCategoryExpenses = () => {
    let sum = 0;
    for(let i in monthlyExpenses){
      if(monthlyExpenses[i].category === 'bolig'){
        sum += +monthlyExpenses[i].expense * 12
      }
    }
    for(let i in yearlyExpenses){
      if(yearlyExpenses[i].category === 'bolig'){
        sum += +yearlyExpenses[i].expense
      }
    }
    for(let i in singleExpenses){
      if(singleExpenses[i].category === 'bolig'){
        sum += +singleExpenses[i].expense
      }
    }
    return sum;
  }
  const getInsuranceCategoryExpenses = () => {
    let sum = 0;
    for(let i in monthlyExpenses){
      if(monthlyExpenses[i].category === 'forsikring'){
        sum += +monthlyExpenses[i].expense * 12
      }
    }
    for(let i in yearlyExpenses){
      if(yearlyExpenses[i].category === 'forsikring'){
        sum += +yearlyExpenses[i].expense
      }
    }
    for(let i in singleExpenses){
      if(singleExpenses[i].category === 'forsikring'){
        sum += +singleExpenses[i].expense
      }
    }
    return sum;
  }
  const getTransportCategoryExpenses = () => {
    let sum = 0;
    for(let i in monthlyExpenses){
      if(monthlyExpenses[i].category === 'transport'){
        sum += +monthlyExpenses[i].expense * 12
      }
    }
    for(let i in yearlyExpenses){
      if(yearlyExpenses[i].category === 'transport'){
        sum += +yearlyExpenses[i].expense
      }
    }
    for(let i in singleExpenses){
      if(singleExpenses[i].category === 'transport'){
        sum += +singleExpenses[i].expense
      }
    }
    return sum;
  }
  const getAnimalsCategoryExpenses = () => {
    let sum = 0;
    for(let i in monthlyExpenses){
      if(monthlyExpenses[i].category === 'dyr'){
        sum += +monthlyExpenses[i].expense * 12
      }
    }
    for(let i in yearlyExpenses){
      if(yearlyExpenses[i].category === 'dyr'){
        sum += +yearlyExpenses[i].expense
      }
    }
    for(let i in singleExpenses){
      if(singleExpenses[i].category === 'dyr'){
        sum += +singleExpenses[i].expense
      }
    }
    return sum;
  }
  const getMobileCategoryExpenses = () => {
    let sum = 0;
    for(let i in monthlyExpenses){
      if(monthlyExpenses[i].category === 'mobil'){
        sum += +monthlyExpenses[i].expense * 12
      }
    }
    for(let i in yearlyExpenses){
      if(yearlyExpenses[i].category === 'mobil'){
        sum += +yearlyExpenses[i].expense
      }
    }
    for(let i in singleExpenses){
      if(singleExpenses[i].category === 'mobil'){
        sum += +singleExpenses[i].expense
      }
    }
    return sum;
  }
  const getEntertainmentCategoryExpenses = () => {
    let sum = 0;
    for(let i in monthlyExpenses){
      if(monthlyExpenses[i].category === 'underholdning'){
        sum += +monthlyExpenses[i].expense * 12
      }
    }
    for(let i in yearlyExpenses){
      if(yearlyExpenses[i].category === 'underholdning'){
        sum += +yearlyExpenses[i].expense
      }
    }
    for(let i in singleExpenses){
      if(singleExpenses[i].category === 'underholdning'){
        sum += +singleExpenses[i].expense
      }
    }
    return sum;
  }
  const getHousingArticlesCategoryExpenses = () => {
    let sum = 0;
    for(let i in monthlyExpenses){
      if(monthlyExpenses[i].category === 'husholdningsartikler'){
        sum += +monthlyExpenses[i].expense * 12
      }
    }
    for(let i in yearlyExpenses){
      if(yearlyExpenses[i].category === 'husholdningsartikler'){
        sum += +yearlyExpenses[i].expense
      }
    }
    for(let i in singleExpenses){
      if(singleExpenses[i].category === 'husholdningsartikler'){
        sum += +singleExpenses[i].expense
      }
    }
    return sum;
  }

  const pieChartOptions = {}
  const pieChartData = {
    labels: ["Bolig", "Forsikring", "Transport", "Dyr", "Mobil", "Underholdning", "Husholdningsartikler"],
    datasets: [
        {
            label: "Kostnader",
            data: [
              getHousingCategoryExpenses(), 
              getInsuranceCategoryExpenses(), 
              getTransportCategoryExpenses(), 
              getAnimalsCategoryExpenses(), 
              getMobileCategoryExpenses(), 
              getEntertainmentCategoryExpenses(),
              getHousingArticlesCategoryExpenses(),
            ],
            backgroundColor: [
                "rgba(255, 99, 132, 0.9)",
                "rgba(54, 162, 235, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(75, 192, 192, 0.9)",
                "rgba(153, 102, 255, 0.9)",
                "rgba(255, 148, 112, 0.9)",
                "rgba(255, 0, 255, 0.9)",
            ],
            hoverOffset: 4
        }
    ]
  }
  
  return (
    <Box >
      <div style={{height: 450, width: 450, marginLeft: 30}}>
        <Pie options={pieChartOptions} data={pieChartData} />
      </div>
    </Box>
  )
}