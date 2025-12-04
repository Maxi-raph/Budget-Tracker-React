import {useRef,useEffect} from 'react'
import { useCashFlow } from '../context/CashFlowContext';
import { useTransaction } from '../context/TransactionContext';
import {Bar} from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const CashFlowChart = () => {
  // cash flow values and handlers gotten from cash flow context
    const {period,setPeriod,getPeriod,hasIncome,hasExpense,data,options} = useCashFlow()

  // transaction values gotten from transaction context
    const {transactionArr} = useTransaction()

  // ref for select element
    const selectRef = useRef()
  
  // useEffect to set default period to 'this_week' on component unmount
    useEffect(()=>{

        return ()=>{
          selectRef.current.selectedIndex = 0 
            setPeriod(prev =>{
                prev = 'this_week'
                return prev
            })
        }
    },[])

    return (
    <div className='mt-12 relative'>
            <select ref={selectRef} value={period} onChange={(e)=>setPeriod(e.target.value)} className='absolute -top-12 right-0 outline-0 bg-gray-300 dark:bg-gray-800 dark:border-gray-900 text-sm font-semibold  p-1 cursor-pointer rounded-lg border border-gray-400'>
              <option value="" disabled className='font-semibold'>Show time period</option>
              <option value="this_week" className='font-semibold'>This Week</option>
              <option value="last_week" className='font-semibold'>Last Week</option>
              <option value="this_month" className='font-semibold'>This Month</option>
              <option value="last_month" className='font-semibold'>Last Month</option>
            </select>
            <div className="flex justify-center items-center  rounded-md p-1 h-72 shadow-xl  text-gray-800 dark:text-white font-semibold bg-linear-to-br from-white/60 to-gray-300  dark:from-gray-500  dark:to-gray-800   dark:border-gray-900 border border-gray-200 backdrop-blur-xl">
                {transactionArr.length > 1 && hasIncome && hasExpense
                ? <Bar data={data} options={options}/>
                : 'Add transactions to view cash flow...'}
            </div>
    </div>);
}
 
export default CashFlowChart;