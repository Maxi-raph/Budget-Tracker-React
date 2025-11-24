import { useTransaction } from '../context/TransactionContext';
import {Bar} from 'react-chartjs-2'
import { format } from "date-fns";
import {
  Chart as ChartJS,
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
import { useCallback, useEffect } from 'react';


ChartJS.register(
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



const CashFlow = () => {
    const {totalIncome,totalExpense,transactionArr} = useTransaction()
    const hasIncome = transactionArr.some(t => t.type === "Income");
    const hasExpense = transactionArr.some(t => t.type === "Expense");
  
    const getTransactionsByDay = useCallback((transactions)=>{
        const obj = {} 

        transactions.forEach(item => {
            if (!obj[ format(item['date'], 'MMM dd')]) {
                obj[ format(item['date'], 'MMM dd')] = {Income: 0, Expense:0}
            }
            if (item['type'] === 'Income') {
                obj[ format(item['date'], 'MMM dd')].Income += Number(item['amount'])
            } else {
                obj[ format(item['date'], 'MMM dd')].Expense += Number(item['amount'])
            }
        });


        return obj 
    },[transactionArr])
    
    const daysObj = getTransactionsByDay(transactionArr)
    const days = Object.keys(daysObj).sort()
    const income = days.map(date => daysObj[date]['Income'])
    const expense = days.map(date => daysObj[date]['Expense'])



    useEffect(()=>console.log(income,expense),[transactionArr])

   const data = {
    labels: days,
    datasets:[
        {
            label: 'Income',
            data:income,
            backgroundColor:'rgba(34, 197, 94, 1)'
        },
        {
            label: 'Expense',
            data:expense,
            backgroundColor:'rgba(239, 68, 68, 1)'
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

    return ( 
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex justify-center items-center  rounded-md p-1 h-72 shadow-xl  text-gray-800 font-semibold bg-linear-to-br from-white/60 to-gray-300 border border-gray-200 backdrop-blur-xl">
                {transactionArr.length > 1 && hasIncome && hasExpense
                ? <Bar data={data} options={options}/>
                : 'Add transactions to view cash flow...'}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="rounded-md bg-gray-400 p-3 shadow-lg">
                    <p className="text-white mb-4 font-semibold">Total Income</p>
                    <span className="font-bold text-xl text-green-700">${totalIncome?.toLocaleString()}</span>
                </div>
                <div className="rounded-md bg-gray-400 p-3 shadow-lg">
                    <p className="text-white mb-4 font-semibold">Total Expenses</p>
                    <span className="font-bold text-xl text-red-700">${totalExpense?.toLocaleString()}</span>
                </div>
                <div className="rounded-md bg-gray-400 p-3 shadow-lg">
                    <p className="text-white mb-4 font-semibold">Remaining Balance</p>
                    <span className="font-bold text-xl">${Math.abs(totalIncome - totalExpense)?.toLocaleString()}</span>
                </div>  
            </div>
         </div>   
     );
}
 
export default CashFlow;