"use client";

import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { FleetOrgStat } from "@nanahq/sticky";
import { useProfile } from "@/contexts/profile-context";
import { Icons } from "@/components/commons/icons";
import { CalendarDateRangePicker } from "@/app/dashboard/stats/component/DateRangePicker";
import Stats from "@/app/dashboard/stats/component/Stats";
import { DollarSign, Calendar, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UnitSuffix } from "@/app/dashboard/stats/component/unit-suffix";

export const Dashboard = () => {
    const [date, setDate] = useState<DateRange | undefined>({
        from: subDays(new Date(), 364),
        to: new Date(),
    });
    const [data, setData] = useState<FleetOrgStat | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const { profile } = useProfile();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/fleet/stats`, {
                body: JSON.stringify({
                    gte: date?.from,
                    lte: date?.to,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            const data = (await response.json()) as FleetOrgStat;
            setData(data);

            if (!response.ok) {
                throw new Error("Something went wrong");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (date) {
            void fetchData();
        }
    }, [date]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                <Icons.spinner className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-gray-500 font-medium">Loading your dashboard data...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                <div className="text-center">
                    <Icons.spinner className="h-12 w-12 animate-spin text-primary mb-4 mx-auto" />
                    <h3 className="text-xl font-semibold mb-2">Preparing Your Dashboard</h3>
                    <p className="text-gray-500 max-w-md mb-6">We're gathering your logistics performance data.</p>
                    <Button onClick={fetchData} variant="outline" className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-auto min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Header section */}
                <div className="bg-white border-b border-gray-200 mb-6">
                    <div className="px-6 py-5 md:flex md:items-center md:justify-between">
                        <div className="min-w-0 flex-1">
                            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
                                Welcome back, {profile?.firstName ?? "Admin"}
                            </h1>
                            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <Calendar className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                                    {date?.from?.toLocaleDateString()} - {date?.to?.toLocaleDateString()}
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <DollarSign className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                                    Total Revenue: ₦
                                    <UnitSuffix
                                        noSuffixSpacing={true}
                                        value={data.totalEarnings}
                                        units={{
                                            3: "K",
                                            6: "M",
                                            9: "B",
                                            12: "T",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 flex lg:mt-0 lg:ml-4">
                            <span className="hidden sm:block">
                                <Button
                                    onClick={fetchData}
                                    variant="outline"
                                    size="sm"
                                    className="mr-3 flex items-center"
                                >
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Refresh
                                </Button>
                            </span>
                            <span className="sm:ml-3">
                                <CalendarDateRangePicker date={date} setDate={setDate} />
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="space-y-4 px-4 lg:px-8 pb-20">
                    <Stats data={data as any} />
                </div>
            </div>
        </div>
    );
};