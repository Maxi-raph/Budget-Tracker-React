import { useState,useMemo, useEffect, useCallback } from "react";
import { useTransaction } from "../context/TransactionContext";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import { format } from "date-fns";
import {DatePicker} from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import "../datepicker.css";


const TransactionList = () => {
    // get transaction context values and handlers
    const {transactionArr,setTransactionArr,prevCategory,setPrevCategory} = useTransaction()

    // internal state
    const [index,setIndex] = useState(null)
    const [transactionType,setTransactionType] = useState('')
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [updatedTransaction,setUpdatedTransaction] = useState({description: "", amount: '', type:'', category: '' ,date: ''})
   
    // function to open modal and set the transaction to be edited
    const openModal = (i,type)=>{
     setIsModalOpen(true)
     setIndex(i)
     setTransactionType(type)

    const transactionToEdit = transactionArr[i];
    setUpdatedTransaction({
        description: transactionToEdit.description || "",
        amount: transactionToEdit.amount || '',
        type: transactionToEdit.type || '',
        category: transactionToEdit.category || '',
        date: transactionToEdit.date || new Date().toLocaleDateString('en-NG')
    });
    }

    // handler to save edited transaction
    const handleSave = (e)=>{
        e.preventDefault()
            let updatedArr = ''
            updatedArr = transactionArr.map((item,i) =>  i === index ? updatedTransaction :item) 
            setPrevCategory(prev => updatedTransaction['type']  == 'Expense' && updatedTransaction['category'])
            setTransactionArr(updatedArr) 
            setIndex(null)
            setIsModalOpen(prev => prev = false)
    }

    //
    const handleDelete = (e)=>{
        e.preventDefault()
        setTransactionArr(prev => prev.filter((item,i) => i !== index))
        setUpdatedTransaction({description: "", amount: '', type:'', category: '' ,date: ''})
        setIsModalOpen(false)
      }

    // handlers for form inputs
    const handleAmountEdit = (e)=>{
        setUpdatedTransaction(prev =>({...prev, amount:e.target.value}))
    }

    const handleCategoryEdit = (e)=>{
        setUpdatedTransaction(prev =>({...prev, category:e.target.value}))
    }

    const handleDescEdit = (e)=>{
        setUpdatedTransaction(prev =>({...prev, description:e.target.value}))
    }

    // function to get category color for transaction label
    const categoryColor = useCallback((category)=>{
        const categoryColorObj = {
        'Rent':'rgba(255, 137, 0, 1)',    
        'Food':'rgba(34, 197, 0,1)',   
        'Utilities':'rgba(59, 130, 246,1)',    
        'Transport':'rgba(20, 184, 166,1)',   
        'Health':'rgba(90, 30, 90,1)',
        'Allowance': 'rgba(255, 69, 0, 1)',     
        'Salary': 'rgba(255, 105, 180, 1)',   
        'Petty Cash': 'rgba(165, 42, 42, 1)', 
        'Bonus': 'rgba(106, 90, 205, 1)',    
        'Other': 'rgba(148, 0, 211, 1)'   
        }
        return categoryColorObj[category]
    },[transactionArr])

    
    return ( 
            <>
            <div className={`${isModalOpen ?'fixed inset-0 flex items-center justify-center z-20 bg-gray-900/80':'hidden'}`}>
                <form onSubmit={(e)=>handleSave(e)} className="bg-gray-400 rounded-2xl w-[90%] max-w-md p-6 shadow-xl dark:bg-gray-800 animate-[fadeIn_0.2s_ease-out]">
                    <h2 className="font-bold mb-6 text-center text-xl">Edit Transaction</h2>
                          <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                            <span className="text-black mb-2 block font-semibold dark:text-white">Date</span>
                            <div>
                                <input type="hidden" value={updatedTransaction.date || ""} required />
                               <DatePicker
                                required className="w-full p-3 font-bold bg-white rounded-lg placeholder:text-gray-400 dark:bg-gray-700 dark:border dark:border-gray-900"
                                placeholderText='Select Date'
                                dateFormat="MMM dd, yyyy"
                                popperClassName="!px-4 !py-2"
                                wrapperClassName="w-full"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                showPopperArrow={false}
                                monthDropdownItemClassName="hover:bg-blue-500 hover:text-white px-3 py-1 rounded"
                                yearDropdownItemClassName="hover:bg-blue-500 hover:text-white px-3 py-1 rounded"
                                selected={updatedTransaction['date']}
                                onChange={(date)=>setUpdatedTransaction(prev =>({...prev, ['date']:date}))}
                                />
                            </div>
                        </div>
                        <div>
                            <span className="text-black mb-2 block font-semibold text dark:text-white">Amount</span>
                            <input required  className="w-full p-3 font-bold bg-white  dark:bg-gray-700 dark:border dark:border-gray-900 rounded-lg placeholder:text-gray-400" placeholder="0.00" type="number"   value={updatedTransaction['amount']} onChange={(e)=>handleAmountEdit(e)}/>
                        </div>
                        <div>
                            <span className="text-black mb-2 block font-semibold dark:text-white">Category</span>
                            {transactionType == 'Expense'
                            ?
                            <select required className="block p-3 font-bold bg-white cursor-pointer  dark:bg-gray-700 dark:border dark:border-gray-900 rounded-lg w-full"   value={updatedTransaction['category']} onChange={(e)=>handleCategoryEdit(e)}>
                                    <option value="" disabled={true}>Choose Category</option>
                                    <option value="Rent" className="font-bold">Rent</option>
                                    <option value="Food" className="font-bold">Food</option>
                                    <option value="Utilities" className="font-bold">Utilities</option>
                                    <option value="Transport" className="font-bold">Transport</option>
                                    <option value="Health" className="font-bold">Health</option>
                            </select>
                            : transactionType == 'Income' ?
                            <select required className="block p-3 font-bold bg-white cursor-pointer  dark:bg-gray-700 dark:border dark:border-gray-900 rounded-lg w-full"   value={updatedTransaction['category']} onChange={(e)=>handleCategoryEdit(e)}>                            
                                    <option value="" disabled={true}>Choose Category</option>                              
                                    <option value="Allowance" className="font-bold">Allowance</option>
                                    <option value="Salary" className="font-bold">Salary</option>
                                    <option value="Petty Cash" className="font-bold">Petty Cash</option>
                                    <option value="Bonus" className="font-bold">Bonus</option>
                                    <option value="Other" className="font-bold">Other</option>
                            </select>
                            : ''
                            }
                        </div>
                        <div>
                            <span className="text-black mb-2 block font-semibold dark:text-white">Description</span>
                            <textarea required className="w-full p-3 font-bold outline-gray-100 bg-white  dark:bg-gray-700 dark:border dark:border-gray-900 rounded-lg placeholder:text-gray-400" placeholder="Groceries..." maxLength={13}  value={updatedTransaction['description']} onChange={(e)=>handleDescEdit(e)}/>
                        </div>  
                      </div>
                        <div className="flex justify-end mt-4 gap-3">
                            <button type='submit' className="px-3 py-2 cursor-pointer flex justify-center gap-2 items-center bg-blue-600 text-white rounded-lg">
                            <FaSave /> Save
                            </button>
                            <button className="px-3 py-2 cursor-pointer flex justify-center gap-2 items-center bg-red-600 text-white rounded-lg" onClick={(e)=>handleDelete(e)}>
                            <FaTrash /> Delete
                            </button>
                        </div>
                </form>
            </div>
            <div className="bg-gray-200 dark:bg-gray-900 rounded-lg shadow-lg lg:w-[60%] sm:w-full">
                <div className="flex justify-around items-center w-full py-2">
                    <span className="text-gray-600 text-sm sm:text-sm font-bold flex-2 text-center dark:text-white">Date</span>
                    <span className="text-gray-600 text-sm sm:text-sm hidden sm:block font-bold flex-4 text-center dark:text-white">Description</span>
                    <span className="text-gray-600 text-sm sm:text-sm block font-bold flex-2 text-center dark:text-white">Category</span>
                    <span className="text-gray-600 text-sm sm:text-sm font-bold flex-3 text-center dark:text-white">Amount</span>
                    <span className="text-gray-600 text-sm sm:text-sm font-bold flex-1 text-center"></span>
                </div>
                {transactionArr.length > 0 && transactionArr.map((item,i) =>
                (<div key={i} className="flex justify-around items-center shadow-2xl  w-full bg-white dark:bg-gray-700 py-3 border-b-2 border-b-gray-200">
                    <span className="text-gray-600 text-sm sm:text-sm font-semibold flex-2 text-center dark:text-white">{format(item['date'], "MMM dd")}</span>
                    <span className="text-gray-600 text-sm sm:text-sm hidden sm:block font-semibold  flex-4 text-center  min-w-0 wrap-break-word leading-relaxed dark:text-white">{item['description']}</span>
                    <span style={{backgroundColor:categoryColor(item['category'])}} className={`p-1 rounded-lg text-white text-sm sm:text-sm block font-semibold  flex-2 text-center dark:text-white`}>{item['category']}</span>
                    <span className={`text-gray-600 text-sm sm:text-sm font-bold  flex-3 text-center  min-w-0 wrap-break-word ${item['type'] == 'Expense'?'text-red-500 dark:text-red-300':'text-green-500 dark:text-green-400'}`}>{item['type'] == 'Expense'?'-':'+'}${Number(item['amount']).toLocaleString()}</span>
                    <div className={`text-gray-600  font-semibold flex-1 rounded-md`}>
                    <span className="flex items-center justify-center px-1 py-1 text-xs rounded-lg border-2 cursor-pointer mr-1 border-gray-400 text-gray-500 dark:text-white dark:border-gray-900" onClick={()=>openModal(i,item['type'] )}><FaEdit className=" inline-block"/>Edit</span>
                    </div>
                </div>)
                )}
            </div>
            </>   

     );
}
 
export default TransactionList;