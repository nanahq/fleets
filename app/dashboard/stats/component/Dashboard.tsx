"use client";

import React, { useEffect, useState } from "react";
import { subDays } from "date-fns";
import { FleetOrgStat } from "@nanahq/sticky";
import { useProfile } from "@/contexts/profile-context";
import { Icons } from "@/components/commons/icons";
import dynamic from "next/dynamic";

// Dynamically import both components that might use browser APIs
// const CalendarDateRangePicker = dynamic(() => import('./DateRangePicker'), {
//     ssr: false
// });
//
// const DynamicStats = dynamic(() => import('@/app/dashboard/stats/component/Stats'), {
//     ssr: false
// });

const Dashboard = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [date, setDate] = useState<any | undefined>();
    const [data, setData] = useState<FleetOrgStat | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const { profile } = useProfile();

    // Initialize date after component mounts to avoid SSR issues
    useEffect(() => {
        setIsMounted(true);
        setDate({
            from: subDays(new Date(), 30),
            to: new Date(),
        });
    }, []);


    const fetchData = async () => {
        if (!date?.from || !date?.to) return;

        try {
            setLoading(true);
            const response = await fetch(`/api/fleet/stats`, {
                body: JSON.stringify({
                    gte: date.from,
                    lte: date.to,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const responseData = await response.json() as FleetOrgStat;
            setData(responseData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     if (date && isMounted) {
    //         void fetchData();
    //     }
    // }, [date, isMounted]);

    if (!isMounted) {
        return (
            <div className="flex flex-row items-center justify-center h-screen">
                <Icons.spinner className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (loading || !data) {
        return (
            <div className="flex flex-row items-center justify-center h-screen">
                <Icons.spinner className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if(!window?.document) {
        return (
            <div className="flex flex-row items-center justify-center h-screen">
                <Icons.spinner className="h-8 w-8 animate-spin"/>
            </div>
        )
    }

    return (
        <div className="hidden flex-col md:flex p-10">
            <div className="flex-1 space-y-4 p-2 pr-10">
                <div className="flex flex-col items-start justify-start">
                    <h3 className="text-3xl">
                        Welcome back, {profile?.firstName ?? "Admin"}
                    </h3>
                    <div className="flex flex-row items-center justify-between w-full mb-2">
                        <p className="text-lg text-muted-foreground">
                            You have ₦{data.totalEarnings ?? "zero"} total money generated
                        </p>
                        {/*<CalendarDateRangePicker date={date} setDate={setDate} />*/}
                    </div>
                    <div className="space-y-4 w-full">
                        {/*<DynamicStats data={data} />*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;