"use client";

import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { FleetOrgStat } from "@nanahq/sticky";
import { useProfile } from "@/contexts/profile-context";
import { Icons } from "@/components/commons/icons";
import { CalendarDateRangePicker } from "@/app/dashboard/stats/component/DateRangePicker";
import Stats from "@/app/dashboard/stats/component/Stats";

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
            <div className="flex flex-row items-center justify-center h-screen">
                <Icons.spinner className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex flex-row items-center justify-center h-screen">
                <Icons.spinner className="h-8 w-8 animate-spin" />
            </div>
        );
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
                            You have ₦{data?.totalEarnings ?? "zero"} total money generated
                        </p>
                        <CalendarDateRangePicker date={date} setDate={setDate} />
                    </div>
                    <div className="space-y-4 w-full">
                        <Stats data={data as any} />
                    </div>
                </div>
            </div>
        </div>
    );
};
