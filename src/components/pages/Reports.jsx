import { useEffect, useState } from "react";
import Categories from '../Categories'

const Reports = () => {
    const [isAwake,setIsAwake] = useState(false)
    const [activeTab,setActiveTab] = useState({'categories':true,'cashFlow':false,'trends':false})
    
    const handleTabChange = (e)=>{
        setActiveTab(prev =>({'categories':false,'cashFlow':false,'trends':false , [e.target.dataset.name]:true}))
    }


    useEffect(()=>{
      const handleVisibility = ()=>{
        if (document.visibilityState === 'visible') {
          setIsAwake(prev => !prev)     
        }
      }

      document.addEventListener('visibilitychange',handleVisibility)  
      return ()=>  document.removeEventListener('visibilitychange',handleVisibility)  
    },[])

    return ( 
    <div className="max-w-5xl mx-auto p-5 rounded-lg bg-white shadow-lg " id="reports">
        <h2 className="font-semibold text-lg mb-4">Reports</h2>
        <div className="flex items-center mt-3 m-4">
            <span data-name='categories' className={`block py-1 w-24  text-sm text-center border border-gray-300 cursor-pointer rounded-tl-md rounded-bl-md font-semibold ${activeTab['categories'] ? 'bg-white':'bg-gray-200'}`} onClick={(e)=>handleTabChange(e)}>Categories</span>
            <span data-name='cashFlow' className={`block py-1 w-24  text-sm text-center border border-gray-300 cursor-pointer font-semibold ${activeTab['cashFlow'] ? 'bg-white':'bg-gray-200'}`} onClick={(e)=>handleTabChange(e)}>Cash Flow</span>
            <span data-name='trends' className={`block py-1 w-24  text-sm text-center border border-gray-300 cursor-pointer rounded-tr-md rounded-br-md font-semibold ${activeTab['trends'] ? 'bg-white':'bg-gray-200'}`} onClick={(e)=>handleTabChange(e)}>Trends</span>
        </div>
        {activeTab['categories'] && <Categories/>}
    
    </div> );
}
 
export default Reports;