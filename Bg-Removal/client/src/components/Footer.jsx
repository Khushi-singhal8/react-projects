import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='relative mt-16 overflow-hidden'>
      {/* Gradient top border */}
      <div className='h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent' />

      {/* Main footer body */}
      <div className='bg-gradient-to-b from-white to-violet-50 px-6 lg:px-44 pt-10 pb-6'>
        
        {/* Top section */}
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8'>

          {/* Brand */}
          <div className='flex flex-col gap-2'>
            <img width={140} src={assets.logo} alt="Logo" />
            <p className='text-sm text-gray-500 max-w-xs leading-relaxed'>
              Remove image backgrounds instantly with AI. Clean, fast, and free to try.
            </p>
          </div>

          {/* Links */}
          <div className='flex flex-col sm:flex-row gap-8 text-sm'>
            <div className='flex flex-col gap-2'>
              <p className='font-semibold text-gray-700 mb-1'>Product</p>
              <a href='#' className='text-gray-500 hover:text-violet-600 transition-colors duration-200'>Features</a>
              <a href='#' className='text-gray-500 hover:text-violet-600 transition-colors duration-200'>Pricing</a>
              <a href='#' className='text-gray-500 hover:text-violet-600 transition-colors duration-200'>API</a>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='font-semibold text-gray-700 mb-1'>Company</p>
              <a href='#' className='text-gray-500 hover:text-violet-600 transition-colors duration-200'>About</a>
              <a href='#' className='text-gray-500 hover:text-violet-600 transition-colors duration-200'>Blog</a>
              <a href='#' className='text-gray-500 hover:text-violet-600 transition-colors duration-200'>Contact</a>
            </div>
          </div>

          {/* Social icons */}
          <div className='flex flex-col gap-3'>
            <p className='font-semibold text-gray-700 text-sm'>Follow us</p>
            <div className='flex gap-3'>
              <a
                href='#'
                aria-label='Twitter'
                className='w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-violet-400 hover:bg-violet-50 hover:scale-110 transition-all duration-300 shadow-sm'
              >
                <img width={18} src={assets.twitter} alt="Twitter" />
              </a>
              <a
                href='#'
                aria-label='Instagram'
                className='w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-violet-400 hover:bg-violet-50 hover:scale-110 transition-all duration-300 shadow-sm'
              >
                <img width={18} src={assets.instagram} alt="Instagram" />
              </a>
              <a
                href='#'
                aria-label='Facebook'
                className='w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-violet-400 hover:bg-violet-50 hover:scale-110 transition-all duration-300 shadow-sm'
              >
                <img width={18} src={assets.facebook} alt="Facebook" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5' />

        {/* Bottom bar */}
        <div className='flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400'>
          <p>© {new Date().getFullYear()} <span className='text-violet-500 font-medium'>KhushiSinghal.dev</span> · All rights reserved.</p>
          <div className='flex gap-4'>
            <a href='#' className='hover:text-violet-500 transition-colors duration-200'>Privacy Policy</a>
            <a href='#' className='hover:text-violet-500 transition-colors duration-200'>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
