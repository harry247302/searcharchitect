"use client"

import ArchitectLogin from '@/app/web-pages/ArchitectLogin'
import React from 'react'

// import dynamic from "next/dynamic";


// const ArchitectLogin = dynamic(() => import("@/app/web-pages/ArchitectLogin"), {
//   ssr: false,
// });

const page = () => {
  return (
    <>
    <ArchitectLogin />
    </> 
  )
}

export default page