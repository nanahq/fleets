"use client"
import React from "react";
import dynamic from 'next/dynamic'

const DynamicHDashboard = dynamic(() => import('./component/Dashboard'), { ssr: false, })
const StatsPage = () => {
   return <div>
       <DynamicHDashboard />
   </div>
}

export default StatsPage
