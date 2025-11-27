import { FaSearch, FaChartPie } from "react-icons/fa";
import {HiOutlineSun, HiOutlineMoon} from 'react-icons/hi2'
import { FiMenu } from "react-icons/fi";
import { useBudget } from "../context/BudgetContext";
import { useTransaction } from "../context/TransactionContext";
import { Link } from "react-router";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

const NavBar = () => {
    const {exceededBudgetCount} = useBudget()
    const {isPanelOpen,setIsPanelOpen} = useTransaction()
    const {toggleTheme,theme} = useTheme()
    const [isToolTip,setIsToolTip] =useState({'input':false, 'manageBudget':false})
    const [searchInput,setSearchInput] = useState('')

    const showToolTip = (e)=>{
      const name = e.currentTarget?.dataset?.name
      if(!name) return

    setIsToolTip(prev => ({'input':false, 'manageBudget':false, [name]:true}) )  
    } 

    const hideToolTip = ()=> setIsToolTip(prev => ({'input':false, 'manageBudget':false}))
    const handleSearch = (e)=>{
      setSearchInput(e.target.value)
    }




    return ( <div className="flex justify-between gap-3 shadow-sm items-center p-3  w-full fixed z-20 top-0 left-0 sm:pl-0 md:pl-64 lg:pl-64 bg-gray-100/30 dark:bg-gray-900/30 backdrop-blur-xs">
        <FiMenu className={`text-gray-800 text-4xl  rounded-sm cursor-pointer dark:text-white  lg:hidden md:hidden ${isPanelOpen?'hidden':'block'}` } onClick={()=>setIsPanelOpen(true)}/>
        <div className="relative w-full pl-2">
        <FaSearch className="absolute cursor-pointer top-3 left-5 text-gray-500 dark:text-black" />
        <input type="text" data-name='input' placeholder="Search transactions, categories..." className="outline-none rounded-md text-gray-900  dark:bg-gray-100 dark:placeholder:text-black p-2 pl-9 bg-white border border-gray-300 shadow-lg text-sm sm:text-md w-[84%] md:w-[60%]"
         value={searchInput}
         onMouseEnter={(e)=>showToolTip(e)}
         onMouseLeave={hideToolTip}
         onChange={(e)=>handleSearch(e)}/>
        <span className={`absolute block py-1 px-2 bg-gray-100 rounded-lg shadow-lg -bottom-9 text-gray-700 transition-all duration-500 ${isToolTip['input'] ? 'opacity-100' : 'opacity-0'}`}>Search transactions by date</span>
        </div>
        <div className="flex space-x-4 items-center mr-6 cursor-pointer">
            <button onClick={toggleTheme} className='cursor-pointer'>
              {
              theme === 'light'             
                ? <HiOutlineSun className="text-3xl text-yellow-500" />
                : <HiOutlineMoon className="text-2xl text-gray-500 dark:text-white" />
              }
            </button>

            <Link to={'/manage_budget'}>
              <div data-name='manageBudget'  className="relative" onMouseEnter={(e)=>showToolTip(e)} onMouseLeave={hideToolTip}>
                <FaChartPie  className="text-2xl"/>
                <span className={`absolute block w-38 text-center py-1 px-2 bg-gray-100 rounded-lg shadow-lg -bottom-10 right-0 text-gray-700 transition-all duration-500 ${isToolTip['manageBudget'] ? 'opacity-100' : 'opacity-0'}`}>Manage Budgets</span>
                {exceededBudgetCount && <span className=" absolute bg-red-500 w-4 h-4 rounded-full -top-2 -right-3 text-xs text-white font-semibold flex justify-center items-center">{exceededBudgetCount}</span>}
              </div>
            </Link>
        </div>
    </div> );
}
 
export default NavBar;