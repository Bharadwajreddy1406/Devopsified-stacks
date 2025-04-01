import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css' // Changed from index.css to App.css as that's where Tailwind is imported
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
