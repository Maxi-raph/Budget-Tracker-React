import { useEffect, useState } from "react";

const Reports = () => {
    const [isAwake,setIsAwake] = useState(false)

    useEffect(()=>{
      const handleVisibility = ()=>{
        if (document.visibilityState === 'visible') {
          setIsAwake(prev => !prev)     
        }
      }

      document.addEventListener('visibilitychange',handleVisibility)  
      return ()=>  document.removeEventListener('visibilitychange',handleVisibility)  
    },[])

    return ( <div className="max-w-5xl mx-auto p-5 rounded-lg bg-white shadow-lg scroll-mt-22" id="reports">
        <h2 className="font-semibold text-lg mb-4">Reports</h2>
        <div className="flex items-center mt-3 m-4">
            <span className="block py-1 w-24 text-center bg-white border border-gray-300 cursor-pointer rounded-tl-md rounded-bl-md font-semibold">Categories</span>
            <span className="block py-1 w-24 text-center bg-gray-200 border border-gray-300 cursor-pointer font-semibold">Cash Flow</span>
            <span className="block py-1 w-24 text-center bg-gray-200 border border-gray-300 cursor-pointer rounded-tr-md rounded-br-md font-semibold">Trends</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex justify-center items-center rounded-md p-4 bg-gray-200 h-54 shadow-lg  text-gray-500">
                Bar Chart...
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 rounded-md shadow-lg">
                    <span className="font-semibold">Rent</span>
                     <span className="block p-2 bg-gray-200 py-1 px-4 rounded-xl font-semibold">${}</span>
                </div>
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 rounded-md shadow-lg">
                    <span className="font-semibold">Food</span>
                     <span className="block p-2 bg-gray-200 py-1 px-4 rounded-xl font-semibold">${}</span>
                </div>
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 rounded-md shadow-lg">
                    <span className="font-semibold">Utilities</span>
                     <span className="block p-2 bg-gray-200 py-1 px-4 rounded-xl font-semibold">${}</span>
                </div>
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 rounded-md shadow-lg">
                    <span className="font-semibold">Transport</span>
                     <span className="block p-2 bg-gray-200 py-1 px-4 rounded-xl font-semibold">${}</span>
                </div>
                <div className="flex justify-between items-center p-2 border-2 border-gray-100 rounded-md shadow-lg">
                    <span className="font-semibold">Health</span>
                     <span className="block p-2 bg-gray-200 py-1 px-4 rounded-xl font-semibold">${}</span>
                </div>
            </div>
        </div>
    </div> );
}
 
export default Reports;