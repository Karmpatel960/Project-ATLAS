import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"
import './index.css'
import App from './App.jsx'

import { ToastProvider } from "./components/ui/ToastContext.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <Router>
        <App />
      </Router>
    </ToastProvider>
  </StrictMode>,
)

