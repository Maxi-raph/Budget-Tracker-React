import './App.css'
import BudgetDashboard from './components/BudgetDashboard';
import { Panel } from './components/Panel';
import NavBar from "./components/NavBar";

const App = () => {
  return ( <div className=' min-h-screen w-screen '>
    <Panel />
    <NavBar />
    <BudgetDashboard />
  </div> );
}
 
export default App;