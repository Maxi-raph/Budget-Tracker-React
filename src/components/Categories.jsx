import { useEffect, useState, useMemo, useCallback } from "react";
import { useTransaction } from "../context/TransactionContext";
import { Doughnut, Bar, Line, Pie, PolarArea, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';


ChartJS.register(
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Categories = () => {
    const {transactionArr} = useTransaction()

    const rent = useMemo(()=>transactionArr.filter(item => item['category'] === 'Rent').reduce((acc,curr)=>acc + Number(curr['amount']),0) ,[transactionArr])
    const food = useMemo(()=>transactionArr.filter(item => item['category'] === 'Food').reduce((acc,curr)=>acc + Number(curr['amount']),0) ,[transactionArr])
    const utilities = useMemo(()=>transactionArr.filter(item => item['category'] === 'Utilities').reduce((acc,curr)=>acc + Number(curr['amount']),0) ,[transactionArr])
    const transport = useMemo(()=>transactionArr.filter(item => item['category'] === 'Transport').reduce((acc,curr)=>acc + Number(curr['amount']),0) ,[transactionArr])
    const health = useMemo(()=>transactionArr.filter(item => item['category'] === 'Health').reduce((acc,curr)=>acc + Number(curr['amount']),0) ,[transactionArr])
    

 
    const formatAmount = useCallback((value)=>{
          if (value >= 1000000000000) {
           return `$${(value/1000000000000).toFixed(1)}T`
          }else if (value >= 1000000000) {
           return `$${(value/1000000000).toFixed(1)}B`
          }else if (value >= 1000000) {
           return `$${(value/1000000).toFixed(1)}M`
          }
          else if (value >= 1000) {
           return `$${(value/1000).toFixed(1)}K`
          } 
         return `$${value}`

   },[transactionArr])


    

    const data = {
        labels: ['Rent','Food','Utilities','Transport','Health'],
        datasets:[
            {
                label: 'Spending By Category',
                data:[rent,food,utilities,transport,health],
    backgroundColor: [
  'rgba(255, 137, 0, 1)',    
  'rgba(34, 197, 0,1)',   
  'rgba(59, 130, 246,1)',    
  'rgba(20, 184, 166,1)',   
  'rgba(90, 30, 90,1)',   
],
borderColor: [
  'rgba(255, 137, 0, 1)',
  'rgba(34, 197, 0, 1)', 
  'rgba(59, 130, 246, 1)',
  'rgba(20, 184, 166, 1)',     
  'rgba(90, 30, 90, 1)',
],
                
            }
        ]
    }
     const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
     legend: {
      position: 'bottom',
      labels: {
        color: '#374151',           
        font: {
          family: "'Inter', sans-serif", 
          size: 14,                 
          weight: '600',            
          style: 'normal'           
        },
        padding: 10      
      }
    },
      title: {
        display: false,
        text: 'Spending by Category'
      }
    },
    scales: {
    x: {
      grid: {
        display: false
      },
      ticks:{
        color: 'black',
        font:{
          family:  "'Inter', sans-serif",
          size: 13,
          weight: '500'
        },
       

      }
    },
    y: {
      beginAtZero: true,
      ticks:{
        color: 'black',
        font:{
          family:  "'Inter', sans-serif",
          size: 13,
          weight: '500'
        },
        callback: (value)=>{
          if (value >= 1000000000000) {
           return `$${(value/1000000000000).toFixed(0)}T`
          }else if (value >= 1000000000) {
           return `$${(value/1000000000).toFixed(0)}B`
          }else if (value >= 1000000) {
           return `$${(value/1000000).toFixed(0)}M`
          }
          else if (value >= 1000) {
           return `$${(value/1000).toFixed(0)}K`
          } 
          return `$${value}`
        }
      }
    }
  }
  };

    return( 
    <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex justify-center items-center  rounded-md p-1 bg-gray-200 h-72 shadow-xl  text-gray-800 font-semibold bg-linear-to-br from-white/60 to-gray-400 border border-gray-200 backdrop-blur-xl">
              {transactionArr.filter(item => item.type == 'Expense').length > 0 
              ? <div className="w-full h-full">
                <Bar data={data} options={options} />
                </div>
              :' Add transactions to view category chart...'}
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 rounded-md shadow-lg">
                    <span className="font-semibold">Rent</span>
                     <span style={{backgroundColor:'rgba(255, 137, 0, 1)'}} className="block p-2 py-1 px-4 text-white rounded-xl font-semibold">{formatAmount(rent)}</span>
                </div>
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 rounded-md shadow-lg">
                    <span className="font-semibold">Food</span>
                     <span style={{backgroundColor:'rgba(34, 197, 0,1)'}} className="block p-2 py-1 px-4  text-white rounded-xl font-semibold">{formatAmount(food)}</span>
                </div>
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 rounded-md shadow-lg">
                    <span className="font-semibold">Utilities</span>
                     <span style={{backgroundColor:'rgba(59, 130, 246,1)'}}  className="block p-2 py-1 px-4 text-white rounded-xl font-semibold">{formatAmount(utilities)}</span>
                </div>
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 rounded-md shadow-lg">
                    <span className="font-semibold">Transport</span>
                     <span style={{backgroundColor:'rgba(20, 184, 166,1)'}}  className="block p-2 py-1 px-4 text-white  rounded-xl font-semibold">{formatAmount(transport)}</span>
                </div>
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 rounded-md shadow-lg">
                    <span className="font-semibold">Health</span>
                     <span style={{backgroundColor:'rgba(90, 30, 90,1)'}}  className="block p-2 py-1 px-4 text-white  rounded-xl font-semibold">{formatAmount(health)}</span>
                </div>
            </div>
        </div>
    </> );
}
 
export default Categories;