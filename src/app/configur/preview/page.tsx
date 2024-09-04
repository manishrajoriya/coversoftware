import React from 'react'
import { notFound } from 'next/navigation'
import { db } from '@/db'
import DesignPreview from './DesignPreview'
interface pageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const page = async ({searchParams}: pageProps) => {
    const {id} = searchParams

    if (!id || typeof id !== 'string') {
        return notFound()
    }

    const configration = await db.configuration.findUnique({
        where: {
            id
        }
    })

    if (!configration) {
        return notFound()
    }

    
  return (
    <div>
        <DesignPreview configration={configration} />
    </div>
  )
}

export default page