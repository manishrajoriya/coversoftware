'use client'
import HandleComponent from '@/components/HandleComponent'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { Rnd } from 'react-rnd'

type DesignConfiguratiorProps = {
    configId: string
    imageUrl: string
    imageDimensions: {
        width: number
        height: number
    }
}

const DesignConfiguratior = ({configId, imageUrl, imageDimensions}:DesignConfiguratiorProps) => {

    const [randeredDimensions, setRanderDimensions] = useState({
        width: imageDimensions.width / 4,
        height: imageDimensions.height / 4,
    })

    const [randeredPosition, setRanderPosition] = useState({
        x: 150,
        y: 205,
    })

    const phoneCaseRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)


    async function saveConfigration(){
        try {
            const {x: phoneCaseX, y: phoneCaseY, width: phoneCaseWidth, height: phoneCaseHeight} = phoneCaseRef.current!.getBoundingClientRect()
            const {x: containerX, y: containerY, width: containerWidth, height: containerHeight} = containerRef.current!.getBoundingClientRect()

            const designData = {
                configId,
                imageUrl,
                imageDimensions,
                
            }
        } catch (error) {
            
        }
    }
    
  return (
    <div className='relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20'>
        <div ref={containerRef} className='relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
            <div className='relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]'>
            <AspectRatio 
            ref={phoneCaseRef}
            ratio={896 / 1831}
            className='pointer-events-none relative z-50 aspect-[896/1831] w-full '
            >
                <Image
                    src="/phone-template.png"
                    alt='Product Image'
                    fill
                    quality={100}
                    className='pointer-events-none z-50 select-none'  
                />
            </AspectRatio>
            <div className='absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]' />
          <div
            className='absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]'
          />
        </div>

            <div>
                <Rnd
                    className='absolute z-20 border-[3px] border-primary'
                    default={{
                        x: 150,
                        y: 205,
                        width: imageDimensions.width / 4,
                        height: imageDimensions.height / 4,
                    }}
                    onResizeStop={(_, __, ref, ___, {x, y}) => {
                        setRanderDimensions({
                            width: parseInt(ref.style.width.slice(0, -2)),
                            height: parseInt(ref.style.height.slice(0, -2)),
                        })
                        setRanderPosition({x, y})
                    }}
                    onDragStop={(_, {x, y}) => {
                        setRanderPosition({x, y})
                    }}
                    resizeHandleComponent={{
                        topLeft: <HandleComponent />,
                        bottomRight: <HandleComponent />,
                        topRight: <HandleComponent />,
                        bottomLeft: <HandleComponent />,
                    }}
                    
                   >
                    <div className='relative w-full h-full'>
                        <Image
                            src={imageUrl}
                            alt='Product Image'
                            fill
                            quality={100}
                            className='w-full h-full object-cover'  
                        />
                    </div>
                </Rnd>
            </div>
        </div>
    </div>
  )
}

export default DesignConfiguratior