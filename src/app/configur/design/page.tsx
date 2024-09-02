import { db } from '@/db'
import React from 'react'

function page() {
    
    const config = db.configuration.findUnique({
        where: {
            id: "3bdaf405-cb40-45d0-a0d9-60b259af39a6"
        },
    })

    console.log("config", config)
  return (
    <div>page</div>
  )
}

export default page