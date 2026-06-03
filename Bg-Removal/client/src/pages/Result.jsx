import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Result = () => {
  const { image, resultImage } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <div className='mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]'>
      <div className='bg-white rounded-lg px-8 py-6 drop-shadow-sm'>
        <div className='flex flex-col sm:grid grid-cols-2 gap-8'>
          <div>
            <p className='font-semibold text-gray-600 mb-2'>Original</p>
            <img className='rounded-md border' src={image ? URL.createObjectURL(image) : assets.image_w_bg} alt="" />
          </div>
          <div>
            <p className='font-semibold text-gray-600 mb-2'>Background Removal</p>
            <div className='relative'>
              <img className='rounded-md border border-gray-300 h-full bg-layer overflow-hidden' src={resultImage ? resultImage : assets.image_wo_bg} alt="" />
            </div>
          </div>
        </div>
        <div className='flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6'>
          <button
            onClick={() => navigate('/')}
            className='bg-white px-8 py-2.5 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700'>
            Try Another Image
          </button>
          {resultImage && (
            <a href={resultImage} download target='_blank' rel='noreferrer' className='bg-violet-600 text-white px-8 py-2.5 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700'>
              Download
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default Result