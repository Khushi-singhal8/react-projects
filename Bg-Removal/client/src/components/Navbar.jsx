import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk, useUser } from '@clerk/clerk-react'
import { UserButton } from '@clerk/clerk-react'

const Navbar = () => {

  const { openSignIn } = useClerk()
  const { isSignedIn, user } = useUser()

  return (
    <div className='flex items-center justify-between mx-4 py-3 lg:mx-44'>
      <Link to='/'><img className='w-32 sm:w-44' src={assets.logo} alt=''/></Link>

      {isSignedIn
        ? <div className='flex items-center gap-3 sm:gap-5'>
            <Link to='/buy' className='flex items-center gap-2 bg-blue-100 px-4 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
              <img className='w-5' src={assets.credit_star} alt=''/>
              <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits: 0</p>
            </Link>
            <p className='text-gray-600 max-sm:hidden'>Hi, {user.firstName}</p>
            <UserButton />
          </div>
        : <button onClick={() => openSignIn({})} className='bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:py-3 text-sm rounded-full'>
            Get Started <img src={assets.arrow_icon} alt=''/>
          </button>
      }
    </div>
  )
}

export default Navbar