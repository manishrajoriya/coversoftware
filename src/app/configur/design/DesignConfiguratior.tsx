'use client'
import HandleComponent from '@/components/HandleComponent'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import NextImage from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
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
    const [phoneCasePosition, setPhoneCasePosition] = useState({
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        x: 0,
        y: 0,
     })

    const phoneCaseRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    function phoneCasePositionAll(){
        const {x: phoneCaseX, y: phoneCaseY, width: phoneCaseWidth, height: phoneCaseHeight, left: phoneCaseLeft, top: phoneCaseTop} = phoneCaseRef.current!.getBoundingClientRect()
        setPhoneCasePosition({
            width: phoneCaseWidth,
            height: phoneCaseHeight,
            left: phoneCaseLeft,
            top: phoneCaseTop,
            x: phoneCaseX,
            y: phoneCaseY,
        })
        console.log("phoneCasePosition", phoneCasePosition);
    }
    useEffect(() => {
        phoneCasePositionAll()
    }, [imageUrl])

    function base64ToBlob(base64: string) {
        const byteCharacters = atob(base64)
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        return new Blob([byteArray], { type: 'image/png' })
    }

    async function saveConfigration(){
        try {
            const {x: phoneCaseX, y: phoneCaseY, width: phoneCaseWidth, height: phoneCaseHeight, left: phoneCaseLeft, top: phoneCaseTop} = phoneCaseRef.current!.getBoundingClientRect()
            const {x: containerX, y: containerY, width: containerWidth, height: containerHeight, left: containerLeft, top: containerTop} = containerRef.current!.getBoundingClientRect()
console.log("phoneCaseX, phoneCaseY, phoneCaseWidth, phoneCaseHeight, containerX, containerY, containerWidth, containerHeight, containerLeft, containerTop",phoneCaseX, phoneCaseY, phoneCaseWidth, phoneCaseHeight, containerX, containerY, containerWidth, containerHeight, containerLeft, containerTop);

            const leftOffset = phoneCaseLeft - containerLeft
            const topOffset = phoneCaseTop - containerTop
            const actualX = randeredPosition.x - leftOffset
            const actualY = randeredPosition.y - topOffset
            const actualWidth = randeredDimensions.width * (containerWidth / phoneCaseWidth)
            const actualHeight = randeredDimensions.height * (containerHeight / phoneCaseHeight)

            //canvas
            const canvas = document.createElement('canvas')
            canvas.width = phoneCaseWidth
            canvas.height = phoneCaseHeight
            const ctx = canvas.getContext('2d')

            const userImage = new Image()
            userImage.crossOrigin = 'anonymous'
            userImage.src = imageUrl
            await new Promise(resolve => userImage.onload = resolve)
            ctx!.drawImage(userImage, actualX, actualY, randeredDimensions.width, randeredDimensions.height)
            const base64 = canvas.toDataURL()
            const base64Data = base64.split(',')[1]
            const blob = base64ToBlob(base64Data)
            const file = new File([blob], 'image.png', { type: 'image/png' })
            console.log("file", file);
        } catch (error) {
            console.log("error", error);
            
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
                <NextImage
                    src="/phone-template.png"
                    alt='Product Image'
                    fill
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
                        <NextImage
                            src={imageUrl}
                            alt='Product Image'
                            onLoad={phoneCasePositionAll}
                            fill
                            className='pointer-events-none'  
                        />
                    </div>
                </Rnd>
            </div>
        </div>
        <div className='flex flex-col gap-4'>
            <Button onClick={saveConfigration}>Save</Button>
        </div>
    </div>
  )
}

export default DesignConfiguratior