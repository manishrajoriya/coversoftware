import React from 'react'
import DesignConfiguratior from './DesignConfiguratior'
import { notFound } from 'next/navigation'
import { db } from '@/db'

type pageProps = {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const page = async ({searchParams}:pageProps) => {
  const {id} = searchParams
  if (!id || typeof id !== 'string') {
    return notFound()
  }

  const config = await db.configuration.findUnique({
    where: {
      id: id as string
    }
  })
  if (!config) {
    return notFound()
  }

  const {width, height,} = config

  return (
    <div>
      <DesignConfiguratior configId={config.id}
      imageUrl={config.imageUrl}
      imageDimensions={{width, height}}
      />
    </div>
  )
}

export default page