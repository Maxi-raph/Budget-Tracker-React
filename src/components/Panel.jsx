import {FaWallet, FaTachometerAlt, FaExchangeAlt, FaChartLine, FaCog} from 'react-icons/fa'
import { FiMenu, FiX } from "react-icons/fi";
import NavLinks from './NavLinks'
import { useEffect } from 'react';
import { useTransaction } from '../context/TransactionContext';

export const Panel  = ()=>{

  const{totalIncome,totalExpense,activeLink,setActiveLink,isPanelOpen,setIsPanelOpen} = useTransaction()
    const panelClose = (e)=>{
        if(!isPanelOpen)return
        setIsPanelOpen(false)
    }   

    return(
        <div>
        <div 
        className={isPanelOpen?`fixed top-0 right-0 left-0 bottom-0 bg-black/60 z-10 md:hidden`:'hidden'} onClick={(e)=>panelClose(e)}
        ></div>
        <FiMenu className={`text-gray-800 text-2xl bg-gray-300/90 rounded-sm  cursor-pointer fixed left-3 top-17 lg:hidden md:hidden ${isPanelOpen?'hidden':'block'}` } onClick={()=>setIsPanelOpen(true)}/>
        <div  className={`w-64 fixed top-17 left-0 min-h-screen z-50 bg-white  border-r border-r-gray-300 p-3 lg:top-0 md:top-0  sm:top-17 lg:block md:block transition duration-800 md:translate-x-0 ${isPanelOpen?'translate-x-0':'-translate-x-full'}`}>
                <FiX className='text-gray-800 text-2xl cursor-pointer absolute right-1 top-4  lg:hidden md:hidden  sm:block' onClick={()=>setIsPanelOpen(!isPanelOpen)}/>
            <div className='flex space-x-2 items-center mb-4'>
                <FaWallet className='text-gray-800 text-md sm:text-xl'/> 
                <header className="text-xl font-semibold">Budget Tracker</header>
            </div>
            <NavLinks name={'Dashboard'} icon={<FaTachometerAlt className=' text-md'/>} id={'overview'} setIsPanelOpen={setIsPanelOpen} activeLink={activeLink} setActiveLink={setActiveLink}/>
            <NavLinks name={'Transactions'} icon={<FaExchangeAlt className=' text-md'/>} id={'transactions'} setIsPanelOpen={setIsPanelOpen} activeLink={activeLink} setActiveLink={setActiveLink}/>
            <NavLinks name={'Reports'} icon={<FaChartLine className=' text-md'/>} id={'reports'} setIsPanelOpen={setIsPanelOpen} activeLink={activeLink} setActiveLink={setActiveLink}/>
            <div className='bg-gray-200 rounded-lg p-2 mt-6 shadow-lg block'>
                <h2 className='text-gray-600 font-medium mb-3'>Quick Totals</h2>
                <div className="flex gap-3 flex-col sm:flex-row sm:gap-0 justify-between items-center p-2 rounded-md bg-white  mb-3">
                    <span className='text-gray-600'>Income</span>
                    <span className='font-semibold text-green-500'>${Number(totalIncome).toLocaleString()}</span>
                </div>
                <div className="flex gap-3 flex-col sm:flex-row sm:gap-0 justify-between items-center p-2 rounded-md bg-white  mb-3">
                    <span className='text-gray-600'>Expenses</span>
                    <span className='font-semibold text-red-500'>${Number(totalExpense).toLocaleString()}</span>
                </div>
                <div className="flex gap-3 flex-col sm:flex-row sm:gap-0 justify-between items-center p-2 rounded-md bg-white  mb-3">
                    <span className='text-gray-600'>Balance</span>
                    <span className='font-semibold'>{totalIncome - totalExpense < 0 ? `-$${Math.abs(totalIncome - totalExpense).toLocaleString()}`:`$${(totalIncome - totalExpense).toLocaleString()}`}</span>
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