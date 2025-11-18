import { useState, useContext, createContext, useEffect, useMemo, useRef } from "react";


const BudgetContext  = createContext()


export const BudgetProvider = ({children})=>{

    //States
 const [budget,setBudget] = useState('')
 const [budgetExists,setBudgetExists] = useState(false)
 const [budgetArr,setBudgetArr] = useState([])
 const [exceededBudgetCount,setExceededBudgetCount] = useState(null)


    //useRef
    const budgetRef = useRef(null)



    return(
        <BudgetContext.Provider value={{budget,budgetRef,budgetExists,setBudget,budgetExists,setBudgetExists,budgetArr,setBudgetArr,exceededBudgetCount,setExceededBudgetCount}}>
            {children}
        </BudgetContext.Provider>
    )
}

export const useBudget =  ()=>useContext(BudgetContext)