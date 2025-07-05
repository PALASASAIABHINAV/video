import { useState } from 'react'
import Headder from './components/headder/Headder.jsx'
import { Outlet } from 'react-router-dom'

function App() {
  
  

  return (
    <div className='max-h-screen'>
      <Headder />
      <main className='pt-20'>
      <Outlet />
      </main>
    </div>
  )
}

export default App
