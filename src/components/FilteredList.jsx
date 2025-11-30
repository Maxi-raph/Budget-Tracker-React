import { format } from "date-fns"
import { useCallback } from "react"

const FilteredList = ({filterByTransactionDate}) =>{
    if( filterByTransactionDate.length < 1)return
    const categoryColor = useCallback((category)=>{
        const categoryColorObj = {
        'Rent':'rgba(255, 137, 0, 1)',    
        'Food':'rgba(34, 197, 0,1)',   
        'Utilities':'rgba(59, 130, 246,1)',    
        'Transport':'rgba(20, 184, 166,1)',   
        'Health':'rgba(90, 30, 90,1)',
        'Allowance': 'rgba(255, 69, 0, 1)',     
        'Salary': 'rgba(255, 105, 180, 1)',   
        'Petty Cash': 'rgba(165, 42, 42, 1)', 
        'Bonus': 'rgba(106, 90, 205, 1)',    
        'Other': 'rgba(148, 0, 211, 1)'   
        }
        return categoryColorObj[category]
    },[filterByTransactionDate])

   return ( <div className="absolute mt-3 pt-1 bg-gray-300 dark:bg-gray-900 w-full rounded-lg shadow-lg">
                <div className="flex justify-around items-center w-full py-2">
                    <span className="text-gray-600 text-sm sm:text-sm font-bold flex-1 text-center dark:text-white">Date</span>
                    <span className="text-gray-600 text-sm sm:text-sm hidden flex-1 sm:block font-bold text-center dark:text-white">Description</span>
                    <span className="text-gray-600 text-sm sm:text-sm block flex-1 font-bold text-center dark:text-white">Category</span>
                    <span className="text-gray-600 text-sm sm:text-sm flex-1 font-bold text-center dark:text-white">Amount</span>
                </div>
        {filterByTransactionDate.map((item,i) =>(
            <div key={i} className="flex justify-around items-center  w-full bg-white  shadow-2xl  dark:bg-gray-700 py-3 border-b-2 border-b-gray-200">
                    <span className="text-gray-600 text-sm sm:text-sm flex-1 font-semibold text-center dark:text-white">{format(item['date'], "MMM dd")}</span>
                    <span className="text-gray-600 text-sm sm:text-sm  flex-1 hidden sm:block font-semibold  text-center  min-w-0 wrap-break-word leading-relaxed dark:text-white">{item['description']}</span>
                    <span style={{backgroundColor:categoryColor(item['category'])}} className={`p-1 rounded-lg text-white text-sm flex-1 sm:text-sm block font-semibold  text-center dark:text-white`}>{item['category']}</span>
                    <span className={`text-gray-600 text-sm sm:text-sm flex-1 font-bold  text-center  min-w-0 wrap-break-word ${item['type'] == 'Expense'?'text-red-500 dark:text-red-300':'text-green-500 dark:text-green-400'}`}>{item['type'] == 'Expense'?'-':'+'}${Number(item['amount']).toLocaleString()}</span>
            </div>
        ))}
    </div> )
}

export default FilteredList;