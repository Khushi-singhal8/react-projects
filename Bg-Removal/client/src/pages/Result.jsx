import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Result = () => {
  const ctx = useContext(AppContext)
  const navigate = useNavigate()

  // Guard: if context somehow isn't ready, show nothing harmful
  const image = ctx?.image || false
  const resultImage = ctx?.resultImage || false

  return (
    <div className='mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]'>
      <div className='bg-white rounded-xl px-8 py-8 drop-shadow-md'>

        {/* Title */}
        <h2 className='text-center text-2xl font-bold text-gray-700 mb-6'>
          Background Removal Result
        </h2>

        <div className='flex flex-col sm:grid grid-cols-2 gap-8'>

          {/* Original Image */}
          <div className='flex flex-col'>
            <p className='font-semibold text-gray-500 mb-2 text-sm uppercase tracking-wide'>
              Original
            </p>
            <div className='rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50 flex items-center justify-center min-h-[220px]'>
              <img
                className='w-full h-full object-contain rounded-xl'
                src={image ? URL.createObjectURL(image) : assets.image_w_bg}
                alt="Original"
              />
            </div>
          </div>

          {/* Result Image */}
          <div className='flex flex-col'>
            <p className='font-semibold text-gray-500 mb-2 text-sm uppercase tracking-wide'>
              Background Removed
            </p>
            <div
              className='relative rounded-xl overflow-hidden border border-gray-200 shadow-sm min-h-[220px] flex items-center justify-center'
              style={{ background: 'repeating-conic-gradient(#f0f0f0 0% 25%, white 0% 50%) 0 0 / 20px 20px' }}
            >
              {/* Spinner while API is processing */}
              {image && !resultImage && (
                <div className='absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10'>
                  <div className='w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mb-3'></div>
                  <p className='text-sm text-violet-600 font-medium'>Removing background…</p>
                </div>
              )}
              <img
                className='w-full h-full object-contain rounded-xl'
                src={resultImage ? resultImage : assets.image_wo_bg}
                alt="Result"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-8'>
          <button
            onClick={() => navigate('/')}
            className='bg-white px-8 py-2.5 text-sm font-medium border-2 border-violet-500 text-violet-600 rounded-full hover:bg-violet-50 hover:scale-105 transition-all duration-300 shadow-sm'
          >
            ← Try Another Image
          </button>

          {resultImage && (
            <a
              href={resultImage}
              download="bg-removed.png"
              target='_blank'
              rel='noreferrer'
              className='bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-2.5 text-sm font-medium rounded-full hover:scale-105 hover:shadow-lg hover:shadow-violet-200 transition-all duration-300'
            >
              ↓ Download PNG
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default Result