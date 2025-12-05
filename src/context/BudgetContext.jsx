import { useState, useContext, createContext, useEffect } from "react";
import { useTransaction } from "./TransactionContext";


const BudgetContext  = createContext()


export const BudgetProvider = ({children})=>{

    // get transaction array from transaction context
 const {transactionArr} = useTransaction()

    // internal state
 const [budget,setBudget] = useState('')
 const [budgetExists,setBudgetExists] = useState(false)
 const [budgetArr,setBudgetArr] = useState([])
 const [exceededBudgetCount,setExceededBudgetCount] = useState(null)


    // useEffect to update exceeded budget count whenever transactionArr or budgetArr changes
      useEffect(()=>{
        if (budgetArr.length > 0){
            let count = 0
            budgetArr.forEach(item =>{
            let expenses =  transactionArr.filter(tx => tx.category === item.category).reduce((acc,curr) => acc + Number(curr.amount),0)
            if(expenses > budget['amount']) count++
            })
            setExceededBudgetCount(count)
        }else if (budgetArr.length === 0) {
              setExceededBudgetCount(null)          
        }
        
    },[transactionArr,budgetArr])

    return(
        <BudgetContext.Provider value={{budget,budgetExists,setBudget,setBudgetExists,budgetArr,setBudgetArr,exceededBudgetCount,setExceededBudgetCount}}>
            {children}
        </BudgetContext.Provider>
    )
}

export const useBudget =  ()=>useContext(BudgetContext)