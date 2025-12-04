import {FaPlus} from 'react-icons/fa'
import { useTransaction } from '../../context/TransactionContext';
import TransactionList from '../TransactionList';
import { useState, useEffect } from 'react';
import {DatePicker} from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import "../../datepicker.css";


const Transactions = () => {
   // transaction values and handlers gotten from transaction context
   const {
    transaction,setTransaction,chooseType,handleTypeClick,handleAmt,
    selectCategory,handleDesc,addTransaction} = useTransaction()
    
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

   return ( <div className=" max-w-5xl mx-auto p-5 rounded-lg bg-white dark:bg-gray-700 shadow-lg" id="transactions">
        <h2  className="font-semibold text-lg mb-4">Transactions</h2>
        <div className="flex flex-col-reverse gap-6 lg:flex-row lg:items-start sm:flex-col-reverse sm:items-center">
            <TransactionList />
            <div className="bg-gray-200  dark:bg-gray-600  rounded-lg shadow-lg lg:w-[40%] p-3 sm:w-full">
                <div className="sm:flex justify-around items-center">
                    <h2 className="font-semibold text-md mb-4">Add Transaction</h2>
                    <div className="flex justify-end mb-4 sm:justify-start sm:mb-0">
                        <span data-name='Expense' className={`block p-2 text-sm border border-gray-400  dark:border-gray-900 rounded-l-sm rounded-tl-sm cursor-pointer font-medium ${!chooseType?'bg-gray-50  dark:bg-gray-800':''}`} onClick={(e)=>handleTypeClick(e)}>Expense</span>
                        <span data-name='Income' className={`block p-2 text-sm border border-gray-400 dark:border-gray-900 rounded-r-sm rounded-br-sm cursor-pointer font-medium ${chooseType?'bg-gray-50 dark:bg-gray-800':''}`} onClick={(e)=>handleTypeClick(e)}>Income</span>
                    </div>
                </div>
                <form onSubmit={(e)=>addTransaction(e)}>
                    <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <input type="hidden" value={transaction.date || ""} required />
                        <span className="text-gray-400 dark:text-white mb-3 block font-semibold text">Date  <span className="inline-block text-red-400 font-semibold">*</span></span>
                        <DatePicker
                          required className="w-full p-3 font-bold bg-white dark:text-white dark:bg-gray-600 dark:border-gray-900 dark:border rounded-lg  dark:placeholder:text-white  placeholder:text-gray-400"
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
                          selected={transaction['date']}
                          onChange={(date)=>setTransaction(prev =>({...prev, ['date']:date}))}
                        />
                    </div>
                    <div>
                        <span className="text-gray-400 dark:text-white mb-3 block font-semibold text">Amount  <span className="inline-block text-red-400 font-semibold">*</span></span>
                        <input required className="w-full p-3 font-bold bg-white dark:text-white dark:placeholder:text-white  dark:bg-gray-600 dark:border-gray-900 dark:border rounded-lg placeholder:text-gray-400" placeholder="0.00" type="number"  value={transaction['amount']} onChange={(e)=>handleAmt(e)}/>
                    </div>
                    <div>
                        <span className="text-gray-400 dark:text-white mb-3 block font-semibold text">Category  <span className="inline-block text-red-400 font-semibold">*</span></span>
                           {!chooseType
                           ?
                        <select required className="block p-3 font-bold bg-white  dark:bg-gray-800 dark:border-gray-900  dark:border cursor-pointer  rounded-lg w-full" value={transaction['category']} onChange={(e)=>selectCategory(e)}>
                                <option value="" disabled={true}>Choose Category</option>
                                <option value="Rent" className="font-bold">Rent</option>
                                <option value="Food" className="font-bold">Food</option>
                                <option value="Utilities" className="font-bold">Utilities</option>
                                <option value="Transport" className="font-bold">Transport</option>
                                <option value="Health" className="font-bold">Health</option>
                        </select>
                           :
                        <select required className="block p-3 font-bold bg-white  dark:bg-gray-800 dark:border-gray-900 dark:border cursor-pointer rounded-lg w-full" value={transaction['category']} onChange={(e)=>selectCategory(e)}>                            
                                <option value="" disabled={true}>Choose Category</option>                              
                                <option value="Allowance" className="font-bold">Allowance</option>
                                <option value="Salary" className="font-bold">Salary</option>
                                <option value="Petty Cash" className="font-bold">Petty Cash</option>
                                <option value="Bonus" className="font-bold">Bonus</option>
                                <option value="Other" className="font-bold">Other</option>
                        </select>
                           }
                    </div>
                    <div>
                        <span className="text-gray-400 mb-3 block font-semibold  dark:text-white">Description  <span className="inline-block text-red-400 font-semibold">*</span></span>
                        <textarea required className="w-full p-3 font-bold outline-gray-100 bg-white rounded-lg  dark:bg-gray-800 dark:border-gray-900 dark:border   dark:placeholder:text-white placeholder:text-gray-400" placeholder="Groceries..." maxLength={20} value={transaction['description']}  onChange={(e)=>handleDesc(e)}/>
                    </div>  
                </div>
                <button  type='submit' className="w-full p-2 bg-gray-900 text-white cursor-pointer  rounded-lg shadow-lg mt-4 flex justify-center items-center gap-2"><FaPlus />Add {chooseType?'Income':'Expense'}</button>
                </form>
            </div>
        </div>
    </div> );
}
 
export default Transactions;