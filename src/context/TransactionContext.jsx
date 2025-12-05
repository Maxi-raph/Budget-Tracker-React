import { useState, useCallback, useContext, createContext, useEffect } from "react";


const TransactionContext  = createContext()


export const TransactionProvider = ({children})=>{

    //internal state
 const [chooseType,setChooseType]  = useState(false)
 const [transaction, setTransaction] = useState({description: "", amount: '', type: "Expense", category: '' ,date: ''})
 const [transactionArr, setTransactionArr] = useState([])
 const [totalIncome,setTotalIncome] = useState(null)
 const [totalExpense,setTotalExpense] = useState(null)
 const [recurringBills,setRecurringBills] = useState(0)
 const [largestCategory,setLargestCategory] = useState('')
 const [activeLink,setActiveLink] = useState({'dashboard':true,'transactions':false,'reports':false})
 const [isPanelOpen,setIsPanelOpen] = useState(false) 
 const [prevCategory,setPrevCategory] = useState(null)

  //handler functions for form inputs
 const handleTypeClick =(e)=>{
    setTransaction(prev => ({
      ...prev, 
      category:"",
      type: e.target.dataset.name,
      description: "", 
      amount: "",
      date: ''
    }));
 

     if(e.target.dataset.name == 'Expense'){
      setChooseType(false)
     }else{
      setChooseType(true)
     }
 }
 const handleAmt =(e)=>  setTransaction(prev=>({...prev,['amount']:e.target.value}))
 const selectCategory = (e)=>  setTransaction(prev=>({...prev,['category']:e.target.value}))
 const handleDesc =  (e)=>  setTransaction(prev=>({...prev,['description']:e.target.value}))

 // function to add a new transaction
 const addTransaction = useCallback((e) => {
  e.preventDefault()
  const newObj = { ...transaction };
  let valid = true;
  
  Object.entries(newObj).forEach(([key, val]) => {
    if (key !== 'date' && val === '') valid = false;
  });
  
    if (!newObj.date || isNaN(newObj.date.getTime())) valid = false

   if (!valid) return

  if (valid) {
    setPrevCategory(prev => transaction['type']  == 'Expense' && transaction['category'])
    setTransactionArr(prev => [...prev, transaction]);
    setTransaction(prev => ({
      ...prev, 
      category:"",
      description: "", 
      amount: "",
      date: ''
    }));
 
  }
}, [transaction]);

    // useEffect to update total income, total expense, largest expense category, and recurring bills whenever transactionArr changes
    useEffect(()=>{
        setTotalIncome(transactionArr.filter(item =>item['type'] == 'Income').reduce((acc,curr)=> acc +  parseInt(curr['amount']),0))
        setTotalExpense(transactionArr.filter(item =>item['type'] == 'Expense').reduce((acc,curr)=> acc + parseInt(curr['amount']),0))  
        setLargestCategory(()=>{
        let maxFreq = 0
        let category = ''
        let obj = {}
         transactionArr.filter(item =>item['type'] == 'Expense').map(item=>{
            obj[item['category']] = (obj[item['category']]||0) + 1
        })
        Object.entries(obj).forEach(([key,val])=>{
            if(val > 1 && val > maxFreq){
            maxFreq = val
            category = key
            }
        })
         return (category||'—')
        })  

        setRecurringBills(()=>{
        let maxFreq = 0
        let amount = ''
        let obj = {}
         transactionArr.filter(item =>item['type'] == 'Expense').map(item=>{
            obj[item['amount']] = (obj[item['amount']]||0) + 1
        })
        Object.entries(obj).forEach(([key,val])=>{
            if(val > 1 && val > maxFreq){
            maxFreq = val
            amount = key
            }
        })
         return (amount||0)
        })  

        },[transactionArr])

    return(
        <TransactionContext.Provider value={{
        transaction,setTransaction,chooseType,handleTypeClick,handleAmt,selectCategory,
        handleDesc,addTransaction,transactionArr,setTransactionArr,totalIncome,
        totalExpense,largestCategory,recurringBills,activeLink,
        setActiveLink,isPanelOpen,setIsPanelOpen,prevCategory,setPrevCategory}}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransaction =  ()=>useContext(TransactionContext)