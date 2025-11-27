import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { TransactionProvider } from './context/TransactionContext.jsx'
import { BudgetProvider } from './context/BudgetContext.jsx'
import { CashFlowProvider } from './context/CashFlowContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <TransactionProvider>
  <BudgetProvider>
  <ThemeProvider>
  <CashFlowProvider>
  <BrowserRouter>
     <App />   
  </BrowserRouter>     
  </CashFlowProvider>
  </ThemeProvider>
  </BudgetProvider>
  </TransactionProvider>
  </StrictMode>,
)
