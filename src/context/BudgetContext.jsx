import { useState, useContext, createContext, useEffect, useMemo, useRef } from "react";


const BudgetContext  = createContext()


export const BudgetProvider = ({children})=>{
    //Memos
 const day = useMemo(()=>new Date().toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric'
}),[new Date()])

    //States
 const [budget,setBudget] = useState('')
 const [budgetExists,setBudgetExists] = useState(false)
 const [budgetArr,setBudgetArr] = useState([])

    //useRef
    const budgetRef = useRef(null)



    return(
        <BudgetContext.Provider value={{budget,budgetRef,budgetExists,setBudget,budgetExists,setBudgetExists,budgetArr,setBudgetArr}}>
            {children}
        </BudgetContext.Provider>
    )
}

export const useBudget =  ()=>useContext(BudgetContext)