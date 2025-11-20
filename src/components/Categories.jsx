import { useEffect, useState, useMemo } from "react";
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
    

    const data = {
        labels: ['Rent','Food','Utilities','Transport','Health'],
        datasets:[
            {
                label: 'Spending By Category',
                data:[rent,food,utilities,transport,health],
    backgroundColor: [
  'rgba(239, 68, 68, 0.8)',    
  'rgba(34, 197, 94, 0.8)',   
  'rgba(59, 130, 246, 0.8)',    
  'rgba(20, 184, 166, 0.8)',   
  'rgba(245, 158, 11, 0.8)',   
],
borderColor: [
  'rgba(239, 68, 68, 1)',
  'rgba(34, 197, 94, 1)', 
  'rgba(59, 130, 246, 1)',
  'rgba(20, 184, 166, 1)',     
  'rgba(245, 158, 11, 1)',
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
      }
    },
    y: {
      beginAtZero: true
    }
  }
  };

    return( 
    <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex justify-center items-center  rounded-md p-1 bg-gray-200 h-72 shadow-xl  text-gray-500 bg-gradient-to-br from-cyan-50 to-blue-400 border border-blue-200 backdrop-blur-sm">
              {transactionArr.filter(item => item.type == 'Expense').length > 0 
              ? <div className="w-full h-full">
                <Bar data={data} options={options} />
                </div>
              :' Add transactions to view category chart...'}
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 rounded-md shadow-lg">
                    <span className="font-semibold">Rent</span>
                     <span className="block p-2 bg-gray-200 py-1 px-4 rounded-xl font-semibold">${rent}</span>
                </div>
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 rounded-md shadow-lg">
                    <span className="font-semibold">Food</span>
                     <span className="block p-2 bg-gray-200 py-1 px-4 rounded-xl font-semibold">${food}</span>
                </div>
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 rounded-md shadow-lg">
                    <span className="font-semibold">Utilities</span>
                     <span className="block p-2 bg-gray-200 py-1 px-4 rounded-xl font-semibold">${utilities}</span>
                </div>
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 rounded-md shadow-lg">
                    <span className="font-semibold">Transport</span>
                     <span className="block p-2 bg-gray-200 py-1 px-4 rounded-xl font-semibold">${transport}</span>
                </div>
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 rounded-md shadow-lg">
                    <span className="font-semibold">Health</span>
                     <span className="block p-2 bg-gray-200 py-1 px-4 rounded-xl font-semibold">${health}</span>
                </div>
            </div>
        </div>
    </> );
}
 
export default Categories;