import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";
import { useBudget } from "../context/BudgetContext";
import { useTransaction } from "../context/TransactionContext";

const BudgetList = ({setWarning}) => {
//useContext
const {transactionArr} = useTransaction()
const {budgetArr,setBudgetArr,setExceededBudgetCount} = useBudget() 
// useState
const [editFlag,setEditFlag] = useState({0:false, 1:false,2:false,3:false,4:false})
const [categoryToEditValue,setCategoryToEditValue] = useState('')

// handlers for form inputs
const handleBudgetChange = (e,index)=>{
    setCategoryToEditValue(prev =>{
        prev = e.target.value
        budgetArr[index]['amount'] = prev
    }) 
    
}

const handleEdit =(i)=>{
    setEditFlag(prev=>({...prev, [i]:true}))
    setCategoryToEditValue(budgetArr[i]['amount'])
}

// handler to save edited budget amount
const handleSave =(i)=>{
     setEditFlag(prev=>({...prev, [i]:false}))
     setCategoryToEditValue('')
        if (budgetArr.length > 0) {
            let count = null
            budgetArr.forEach(budget =>{
            let expenses =  transactionArr.filter(item => item.category === budget.category).reduce((acc,curr) => acc + Number(curr.amount),0)
            if(expenses > budget['amount']) count++
            })
            setExceededBudgetCount(count)
        }else if (budgetArr.length === 0) {
              setExceededBudgetCount(null)          
        }
}
// handler to delete budget category
const handleDelete = (category)=>{
     let newArr = [...budgetArr]
    newArr = newArr.filter(item =>item['category'] !== category)
    setBudgetArr(prev=>prev = newArr)
    setWarning(false)
}


    return ( 
    <div className="mb-2">
    <div className="max-w-5xl justify-between items-center mx-auto p-3 rounded-tl-lg rounded-tr-lg bg-gray-300 dark:bg-gray-900  mt-8 flex">
    <span className="text-gray-800 dark:text-white font-semibold md:flex-10">Category</span>
    <span className="text-gray-800 dark:text-white font-semibold md:flex-8">Amount</span>
    <span className="text-gray-800 dark:text-white font-semibold md:flex-3">Actions</span>
    </div>  
    {budgetArr.length > 0 &&
        budgetArr.map((list,i)=>(
            <div key={i} className="max-w-5xl justify-between items-center mx-auto p-3 bg-white border-b-2 border-gray-300 dark:bg-gray-700 flex">
            <span className="text-gray-800 dark:text-white font-semibold flex-1 ml-3">{list['category']}</span>
            {editFlag[i]
            ?<input type="number" autoFocus={true} className="bg-slate-100  p-1 pl-3 rounded-lg w-30 flex-1 outline-none border border-gray-400 dark:bg-gray-900" placeholder="$0" value={categoryToEditValue} onChange={(e)=>handleBudgetChange(e,i)}/>
            :<span className="text-gray-800 dark:text-white font-semibold flex-1 text-center min-w-0 wrap-break-word">${Number(list['amount']).toLocaleString()}</span>
            }
            <div className="text-gray-800 dark:text-white font-semibold flex-1 justify-end gap-2 flex">
                {!editFlag[i]
                ? <span className="flex items-center px-1 text-sm rounded-lg border-2 cursor-pointer border-gray-400 dark:border-gray-900 text-gray-500 dark:text-white" onClick={()=>handleEdit(i)}><FaEdit className="mr-1 inline-block"/>Edit</span>
                : <span className="flex items-center px-1 text-sm rounded-lg border-2 cursor-pointer border-gray-400 dark:border-gray-900 text-gray-500 dark:text-white" onClick={()=>handleSave(i)}><FaSave className="mr-1 inline-block"/>save</span>
                }
                <span className="flex items-center px-1 text-sm rounded-lg border-2 cursor-pointer border-gray-400 text-red-500 dark:text-red-400  dark:border-gray-900" onClick={()=>handleDelete(list['category'])}><FaTrash className="mr-1 inline-block"/>Del</span>
            </div>
            </div> 
        ))
    }  
    </div>
 );
}
 
export default BudgetList;