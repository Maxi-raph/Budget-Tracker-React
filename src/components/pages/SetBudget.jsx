import { useEffect, useRef, useState } from 'react';
import {FaPlus, FaInfo} from 'react-icons/fa'
import BudgetList from '../BudgetList';
import { useBudget } from '../../context/BudgetContext';
import { useTransaction}from '../../context/TransactionContext';


const SetBudget = () => {
    const {budgetArr,setBudgetArr,setExceededBudgetCount} = useBudget()
    const {transactionArr} = useTransaction()
    const [budgetDetails,setBudgetDetails] = useState({category:'',amount:''})
    const [warning,setWarning] = useState(false)
    const [isAwake,setIsAwake] = useState(false)
    const categorySelectRef = useRef()

    const handleCategoryChange = (e)=>{
        setBudgetDetails(prev=>({...prev,[e.target.name]:e.target.value}))
        setWarning(false)
    }

    const handleAmountChange = (e)=>{
       setBudgetDetails(prev=>({...prev,[e.target.name]:e.target.value}))
    }

    const addCategory = (e)=>{
        e.preventDefault()
        const categoryExists = budgetArr.some(item=>item['category'] == budgetDetails['category'])
        if (categoryExists) {
            setWarning(true)
        }
        else if(budgetDetails['category'] && budgetDetails['amount']){
            setWarning(false)
            setBudgetArr(prev=>[...prev, budgetDetails])
            setBudgetDetails(prev=>({...prev,['amount']:'',['category']:''}))
            categorySelectRef.current.selectedIndex = 0
        }
    }

    useEffect(()=>{
      const handleVisibility = ()=>{
        if (document.visibilityState === 'visible') {
          setIsAwake(prev => !prev)     
        }
      }

      document.addEventListener('visibilitychange',handleVisibility)  
      return ()=>  document.removeEventListener('visibilitychange',handleVisibility)  
    },[])

    useEffect(()=>{
        if (budgetArr.length > 0) {
            let count = null
            budgetArr.forEach(budget =>{
            let expenses =  transactionArr.filter(item => item.category === budget.category).reduce((acc,curr) => acc + Number(curr.amount),0)
            if(expenses > budget['amount']) count++
            })
            setExceededBudgetCount(count)
        }
        
    },[transactionArr,budgetArr])

    return (    
    <>
    <div className="max-w-5xl mx-auto p-5 rounded-lg bg-white shadow-lg scroll-mt-22" id="overview">
        <h2 className='font-bold mb-3 text-xl'>Set Budget</h2>
        <span className="text-gray-400 mb-6 block md:font-semibold">Add Categories and amounts below. Amounts must be numeric: required fields are marked</span>
        <form onSubmit={(e)=>addCategory(e)} className=" gap-6 grid grid-cols-1 mb-3  lg:flex lg:w-full">
            <div className="lg:w-[40%]">
                <span className="text-gray-600 mb-1 block md:font-semibold">Budget Category <span className="inline-block text-red-400 font-semibold">*</span></span>
                <select required ref={categorySelectRef} name='category' className="block p-2 font-bold border border-gray-400 cursor-pointer rounded-lg w-full" value={budgetDetails['category']} onChange={(e)=>handleCategoryChange(e)}>
                                <option value="" disabled={true}>Choose Category</option>
                                <option value="Rent" className="font-bold">Rent</option>
                                <option value="Food" className="font-bold">Food</option>
                                <option value="Utilities" className="font-bold">Utilities</option>
                                <option value="Transport" className="font-bold">Transport</option>
                                <option value="Health" className="font-bold">Health</option>
                </select>
            </div>
            <div className="lg:w-[40%]">
                <span className="text-gray-600 mb-1 block md:font-semibold">Amount <span className="inline-block text-red-400 font-semibold">*</span></span>
                <input required name='amount' type="number" className="block p-2 font-bold border border-gray-400 cursor-pointer rounded-lg w-full" value={budgetDetails['amount']} onChange={(e)=>handleAmountChange(e)}/>
            </div>
            <button className=" bg-gray-300 cursor-pointer p-2 font-semibold rounded-lg" type='submit'><FaPlus className='mr-2 inline-block'/>Add Category</button>
        </form>
        <p className={`p-2 rounded-lg flex items-center bg-gray-200 mt-6  md:font-semibold ${warning?'text-red-500':'text-gray-400'}`}><FaInfo className={`text-md inline-block ml-2 mr-2 border-2 border-gray-400 rounded-full ${warning?'border-red-500':'border-gray-400'}`}/>{warning?'Category has already been set, edit below':'Each category can only be added once'}.</p>
    </div> 
    <BudgetList setWarning={setWarning}/>
    </>);
}
 
export default SetBudget;