import Phone from '@/components/Phone'
import { Configuration } from '@prisma/client'
import React from 'react'

const DesignPreview = ({configration}: {configration: Configuration}) => {
    
  return (

    <div>
        <div className='mt-20 grid grid-cols-2 gap-4 text-sm sm:grid-cols-12 sm:gap-x-6 sm:grid-rows-1 md:gap-x-8 lg:gap-x-12'>
        <div className='sm:col-span-4 sm:row-span-2 md:col-span-3 md:row-span-1'>
          <Phone
          className=' w-full h-full'
          imgSrc={configration.croppedImageUrl!}/>
        </div>
    </div>
    </div>
  )
}

export default DesignPreview