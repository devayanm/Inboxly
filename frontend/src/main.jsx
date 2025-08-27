import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { WorkspaceProvider } from './context/WorkspaceContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <WorkspaceProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WorkspaceProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
