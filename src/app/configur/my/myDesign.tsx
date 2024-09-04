import Phone from '@/components/Phone'
import { Configuration } from '@prisma/client'
import React from 'react'

const MyDesign = ({configration}: {configration: Configuration}) => {
  return (
    <div>
       <div>
        <div className='mt-20 grid grid-cols-2 gap-4 text-sm sm:grid-cols-12 sm:gap-x-6 sm:grid-rows-1 md:gap-x-8 lg:gap-x-12'>
        <div className='sm:col-span-4 sm:row-span-2 md:col-span-3 md:row-span-1'>
          <div
               className='relative pointer-events-none z-50 overflow-hidden'
      >
      <img
        src="/401-87.webp"
        className='pointer-events-none z-50 select-none'
        alt='phone image'
      />

      <div className='absolute -z-10 inset-0'>
        <img
          
          className='object-cover min-w-full min-h-full'
          src={configration.imageUrl}
          alt='overlaying phone image'
        />
      </div>
    </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default MyDesign