import { useTransaction } from "../context/TransactionContext";


const TransactionList = () => {
    const {transactionArr} = useTransaction()
    return ( 
            <div className="bg-gray-200 rounded-lg shadow-lg lg:w-[60%] sm:w-full">
                <div className="flex justify-around items-center w-full py-2">
                    <span className="text-gray-600 text-sm sm:text-sm font-bold flex-1 text-center">Date</span>
                    <span className="text-gray-600 text-sm sm:text-sm hidden sm:block font-bold flex-1 text-center">Description</span>
                    <span className="text-gray-600 text-sm sm:text-sm block font-bold flex-1 text-center">Category</span>
                    <span className="text-gray-600 text-sm sm:text-sm font-bold flex-1 text-center">Amount</span>
                </div>
                {transactionArr.length > 0 && transactionArr.map((item,i) =>
                (<div key={i} className="flex justify-around items-center  w-full bg-white py-3 border-b-2 border-b-gray-200">
                    <span className="text-gray-600 text-sm sm:text-sm font-semibold flex-1 text-center">{item['date']}</span>
                    <span className="text-gray-600 text-sm sm:text-sm hidden sm:block font-semibold  flex-1 text-center  min-w-0 wrap-break-word leading-relaxed">{item['description']}</span>
                    <span className={`text-gray-600 text-sm sm:text-sm block font-semibold  flex-1 text-center p-1 rounded-md bg`}>{item['category']}</span>
                    <span className={`text-gray-600 text-sm sm:text-sm font-bold  flex-1 text-center  min-w-0 wrap-break-word ${item['type'] == 'Expense'?'text-red-500':'text-green-500'}`}>{item['type'] == 'Expense'?'-':'+'}${Number(item['amount']).toLocaleString()}</span>
                </div>)
                )}
            </div>
     );
}
 
export default TransactionList;