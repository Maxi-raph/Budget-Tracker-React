import { useCashFlow } from '../context/CashFlowContext';
import CashFlowChart from './CashFlowChart'

const CashFlow = () => {
    const {totalIncome,totalExpense} = useCashFlow()
    return ( 
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CashFlowChart/>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="rounded-md bg-gray-300 p-3 shadow-lg dark:bg-gray-800">
                    <p className="mb-4 font-semibold">Total Income</p>
                    <span className="font-bold text-xl text-green-700 dark:text-green-500">${totalIncome?.toLocaleString()}</span>
                </div>
                <div className="rounded-md bg-gray-300 p-3 shadow-lg dark:bg-gray-800">
                    <p className="mb-4 font-semibold">Total Expenses</p>
                    <span className="font-bold text-xl text-red-700 dark:text-red-300">${totalExpense?.toLocaleString()}</span>
                </div>
                <div className="rounded-md bg-gray-300 p-3 shadow-lg dark:bg-gray-800">
                    <p className="mb-4 font-semibold">Remaining Balance</p>
                    <span className="font-bold text-xl">{totalIncome < totalExpense ? `-$${Math.abs(totalIncome - totalExpense)?.toLocaleString()}`: `$${Math.abs(totalIncome - totalExpense)?.toLocaleString()}`}</span>
                </div>  
            </div>
         </div>   
     );
}
 
export default CashFlow;