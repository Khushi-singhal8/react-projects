import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Simple error boundary so one broken component never blanks the whole page
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('React Error:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4'>
          <div className='text-5xl'>⚠️</div>
          <h2 className='text-xl font-bold text-gray-700'>Something went wrong</h2>
          <p className='text-gray-500 text-sm max-w-md'>{this.state.error?.message}</p>
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.href = '/' }}
            className='mt-2 px-6 py-2 bg-violet-600 text-white rounded-full text-sm hover:bg-violet-700'
          >
            Go Home
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

const App = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />
      <ToastContainer position="bottom-right" />
      <ErrorBoundary>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/result' element={<Result />} />
          <Route path='/buy' element={<BuyCredit />} />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </div>
  )
}

export default App