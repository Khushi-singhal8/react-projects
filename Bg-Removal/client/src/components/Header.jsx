import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (

    <div className='flex flex-col lg:flex-row items-center justify-between gap-16 px-4 mt-10 lg:px-44 sm:mt-20'>

      {/* Left Side */}
      <div className='max-w-2xl flex-1'>

        {/* Heading */}
        <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight'>

          Remove the
          <br className='max-md:hidden' />

          <span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent'>
            background
          </span>

          <br className='max-md:hidden' />
          from images for free.

        </h1>

        {/* Paragraph */}
        <p className='my-6 text-[15px] text-gray-500'>
          Powered by AI that detects every edge,
          every hair, every detail automatically.
        </p>

        {/* Upload Button */}
        <div>

          <input type="file" id="upload1" hidden />

          <label
            htmlFor="upload1"
            className='inline-flex items-center gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white hover:scale-105 transition-all duration-700'
          >

            <img
              src={assets.upload_btn_icon}
              alt=""
              className='w-5'
            />

            <p>Upload your image</p>

          </label>

        </div>

      </div>

      {/* Right Side Image */}
      <div className='flex-1 flex justify-center'>

        <img
          src={assets.header_img}
          alt=""
          className='w-full max-w-lg'
        />

      </div>

    </div>

  )
}

export default Header