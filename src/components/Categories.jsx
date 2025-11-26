import { useEffect, useState, useMemo, useCallback } from "react";
import { useTransaction } from "../context/TransactionContext";
import { Bar } from 'react-chartjs-2';
import {startOfWeek, endOfWeek, subWeeks, format, startOfMonth, endOfMonth, isWithinInterval, subMonths, isToday} from "date-fns";
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
    const [period,setPeriod] = useState('')
    const {transactionArr} = useTransaction()
 
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

   //  Categories for the present day
   const getToday = useCallback((transactions)=>{
        const obj = {} 

        transactions.forEach(item => {
            const key = item.category
          if (isToday(item.date)) {
              if (!obj[key]) obj[key] = 0

              if (item.category === "Rent") {
                obj[key] += Number(item.amount);
              } else if (item.category === "Food"){
                obj[key] += Number(item.amount);
              }
               else if (item.category === "Utilities"){
                obj[key] += Number(item.amount);
              }
               else if (item.category === "Transport"){
                obj[key] += Number(item.amount);
              }
               else if (item.category === "Health"){
                obj[key] += Number(item.amount);
              }
            }
          });

        return obj 
    },[transactionArr])

   //  Categories for the present week
   const getThisWeek = useCallback((transactions)=>{
        const obj = {} 
        const start = startOfWeek(new Date())
        const end = endOfWeek(new Date())

        transactions.forEach(item => {
          if (isWithinInterval(item.date, {start,end})) {
            const key = item.category
              if (!obj[key]) obj[key] = 0

              if (item.category === "Rent") {
                obj[key] += Number(item.amount);
              } else if (item.category === "Food"){
                obj[key] += Number(item.amount);
              }
               else if (item.category === "Utilities"){
                obj[key] += Number(item.amount);
              }
               else if (item.category === "Transport"){
                obj[key] += Number(item.amount);
              }
               else if (item.category === "Health"){
                obj[key] += Number(item.amount);
              }
          }
          });

        return obj 
    },[transactionArr])

   //  Categories for the last week
    const getLastWeek = useCallback((transactions)=>{
        const obj = {} 
        const lastWeek = subWeeks(new Date(), 1)
        const start = startOfWeek(lastWeek)
        const end = endOfWeek(lastWeek)

        transactions.forEach(item => {
          if (isWithinInterval(item.date, {start,end})) {
            const key = item.category
              if (!obj[key]) obj[key] = 0

              if (item.category === "Rent") {
                obj[key] += Number(item.amount);
              } else if (item.category === "Food"){
                obj[key] += Number(item.amount);
              }
               else if (item.category === "Utilities"){
                obj[key] += Number(item.amount);
              }
               else if (item.category === "Transport"){
                obj[key] += Number(item.amount);
              }
               else if (item.category === "Health"){
                obj[key] += Number(item.amount);
              }
          }
          });

        return obj 
    },[transactionArr])


   //  Categories for the present month
   const getThisMonth = useCallback((transactions)=>{
        const obj = {} 
        const start = startOfMonth(new Date())
        const end = endOfMonth(new Date())

        transactions.forEach(item => {
          if (isWithinInterval(item.date, {start,end})) {
            const key = item.category
              if (!obj[key]) obj[key] = 0

              if (item.category === "Rent") {
                obj[key] += Number(item.amount);
              } else if (item.category === "Food"){
                obj[key] += Number(item.amount);
              }
               else if (item.category === "Utilities"){
                obj[key] += Number(item.amount);
              }
               else if (item.category === "Transport"){
                obj[key] += Number(item.amount);
              }
               else if (item.category === "Health"){
                obj[key] += Number(item.amount);
              }
          }
          });

        return obj 
    },[transactionArr])
     
   //  Categories for the last month
   const getLastMonth = useCallback((transactions)=>{
        const obj = {} 
        const last = subMonths(new Date(), 1)
        const start = startOfMonth(last)
        const end = endOfMonth(last)

        transactions.forEach(item => {
          if (isWithinInterval(item.date, {start,end})) {
            const key = item.category
              if (!obj[key]) obj[key] = 0

              if (item.category === "Rent") {
                obj[key] += Number(item.amount);
              } else if (item.category === "Food"){
                obj[key] += Number(item.amount);
              }
               else if (item.category === "Utilities"){
                obj[key] += Number(item.amount);
              }
               else if (item.category === "Transport"){
                obj[key] += Number(item.amount);
              }
               else if (item.category === "Health"){
                obj[key] += Number(item.amount);
              }  
          }
          });

        return obj 
    },[transactionArr])
    

    // Get categories according to the time period selected
    const getPeriod = (period, transactions)=>{
      switch (period) {
        case 'today':
         return getToday(transactions)

        case 'this_week':
         return getThisWeek(transactions)

        case 'last_week':
         return getLastWeek(transactions)   
         
        case 'this_month':
         return getThisMonth(transactions)

        case 'last_month':
         return getLastMonth(transactions)

        default:
         return getToday(transactions)
      }
    }

        const categoryColorObj = {
        'Rent':'rgba(255, 137, 0, 1)',    
        'Food':'rgba(34, 197, 0,1)',   
        'Utilities':'rgba(59, 130, 246,1)',    
        'Transport':'rgba(20, 184, 166,1)',   
        'Health':'rgba(90, 30, 90,1)'  
        }
    const groupedObj = getPeriod(period,transactionArr)
    const grouped = Object.keys(groupedObj).sort()
    const categories = grouped.map(category => groupedObj[category])   
    const backgroundColors = grouped.map(category => categoryColorObj[category])

    const data = {
        labels: grouped,
        datasets:[
            {
              label: 'Spending By Category',
              data:categories,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors,
                
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative mt-16">
            <select value={period} onChange={(e)=>setPeriod(e.target.value)} className='absolute -top-12 right-0 outline-0 bg-gray-300 dark:bg-gray-700 dark:border-gray-900 text-sm font-semibold  p-1 cursor-pointer rounded-lg border border-gray-400'>
              <option value="" disabled className='font-semibold'>Show time period</option>
              <option value="today" className='font-semibold'>Today</option>
              <option value="this_week" className='font-semibold'>This Week</option>
              <option value="last_week" className='font-semibold'>Last Week</option>
              <option value="this_month" className='font-semibold'>This Month</option>
              <option value="last_month" className='font-semibold'>Last Month</option>
            </select>
            <div className="flex justify-center items-center  rounded-md p-1 h-72 dark:from-gray-500  dark:to-gray-800   dark:border-gray-900 dark:text-white shadow-xl  text-gray-800 font-semibold bg-linear-to-br from-white/60 to-gray-300 border border-gray-200 backdrop-blur-xl">
              {transactionArr.filter(item => item.type == 'Expense').length > 0 
              ? <div className="w-full h-full">
                <Bar data={data} options={options} />
                </div>
              :' Add transactions to view categories chart...'}
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 dark:border-gray-900 rounded-md shadow-lg">
                    <span className="font-semibold">Rent</span>
                     <span style={{backgroundColor:'rgba(255, 137, 0, 1)'}} className="block p-2 py-1 px-4 text-white rounded-xl font-semibold">{formatAmount(groupedObj['Rent']||0)}</span>
                </div>
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 dark:border-gray-900 rounded-md shadow-lg">
                    <span className="font-semibold">Food</span>
                     <span style={{backgroundColor:'rgba(34, 197, 0,1)'}} className="block p-2 py-1 px-4  text-white rounded-xl font-semibold">{formatAmount(groupedObj['Food']||0)}</span>
                </div>
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 dark:border-gray-900 rounded-md shadow-lg">
                    <span className="font-semibold">Utilities</span>
                     <span style={{backgroundColor:'rgba(59, 130, 246,1)'}}  className="block p-2 py-1 px-4 text-white rounded-xl font-semibold">{formatAmount(groupedObj['Utilities']||0)}</span>
                </div>
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 dark:border-gray-900 rounded-md shadow-lg">
                    <span className="font-semibold">Transport</span>
                     <span style={{backgroundColor:'rgba(20, 184, 166,1)'}}  className="block p-2 py-1 px-4 text-white  rounded-xl font-semibold">{formatAmount(groupedObj['Transport']||0)}</span>
                </div>
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 dark:border-gray-900 rounded-md shadow-lg">
                    <span className="font-semibold">Health</span>
                     <span style={{backgroundColor:'rgba(90, 30, 90,1)'}}  className="block p-2 py-1 px-4 text-white  rounded-xl font-semibold">{formatAmount(groupedObj['Health']||0)}</span>
                </div>
            </div>
        </div>
    </> );
}
 
export default Categories;