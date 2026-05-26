import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 px-4 lg:px-44 py-3'>
      <img width={150} src={assets.logo} alt=""/>
      <p className='flex-1 border-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @KhushiSinghal.dev | All rights reserved.</p>
      <div className='flex gap-1'>
        <img width={40} src={assets.twitter} alt="Twitter"/>
        <img width={40} src={assets.instagram} alt="Instagram"/>
        <img width={40} src={assets.facebook} alt="Facebook"/>
      </div>
    </div>
  )
}

export default Footer
