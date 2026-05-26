import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'

const App = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<><SignedIn><Result /></SignedIn><SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path='/buy' element={<><SignedIn><BuyCredit /></SignedIn><SignedOut><RedirectToSignIn /></SignedOut></>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App