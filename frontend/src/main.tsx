import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
//import App from './App.tsx'
import Login from './pages/Login.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
