import React, { useState } from 'react'
import { assets } from '../assets/assets'

const BgSlider = () => {

    const [sliderPosition, setSliderPosition] = useState(50)

    const handleSliderChange = (e) => {
        setSliderPosition(Number(e.target.value))
    }

    return (
        <div className='flex flex-col items-center'>

            <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>
                Remove Background with High <br /> Quality and Accuracy
            </h1>

            <div className='relative w-full max-w-xl mx-auto mt-10 rounded-xl overflow-hidden select-none'>

                <img
                    src={assets.image_wo_bg}
                    alt="without background"
                    className='w-full h-full object-cover'
                />

                <img
                    src={assets.image_w_bg}
                    alt="with background"
                    className='absolute top-0 left-0 w-full h-full object-cover'
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                />

                <div
                    className='absolute top-0 h-full w-1 bg-white shadow-lg'
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className='absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 text-gray-700' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
                        </svg>
                    </div>
                </div>

                <input
                    type="range"
                    min={0}
                    max={100}
                    value={sliderPosition}
                    onChange={handleSliderChange}
                    className='absolute top-0 left-0 w-full h-full opacity-0 cursor-col-resize'
                />

            </div>

        </div>
    )
}

export default BgSlider