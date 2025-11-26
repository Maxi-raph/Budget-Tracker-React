import {FaWallet, FaTachometerAlt, FaExchangeAlt, FaChartLine, FaCog} from 'react-icons/fa'
import { FiMenu, FiX } from "react-icons/fi";
import NavLinks from './NavLinks'
import { useEffect,useCallback } from 'react';
import { useTransaction } from '../context/TransactionContext';

export const Panel  = ()=>{

  const{transactionArr,totalIncome,totalExpense,activeLink,setActiveLink,isPanelOpen,setIsPanelOpen} = useTransaction()
    const panelClose = (e)=>{
        if(!isPanelOpen)return
        setIsPanelOpen(false)
    } 
    
    const formatAmount = useCallback((value)=>{
          if (value >= 1000000000000) {
           return `$${(value/1000000000000).toFixed(1)}T`
          }else if (value >= 1000000000) {
           return `$${(value/1000000000).toFixed(1)}B`
          }else if (value >= 1000000) {
           return `$${(value/1000000).toFixed(1)}M`
          }
          else if (value >= 1000) {
           return `$${(value/1000).toFixed(1)}K`
          } 
         return `$${value}`

   },[transactionArr])

    return(
        <div>
        <div 
        className={isPanelOpen?`fixed z-30 top-0 right-0 left-0 bottom-0 bg-black/60 md:hidden`:'hidden'} onClick={(e)=>panelClose(e)}
        ></div>
        <div  className={`w-64 fixed top-0 left-0 min-h-screen z-50 bg-white dark:bg-gray-700  dark:border-r-gray-800 border-r border-r-gray-300 p-3  md:top-0  md:block transition duration-800 md:translate-x-0 ${isPanelOpen?'translate-x-0':'-translate-x-full'}`}>
                <FiX className='text-gray-800 dark:text-white  text-2xl cursor-pointer absolute right-1 top-4  lg:hidden md:hidden  sm:block' onClick={()=>setIsPanelOpen(!isPanelOpen)}/>
            <div className='flex space-x-2 items-center mb-4'>
                <FaWallet className='text-gray-800 dark:text-white text-md sm:text-xl'/> 
                <header className="text-xl font-semibold">Budgetly</header>
            </div>
            <NavLinks name={'Dashboard'} icon={<FaTachometerAlt className=' text-md'/>} id={'dashboard'} setIsPanelOpen={setIsPanelOpen} activeLink={activeLink} setActiveLink={setActiveLink}/>
            <NavLinks name={'Transactions'} icon={<FaExchangeAlt className=' text-md'/>} id={'transactions'} setIsPanelOpen={setIsPanelOpen} activeLink={activeLink} setActiveLink={setActiveLink}/>
            <NavLinks name={'Reports'} icon={<FaChartLine className=' text-md'/>} id={'reports'} setIsPanelOpen={setIsPanelOpen} activeLink={activeLink} setActiveLink={setActiveLink}/>
            <NavLinks name={'Settings'} icon={<FaCog  className="text-md"/>} id={'settings'} setIsPanelOpen={setIsPanelOpen} activeLink={activeLink} setActiveLink={setActiveLink}/>              

            <div className='bg-gray-200 rounded-lg p-2 mt-6 shadow-lg block dark:bg-gray-800'>
                <h2 className='text-gray-600 font-medium mb-3 dark:text-white'>Quick Totals</h2>
                <div className="flex gap-3 flex-col sm:flex-row sm:gap-0 justify-between items-center p-2 rounded-md bg-white  mb-3 dark:bg-gray-600">
                    <span className='text-gray-600 dark:text-white'>Income</span>
                    <span className='font-semibold text-green-500'>{formatAmount(Number(totalIncome))}</span>
                </div>
                <div className="flex gap-3 flex-col sm:flex-row sm:gap-0 justify-between items-center p-2 rounded-md bg-white  mb-3 dark:bg-gray-600">
                    <span className='text-gray-600 dark:text-white'>Expenses</span>
                    <span className='font-semibold text-red-500'>{formatAmount(Number(totalExpense))}</span>
                </div>
                <div className="flex gap-3 flex-col sm:flex-row sm:gap-0 justify-between items-center p-2 rounded-md bg-white mb-3 dark:bg-gray-600">
                    <span className='text-gray-600 dark:text-white'>Balance</span>
                    <span className='font-semibold'>{totalIncome - totalExpense < 0 ? `-${formatAmount(Math.abs(totalIncome - totalExpense))}`:`${formatAmount((totalIncome - totalExpense))}`}</span>
                </div>
            </div>
            <div className="flex flex-col items-center w-full  mt-[100%] gap-4  sm:hidden ">
                <div>
                 <h2 className="font-semibold text-sm text-center">{}Alex Morgan</h2>
                 <h2 className="text-gray-500 text-xs w-full break-all mt-1">{}Chibuzor@gmail.com</h2>
                </div>
                <div className='flex items-center cursor-pointer'>
                <span className=' text-gray-500 text-md'>Settings</span> 
                <FaCog  className="ml-2 text-gray-700 text-md"/>                   
                </div>
            </div>
        </div>
        </div> 
    )
}