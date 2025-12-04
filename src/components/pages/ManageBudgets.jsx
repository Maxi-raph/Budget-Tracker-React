import { useState,useEffect } from "react"
import { useBudget } from "../../context/BudgetContext"
import { useTransaction } from "../../context/TransactionContext"

const ManageBudgets = ()=>{
 // budget values gotten from budget context
  const {budgetArr} = useBudget()
 // transaction values gotten from transaction context
  const {transactionArr,prevCategory} = useTransaction()
 // internal state
  const [isAwake,setIsAwake] = useState(false)

 // useEffect to listen to visibility change event to update the isAwake state when the document becomes visible
 useEffect(()=>{
    const handleVisibility = ()=>{
    if (document.visibilityState === 'visible') {
        setIsAwake(prev => !prev)     
      }
    }

    document.addEventListener('visibilitychange',handleVisibility)  
    return ()=>  document.removeEventListener('visibilitychange',handleVisibility)  
 },[])

  // function to get expense from the transaction array that matches each budget category amount
  const getExpense = (category)=>{
    if (transactionArr.length > 0) {
        const expenseArr = transactionArr.filter(item => item['type'] == 'Expense') 
        if(expenseArr.filter(item=>item['category'] === category)){
        let expense = expenseArr.filter(item=>item['category'] === category).reduce((acc,curr)=>acc + Number(curr['amount']),0)
        return expense
        }        
    }
    return 0
  }
  // function to calculate the limit width of the budget progress bar based on the expense from the transaction array that matches each budget category amount
  const getLimitWidth = (amount,category,expense)=>{
       if(amount > 0 && category){ 
        let percent = Number(amount/100)
       if( Number(expense/percent) > 100){
        return 100
       }else{
        return Number(expense/percent)
       }
    }
       return 0 
  }

  
    return(
        <div className={`bg-white dark:bg-gray-700 p-4 w-full rounded-lg shadow-lg ${budgetArr.length > 0?' grid grid-cols-1 md:grid-cols-2 gap-6':''}`}>
            {budgetArr.length > 0 
            ? budgetArr.map((item,i) =>{
                const expense = getExpense(item['category']);
                const limitWidth = getLimitWidth(item['amount'],item['category'], expense);
            return   ( <div key={i} className={`rounded-md dark:bg-gray-600 p-3 shadow-lg ${prevCategory == item['category']?'bg-gray-400 dark:bg-gray-900':'bg-gray-200'}`}>
                    <p className={`mb-4 font-semibold text-black dark:text-white`}>Budget For {item['category']}</p>
                    <span className="font-bold text-xl">${Number(item['amount']).toLocaleString()}</span>
                    <span className="block text-md font-bold mt-3">Used Amount: ${expense.toLocaleString()}</span>
                    <div className="mt-3 max-w-52 h-3 bg-white rounded-lg">
                        <span style={{ width: `${limitWidth}%` }} className={`h-full rounded-lg block ${limitWidth < 50 ?'bg-green-500': limitWidth < 75 ?' bg-amber-500': ' bg-red-500'}`}></span>
                    </div>
                    <span className={`text-red-600 dark:text-red-300 mt-1 ${item['amount'] < expense ? 'block' : 'hidden'}`}>Budget exceeded by ${(expense -  Number(item['amount'])).toLocaleString()}</span>
                </div> )
            })
            : <p className="font-semibold flex item-center justify-center ">No budget has been set yet...</p>}
        </div>
    )
}

export default ManageBudgets