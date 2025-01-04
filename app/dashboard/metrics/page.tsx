"use client"
import React from "react";
import dynamic from 'next/dynamic'

// const DynamicHDashboard = dynamic(() => import('./component/Dashboard'), { ssr: false })
const StatsPage = () => {
    return <div>
        <h1 className="sr-only">Hello world</h1>
        {/*<DynamicHDashboard />*/}
    </div>
}

export default StatsPage
