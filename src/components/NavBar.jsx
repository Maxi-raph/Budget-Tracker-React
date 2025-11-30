import { FaSearch, FaChartPie } from "react-icons/fa";
import {HiOutlineSun, HiOutlineMoon} from 'react-icons/hi2'
import { FiMenu } from "react-icons/fi";
import { useBudget } from "../context/BudgetContext";
import { useTransaction } from "../context/TransactionContext";
import { Link } from "react-router";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import { format } from "date-fns";
import FilteredList from "./FilteredList";

const NavBar = () => {
    const {exceededBudgetCount} = useBudget()
    const {isPanelOpen,setIsPanelOpen,transactionArr} = useTransaction()
    const {toggleTheme,theme} = useTheme()
    const [isToolTip,setIsToolTip] =useState({'input':false, 'manageBudget':false})
    const [searchInput,setSearchInput] = useState('')

    const showToolTip = (e)=>{
      const name = e.currentTarget?.dataset?.name
      if(!name) return

    setIsToolTip(prev => ({'input':false, 'manageBudget':false, [name]:true}) )  
    setTimeout(hideToolTip, 1500);
    } 

    const hideToolTip = ()=> setIsToolTip(prev => ({'input':false, 'manageBudget':false}))
    const handleSearch = (e)=>{
      setSearchInput(e.target.value)
    }

    const filterByTransactionDate = transactionArr.filter(item => searchInput.trim() && format(item.date, 'MMM dd').toLowerCase().includes(searchInput.toLowerCase())).sort((a,b)=> format(a.date, 'MMM dd').slice(4) - format(b.date, 'MMM dd').slice(4))

    return ( <div className="flex justify-between gap-3 shadow-sm items-center p-3  w-full fixed z-20 top-0 left-0 sm:pl-0 md:pl-64 lg:pl-64 bg-gray-100/30 dark:bg-gray-900/30 backdrop-blur-xs">
        <FiMenu className={`text-gray-800 text-4xl  rounded-sm cursor-pointer dark:text-white  lg:hidden md:hidden ${isPanelOpen?'hidden':'block'}` } onClick={()=>setIsPanelOpen(true)}/>
        <div className="relative w-full pl-2">
        <FaSearch className="absolute cursor-pointer top-3 left-5 text-gray-500 dark:text-black" />
        <input type="text" data-name='input' placeholder="Search transactions..." className="outline-none rounded-md text-gray-900 placeholder:text-sm  dark:bg-gray-100 dark:placeholder:text-black p-1 md:p-2 pl-9 bg-white border border-gray-300 shadow-lg text-md w-[90%] md:w-[60%]"
         value={searchInput}
         onMouseEnter={(e)=>showToolTip(e)}
         onMouseLeave={hideToolTip}
         onTouchStart={(e)=>showToolTip(e)}
         onChange={(e)=>handleSearch(e)}/>
        <span className={`absolute z-32 block py-1 px-2 bg-gray-100 dark:text-white dark:bg-gray-600 rounded-lg shadow-lg -bottom-9 text-gray-700 transition-all duration-500 ${isToolTip['input'] ? 'opacity-100' : 'opacity-0'}`}>Search transactions by day</span>
        <FilteredList filterByTransactionDate={filterByTransactionDate}/>
        </div>
        <div className="flex space-x-4 items-center mr-6 cursor-pointer">
            <button onClick={toggleTheme} className='cursor-pointer'>
              {
              theme === 'dark'             
                ? <HiOutlineSun className="text-3xl text-yellow-500" />
                : <HiOutlineMoon className="text-2xl text-gray-500 dark:text-white" />
              }
            </button>

              <div className="relative">
                <Link to={'/manage_budgets'} 
                data-name='manageBudget'   
                onMouseEnter={(e)=>showToolTip(e)} 
                onMouseLeave={hideToolTip}
                onTouchStart={(e)=>showToolTip(e)}>
                  <FaChartPie  className="text-2xl"/>
                  <span className={`pointer-events-none absolute block w-38 text-center py-1 px-2 bg-gray-100 dark:text-white dark:bg-gray-600 rounded-lg shadow-lg -bottom-12 right-0 text-gray-700 transition-all duration-500 ${isToolTip['manageBudget'] ? 'opacity-100' : 'opacity-0'}`}>Manage Budgets</span>
                  {exceededBudgetCount && <span className=" absolute bg-red-500 w-4 h-4 rounded-full -top-2 -right-3 text-xs text-white font-semibold flex justify-center items-center ">{exceededBudgetCount}</span>}
                </Link>              
              </div>
        </div>
    </div> );
}
 
export default NavBar;