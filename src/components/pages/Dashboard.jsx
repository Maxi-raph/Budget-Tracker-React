import { useEffect, useMemo, useState } from "react";
import { useTransaction } from "../../context/TransactionContext";
import { useBudget } from "../../context/BudgetContext";
import {Link, useNavigate} from 'react-router'
import CashFlowChart from "../CashFlowChart";



const Dashboard = () => {
    const{totalIncome,totalExpense,largestCategory,recurringBills,transactionArr,prevCategory,setPrevCategory} = useTransaction()
    const {budgetArr,setExceededBudgetCount} = useBudget()
    const [limitWidth,setLimitWidth] = useState(0)
    const [isAwake,setIsAwake] = useState(false)

   const expense =   useMemo(()=>transactionArr.filter(item=>item['type'] == 'Expense').filter(item=>item['category'] == prevCategory).reduce((acc,curr) =>acc + parseInt(curr['amount']), 0),[prevCategory])
   const budgetCategory= useMemo(()=>budgetArr.filter(item=>item['category'] == prevCategory),[prevCategory])
   

    useEffect(()=>{
     setLimitWidth(() =>{
       if(budgetCategory.length == 1 && expense){ 
        let percent = Number(budgetCategory[0]['amount']/100)
       if( Number(expense/percent) > 100){
        return 100
       }else{
        return Number(expense/percent)
       }
    }
       return 0 
     })
  
    },[expense,transactionArr])

    useEffect(()=>{
      const handleVisibility = ()=>{
        if (document.visibilityState === 'visible') {
          setIsAwake(prev => !prev)     
        }
      }

      document.addEventListener('visibilitychange',handleVisibility)  
      return ()=>  document.removeEventListener('visibilitychange',handleVisibility)  
    },[])
    

    return ( <div className="max-w-5xl mx-auto p-5 rounded-lg bg-white dark:bg-gray-700 shadow-lg " id="dashboard">
     <h2 className="font-semibold text-lg mb-4">Dashboard Overview</h2>    
     <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-6">
        <div className="rounded-md bg-gray-200 dark:bg-gray-600 p-3 shadow-lg">
            <p className="text-gray-600 dark:text-white mb-4 font-semibold">Total Income</p>
            <span className="font-bold text-xl text-green-500">${totalIncome?.toLocaleString()}</span>
        </div>
        <div className="rounded-md bg-gray-200 dark:bg-gray-600 p-3 shadow-lg">
            <p className="text-gray-600 dark:text-white mb-4 font-semibold">Total Expenses</p>
            <span className="font-bold text-xl text-red-500">${totalExpense?.toLocaleString()}</span>
        </div>
        <div className="rounded-md bg-gray-200 dark:bg-gray-600 p-3 shadow-lg">
            <p className="text-gray-600 dark:text-white mb-4 font-semibold">Budget For {prevCategory||'Nil'}</p>
            <span className="font-bold text-xl">${budgetCategory.length == 1 && Number(budgetCategory[0]['amount']).toLocaleString()||0}</span>
            <span className="block text-md font-bold mt-3">Used Amount: ${expense.toLocaleString()}</span>
            <div className="mt-3 max-w-52 h-3 bg-white rounded-lg">
                <span style={{ width: `${limitWidth}%` }} className={`h-full rounded-lg block ${limitWidth < 50 ?'bg-green-500': limitWidth < 75 ?' bg-amber-500': ' bg-red-500'}`}></span>
            </div>
            <span className={`text-red-600 mt-1 ${budgetCategory.length == 1 && budgetCategory[0]['amount'] < expense ? 'block' : 'hidden'}`}>Budget exceeded by ${budgetCategory.length == 1 && (expense -  Number(budgetCategory[0]['amount'])).toLocaleString()}</span>
        </div>    
     </div>
      <Link to="/set_budget" className="mb-4 text-md font-semibold p-2 rounded-md w-[70%] mx-auto flex justify-center outline-none pl-3 bg-gray-900 cursor-pointer shadow-lg text-lg text-white lg:w-[32%] lg:mx-0 ">Set Budget</Link>   
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-18">
        <div className="flex justify-between items-center p-2 border-2 border-gray-100 dark:border-gray-800 dark:border rounded-md shadow-lg">
            <span className="font-semibold">Recurring Bills</span>
            <span className="block p-2 bg-gray-200 dark:bg-gray-800 py-1 px-4 rounded-xl font-semibold">${recurringBills}</span>
        </div>
        <div className="flex justify-between items-center p-2 border-2 border-gray-100 dark:border-gray-800 dark:border rounded-md shadow-lg">
            <span className="font-semibold">Largest Category</span>
            <span className="block p-2 bg-gray-200 dark:bg-gray-800 py-1 px-4 rounded-xl font-semibold">{largestCategory}</span>
        </div>
     </div>
     <CashFlowChart/>
    </div> );
}
 
export default Dashboard;