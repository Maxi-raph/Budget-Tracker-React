import { useState,useMemo } from "react";
import { useTransaction } from "../context/TransactionContext";
import { FaEdit, FaSave } from "react-icons/fa";


const TransactionList = () => {
     const day = useMemo(()=>new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }),[new Date()])
    const {transactionArr,setTransactionArr} = useTransaction()
    const [editFlag,setEditFlag] = useState()
    const [index,setIndex] = useState(null)
    const [transactionType,setTransactionType] = useState('')
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [updatedTransaction,setUpdatedTransaction] = useState({description: "", amount: '', type: useMemo(()=>transactionType,[transactionType]), category: '' ,date: day})
   
    const openModal = (i,type)=>{
     setIsModalOpen(true)
     setIndex(i)
     setTransactionType(type)
    }

    const handleSave = (e)=>{
        e.preventDefault()
        setUpdatedTransaction(prev =>({...prev,type:transactionType}))
        console.log(updatedTransaction);
        
        let valid = true
        Object.entries(updatedTransaction).forEach(([key,val])=>{
            if(val == ''){
              valid = false
              return
            }  
        })
        if (valid) {
            let updatedArr = ''
            updatedArr = transactionArr.map((item,i) =>  i === index ? updatedTransaction :item) 
            setTransactionArr(updatedArr) 
            setIndex(null)
            setIsModalOpen(prev => prev = false)
            setTimeout(()=>
             setUpdatedTransaction(prev => prev = {description: "", amount: '', type: '', category: '' ,date: day})
                ,4000)
        }
    }

    const handleAmountEdit = (e)=>{
        setUpdatedTransaction(prev =>({...prev, amount:e.target.value}))
    }

    const handleCategoryEdit = (e)=>{
        setUpdatedTransaction(prev =>({...prev, category:e.target.value}))
    }

    const handleDescEdit = (e)=>{
        setUpdatedTransaction(prev =>({...prev, description:e.target.value}))
    }
    
    return ( 
            <>
            <div className={`${isModalOpen ?'fixed inset-0 flex items-center justify-center z-20 bg-gray-900/80 ':'hidden'}`}>
                <div className="bg-gray-400 rounded-2xl w-[90%] max-w-md p-6 shadow-xl animate-[fadeIn_0.2s_ease-out]">
                    <h2 className="font-bold mb-6 text-center text-xl">Edit Transaction</h2>
                    <form onSubmit={(e)=>handleSave(e)}>
                          <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                            <span className="text-black mb-2 block font-semibold text">Date</span>
                            <span className="block p-3 font-bold bg-white rounded-lg">{day}</span>
                        </div>
                        <div>
                            <span className="text-black mb-2 block font-semibold text">Amount</span>
                            <input required  className="w-full p-3 font-bold bg-white rounded-lg placeholder:text-gray-400" placeholder="0.00" type="number"   value={updatedTransaction['amount']} onChange={(e)=>handleAmountEdit(e)}/>
                        </div>
                        <div>
                            <span className="text-black mb-2 block font-semibold text">Category</span>
                            {transactionType == 'Expense'
                            ?
                            <select required className="block p-3 font-bold bg-white cursor-pointer  rounded-lg w-full"   value={updatedTransaction['category']} onChange={(e)=>handleCategoryEdit(e)}>
                                    <option value="" disabled={true}>Choose Category</option>
                                    <option value="Rent" className="font-bold">Rent</option>
                                    <option value="Food" className="font-bold">Food</option>
                                    <option value="Utilities" className="font-bold">Utilities</option>
                                    <option value="Transport" className="font-bold">Transport</option>
                                    <option value="Health" className="font-bold">Health</option>
                            </select>
                            : transactionType == 'Income' ?
                            <select required className="block p-3 font-bold bg-white cursor-pointer rounded-lg w-full"   value={updatedTransaction['category']} onChange={(e)=>handleCategoryEdit(e)}>                            
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
                            <span className="text-black mb-2 block font-semibold text">Description</span>
                            <textarea required className="w-full p-3 font-bold outline-gray-100 bg-white rounded-lg placeholder:text-gray-400" placeholder="Groceries..." maxLength={13}  value={updatedTransaction['description']} onChange={(e)=>handleDescEdit(e)}/>
                        </div>  
                        <div className="flex justify-end mt-4">
                            <button type='submit' className="px-3 py-2 cursor-pointer flex justify-center gap-2 items-center bg-blue-600 text-white rounded-lg">
                            <FaSave /> Save
                            </button>
                        </div>
                      </div>
                    </form>
                </div>
            </div>
            <div className="bg-gray-200 rounded-lg shadow-lg lg:w-[60%] sm:w-full">
                <div className="flex justify-around items-center w-full py-2">
                    <span className="text-gray-600 text-sm sm:text-sm font-bold flex-3 text-center">Date</span>
                    <span className="text-gray-600 text-sm sm:text-sm hidden sm:block font-bold flex-3 text-center">Description</span>
                    <span className="text-gray-600 text-sm sm:text-sm block font-bold flex-3 text-center">Category</span>
                    <span className="text-gray-600 text-sm sm:text-sm font-bold flex-3 text-center">Amount</span>
                    <span className="text-gray-600 text-sm sm:text-sm font-bold flex-1 text-center"></span>
                </div>
                {transactionArr.length > 0 && transactionArr.map((item,i) =>
                (<div key={i} className="flex justify-around items-center  w-full bg-white py-3 border-b-2 border-b-gray-200">
                    <span className="text-gray-600 text-sm sm:text-sm font-semibold flex-3 text-center">{item['date']}</span>
                    <span className="text-gray-600 text-sm sm:text-sm hidden sm:block font-semibold  flex-3 text-center  min-w-0 wrap-break-word leading-relaxed">{item['description']}</span>
                    <span className={`text-gray-600 text-sm sm:text-sm block font-semibold  flex-3 text-center p- rounded-md bg`}>{item['category']}</span>
                    <span className={`text-gray-600 text-sm sm:text-sm font-bold  flex-3 text-center  min-w-0 wrap-break-word ${item['type'] == 'Expense'?'text-red-500':'text-green-500'}`}>{item['type'] == 'Expense'?'-':'+'}${Number(item['amount']).toLocaleString()}</span>
                    <div className={`text-gray-600  font-semibold flex-1 rounded-md`}>
                    <span className="flex items-center justify-center px-1 text-xs rounded-lg border-2 cursor-pointer border-gray-400 text-gray-500" onClick={()=>openModal(i,item['type'] )}><FaEdit className=" inline-block"/>Edit</span>
                    </div>
                </div>)
                )}
            </div>
            </>
     );
}
 
export default TransactionList;