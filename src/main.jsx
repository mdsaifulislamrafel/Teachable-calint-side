import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { router } from './Router/Router.jsx'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='max-w-7xl mx-auto'>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
)
