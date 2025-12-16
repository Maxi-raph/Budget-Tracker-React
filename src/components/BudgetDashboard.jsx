import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Transactions from './pages/Transactions';
import SetBudget from "./pages/SetBudget";
import ManageBudgets from "./pages/ManageBudgets";
import { Routes, Route } from "react-router";
import ScrollTop from "./ScrollTop";


const BudgetDashboard = () => {
    return ( <div className="flex-1 pt-24 w-full pr-4 pl-4 pb-4 md:pl-72 md:pr-10">
        <ScrollTop />  
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/set_budget" element={<SetBudget />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/reports" element={<Reports />} />
            <Route path='/manage_budgets' element={<ManageBudgets />}/>
        </Routes>
    </div> );
}
 
export default BudgetDashboard;