import { FaSearch, FaChartPie } from "react-icons/fa";
import {HiOutlineSun, HiOutlineMoon} from 'react-icons/hi2'
import { FiMenu } from "react-icons/fi";
import { useBudget } from "../context/BudgetContext";
import { useTransaction } from "../context/TransactionContext";
import { Link } from "react-router";
import { useTheme } from "../context/ThemeContext";

const NavBar = () => {
    const {exceededBudgetCount} = useBudget()
    const {isPanelOpen,setIsPanelOpen} = useTransaction()
    const {toggleTheme,theme} = useTheme()
    return ( <div className="flex justify-between gap-3 shadow-sm items-center p-3  w-full fixed z-20 top-0 left-0 sm:pl-0 md:pl-64 lg:pl-64 bg-gray-100/30 dark:bg-gray-900/30 backdrop-blur-xs">
        <FiMenu className={`text-gray-800 text-4xl  rounded-sm cursor-pointer dark:text-white  lg:hidden md:hidden ${isPanelOpen?'hidden':'block'}` } onClick={()=>setIsPanelOpen(true)}/>
        <div className="relative w-full pl-2">
        <FaSearch className="absolute cursor-pointer top-3 left-5 text-gray-500 dark:text-black"/>
        <input type="text" placeholder="Search transactions, categories..." className="outline-none rounded-md text-gray-900  dark:bg-gray-100 dark:placeholder:text-black p-2 pl-9 bg-white border border-gray-300 shadow-lg text-sm sm:text-md w-[84%] md:w-[60%]" />
        </div>
        <div className="flex space-x-4 items-center mr-6 cursor-pointer">
            <button onClick={toggleTheme} className='cursor-pointer'>
              {
              theme === 'light'             
                ? <HiOutlineSun className="text-3xl text-yellow-500" />
                : <HiOutlineMoon className="text-2xl text-gray-500 dark:text-white" />
              }
            </button>

            <Link to={'/manage_budget'} className="relative">
             <FaChartPie className="text-2xl"/>
                {exceededBudgetCount && <span className=" absolute bg-red-500 w-4 h-4 rounded-full -top-2 -right-3 text-xs text-white font-semibold flex justify-center items-center">{exceededBudgetCount}</span>}
            </Link>
        </div>
    </div> );
}
 
export default NavBar;