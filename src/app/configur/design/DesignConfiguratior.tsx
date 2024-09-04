'use client'
import HandleComponent from '@/components/HandleComponent'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import NextImage from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Rnd } from 'react-rnd'
import { useRouter } from 'next/navigation'
import { useUploadThing } from '@/lib/uploadthing'
import html2canvas from 'html2canvas'

type DesignConfiguratiorProps = {
    configId: string
    imageUrl: string
    imageDimensions: {
        width: number
        height: number
    }
}

const DesignConfiguratior = ({configId, imageUrl, imageDimensions}:DesignConfiguratiorProps) => {
    const router = useRouter()
    const [randeredDimensions, setRanderDimensions] = useState({
        width: imageDimensions.width ,
        height: imageDimensions.height ,
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

    const {startUpload, isUploading} = useUploadThing('imageUploader')

    // function phoneCasePositionAll(){
    //     const {x: phoneCaseX, y: phoneCaseY, width: phoneCaseWidth, height: phoneCaseHeight, left: phoneCaseLeft, top: phoneCaseTop} = phoneCaseRef.current!.getBoundingClientRect()
    //     setPhoneCasePosition({
    //         width: phoneCaseWidth,
    //         height: phoneCaseHeight,
    //         left: phoneCaseLeft,
    //         top: phoneCaseTop,
    //         x: phoneCaseX,
    //         y: phoneCaseY,
    //     })
    //     console.log("phoneCasePosition", phoneCasePosition);
    // }
    // useEffect(() => {
    //     phoneCasePositionAll()
    // }, [imageUrl])

    
    async function saveConfigration(){
        try {
           const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current!.getBoundingClientRect()

        const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect()

      const leftOffset = caseLeft - containerLeft
      const topOffset = caseTop - containerTop

        const actualX = randeredPosition.x - leftOffset
      const actualY = randeredPosition.y - topOffset

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')

      const userImage = new Image()
      userImage.crossOrigin = 'anonymous'
      userImage.src = imageUrl
      await new Promise((resolve) => (userImage.onload = resolve))

      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        randeredDimensions.width,
        randeredDimensions.height
      )

      const base64 = canvas.toDataURL()
      const base64Data = base64.split(',')[1]

      const blob = base64ToBlob(base64Data, 'image/png')
      const file = new File([blob], 'filename.png', { type: 'image/png' })

      await startUpload([file], { configId })
            
            router.push(`/configur/preview?id=${configId}`)
        } catch (error) {
            console.log("error", error);
            
        }

       


    }

     function base64ToBlob(base64: string, mimeType: string) {
            const byteCharacters = atob(base64)
            const byteNumbers = new Array(byteCharacters.length)
            for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i)
            }
            const byteArray = new Uint8Array(byteNumbers)
            return new Blob([byteArray], { type: mimeType })
        }


         const downloadImage = () => {
            if (phoneCaseRef.current) {
            html2canvas(phoneCaseRef.current).then((canvas) => {
                const link = document.createElement('a');
                link.download = 'mobile-cover.png';
                link.href = canvas.toDataURL();
                link.click();
            });
            }
        };

     
    
  return (
    <div className='relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20'>
        <div ref={containerRef} className='relative h-[42.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
            
            <div 
            ref={phoneCaseRef}
            className='relative w-10/12 bg-opacity-50 pointer-events-none aspect-[1/1]'>
            <AspectRatio 
            
            ratio={1/1}
            className='pointer-events-none relative z-50 aspect-[1/1] w-full '
            >
                <NextImage
                    src="/s24.webp"
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
                            fill
                            className='pointer-events-none'  
                        />
                    </div>
                </Rnd>
                
            </div>
        </div>
        <div className='flex flex-col gap-4'>
            <Button onClick={saveConfigration}>Save</Button>
            <Button onClick={downloadImage}>Download</Button>
        </div>
    </div>
  )
}

export default DesignConfiguratior