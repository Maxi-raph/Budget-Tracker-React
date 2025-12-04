import { useState, useContext, createContext, useEffect } from "react";
import { useTransaction } from "./TransactionContext";


const BudgetContext  = createContext()


export const BudgetProvider = ({children})=>{

    // get transaction context values
 const {transactionArr} = useTransaction()

    // internal state
 const [budget,setBudget] = useState('')
 const [budgetExists,setBudgetExists] = useState(false)
 const [budgetArr,setBudgetArr] = useState([])
 const [exceededBudgetCount,setExceededBudgetCount] = useState(null)


    // useEffect to update exceededBudgetCount whenever transactionArr or budgetArr changes
      useEffect(()=>{
        if (budgetArr.length > 0){
            let count = 0
            budgetArr.forEach(budget =>{
            let expenses =  transactionArr.filter(item => item.category === budget.category).reduce((acc,curr) => acc + Number(curr.amount),0)
            if(expenses > budget['amount']) count++
            })
            setExceededBudgetCount(count)
        }else if (budgetArr.length === 0) {
              setExceededBudgetCount(null)          
        }
        
    },[transactionArr,budgetArr])

    return(
        <BudgetContext.Provider value={{budget,budgetExists,setBudget,budgetExists,setBudgetExists,budgetArr,setBudgetArr,exceededBudgetCount,setExceededBudgetCount}}>
            {children}
        </BudgetContext.Provider>
    )
}

export const useBudget =  ()=>useContext(BudgetContext)