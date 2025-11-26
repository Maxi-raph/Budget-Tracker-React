import { useContext,useCallback,useState, createContext } from "react";
import { useTransaction } from '../context/TransactionContext';
import {startOfWeek, endOfWeek, subWeeks, format, startOfMonth, endOfMonth, isWithinInterval, subMonths} from "date-fns";

const CashFlowContext = createContext()

export const CashFlowProvider = ({children}) =>{
   // State
    const [period,setPeriod] = useState('')

   // Context
    const {transactionArr} = useTransaction()

   // I checked that the transaction arr contains both expense and income before the chart can be shown
    const hasIncome = transactionArr.some(t => t.type === "Income");
    const hasExpense = transactionArr.some(t => t.type === "Expense");

   //  CashFlow for the present week
   const getThisWeek = useCallback((transactions)=>{
        const obj = {} 
        const start = startOfWeek(new Date())
        const end = endOfWeek(new Date())

        transactions.forEach(item => {
          if (isWithinInterval(item.date, {start,end})) {
            const key = format(item.date, 'EEE')
              if (!obj[key]) obj[key] = { Income: 0, Expense: 0 };

              if (item.type === "Income") {
                obj[key].Income += Number(item.amount);
              } else {
                obj[key].Expense += Number(item.amount);
              }
          }
          });

        return obj 
    },[transactionArr])

   //  CashFlow for the last week
    const getLastWeek = useCallback((transactions)=>{
        const obj = {} 
        const lastWeek = subWeeks(new Date(), 1)
        const start = startOfWeek(lastWeek)
        const end = endOfWeek(lastWeek)

        transactions.forEach(item => {
          if (isWithinInterval(item.date, {start,end})) {
            const key = format(item.date, 'EEE')
              if (!obj[key]) obj[key] = { Income: 0, Expense: 0 };

              if (item.type === "Income") {
                obj[key].Income += Number(item.amount);
              } else {
                obj[key].Expense += Number(item.amount);
              }
          }
          });

        return obj 
    },[transactionArr])


   //  CashFlow for the present month
   const getThisMonth = useCallback((transactions)=>{
        const obj = {} 
        const start = startOfMonth(new Date())
        const end = endOfMonth(new Date())

        transactions.forEach(item => {
          if (isWithinInterval(item.date, {start,end})) {
            const key = format(item.date, 'MMM dd')
              if (!obj[key]) obj[key] = { Income: 0, Expense: 0 };

              if (item.type === "Income") {
                obj[key].Income += Number(item.amount);
              } else {
                obj[key].Expense += Number(item.amount);
              }
          }
          });

        return obj 
    },[transactionArr])
    

   //  CashFlow for the last month
   const getLastMonth = useCallback((transactions)=>{
        const obj = {} 
        const last = subMonths(new Date(), 1)
        const start = startOfMonth(last)
        const end = endOfMonth(last)

        transactions.forEach(item => {
          if (isWithinInterval(item.date, {start,end})) {
            const key = format(item.date, 'MMM dd')
              if (!obj[key]) obj[key] = { Income: 0, Expense: 0 };

              if (item.type === "Income") {
                obj[key].Income += Number(item.amount);
              } else {
                obj[key].Expense += Number(item.amount);
              }
          }
          });

        return obj 
    },[transactionArr])
    

    // Get cashflow according to the time period selected
    const getPeriod = (period, transactions)=>{
      switch (period) {
        case 'this_week':
         return getThisWeek(transactions)

        case 'last_week':
         return getLastWeek(transactions)   
         
        case 'this_month':
         return getThisMonth(transactions)

        case 'last_month':
         return getLastMonth(transactions)

        default:
         return getThisWeek(transactions)
      }
    }
    
    const groupedObj = getPeriod(period,transactionArr)
    const grouped = Object.keys(groupedObj).sort()
    const income = grouped.map(date => groupedObj[date]['Income'])
    const expense = grouped.map(date => groupedObj[date]['Expense'])
    const totalIncome = income.reduce((acc,curr)=>acc + curr,0)
    const totalExpense = expense.reduce((acc,curr)=>acc + curr,0)


   const data = {
    labels: grouped,
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





    return(
        <CashFlowContext.Provider value={{hasIncome,hasExpense,data,options,totalIncome,totalExpense,period,setPeriod,getPeriod}}>
            {children}
        </CashFlowContext.Provider>
    )
}


export const useCashFlow = ()=> useContext(CashFlowContext)