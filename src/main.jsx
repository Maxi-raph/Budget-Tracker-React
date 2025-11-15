import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { TransactionProvider } from './context/TransactionContext.jsx'
import { BudgetProvider } from './context/BudgetContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <TransactionProvider>
  <BudgetProvider>
  <BrowserRouter>
     <App />   
  </BrowserRouter>
  </BudgetProvider>
  </TransactionProvider>
  </StrictMode>,
)
