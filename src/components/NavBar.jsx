import { FaSearch, FaPiggyBank } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useBudget } from "../context/BudgetContext";
import { useTransaction } from "../context/TransactionContext";
import { Link } from "react-router";

const NavBar = () => {
    const {exceededBudgetCount} = useBudget()
    const {isPanelOpen,setIsPanelOpen} = useTransaction()
    return ( <div className="flex justify-between gap-3 shadow-sm items-center p-3  w-full fixed top-0 left-0 sm:pl-0 md:pl-64 lg:pl-64">
        <FiMenu className={`text-gray-800 text-3xl  rounded-sm cursor-pointer  lg:hidden md:hidden ${isPanelOpen?'hidden':'block'}` } onClick={()=>setIsPanelOpen(true)}/>
        <div className="relative w-full pl-2">
        <FaSearch className="absolute cursor-pointer top-3 left-5 text-gray-500"/>
        <input type="text" placeholder="Search transactions, categories..." className="outline-none rounded-md text-gray-900 w-[70%]  p-2 pl-9 bg-white border border-gray-300 shadow-lg sm:w-[80%] md:w-[80%] lg:w-[60%]" />
        </div>
        <div className="flex space-x-4 items-center mr-6 cursor-pointer">
            <img src="" alt="" className="bg-cover rounded-full p-3 bg-black"/>
            <Link to={'/manage_budget'} className="relative">
             <FaPiggyBank className="text-xl"/>
                {exceededBudgetCount > 0 && <span className=" absolute bg-red-500 w-4 h-4 rounded-full -top-2 -right-3 text-xs text-white font-semibold flex justify-center items-center">{exceededBudgetCount}</span>}
            </Link>
        </div>
    </div> );
}
 
export default NavBar;