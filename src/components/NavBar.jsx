import { FaSearch, FaCog } from "react-icons/fa";

const NavBar = () => {
    return ( <div className="flex justify-between gap-3 shadow-sm items-center p-3  w-full fixed top-0 left-0 sm:pl-0 md:pl-64 lg:pl-64">
        <div className="relative w-full pl-2">
        <FaSearch className="absolute cursor-pointer top-3 left-5 text-gray-500"/>
        <input type="text" placeholder="Search transactions, categories..." className="outline-none rounded-md text-gray-900 w-[70%]  p-2 pl-9 bg-white border border-gray-300 shadow-lg sm:w-[80%] md:w-[80%] lg:w-[60%]" />
        </div>
        <div className="flex space-x-4 items-center sm:min-w-[180px] cursor-pointer">
            <img src="" alt="" className="bg-cover rounded-full p-3 bg-black"/>
            <div className="hidden sm:block">
             <h2 className="font-semibold text-sm">{}Alex Morgan</h2>
             <h2 className="text-gray-500 text-sm">Personal Plan</h2>
            </div>
            <FaCog  className="ml-2 text-gray-700 text-md hidden sm:block"/>
        </div>
    </div> );
}
 
export default NavBar;