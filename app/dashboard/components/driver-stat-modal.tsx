import {PropsWithChildren, useEffect, useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import * as React from "react";
import {toast} from "sonner";
import {
    BadgeDollarSign,
    Clock,
    Navigation,
    ChevronsUpDown,
    Calendar,
    CircleDollarSign
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {DriverStatGroup} from '@nanahq/sticky';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {Badge} from "@/components/ui/badge";
import {NumericFormat} from "react-number-format";
import {cn} from "@/lib/utils";

export const DriverStatModal: React.FC<PropsWithChildren<{driverId: string, driverName: string}>> = (props) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<DriverStatGroup | undefined>(undefined);

    useEffect(() => {
        if (open) {
            void fetchStat();
        }
    }, [open, props.driverId]);

    const fetchStat = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(`/api/fleet/driver-stats/${props.driverId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const body = await res.json();

            if (!res.ok) {
                throw body;
            }

            setData(body);
        } catch (error: any) {
            toast.error(error?.message ?? 'Failed to load driver statistics. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to render stats
    const renderStatCard = (title: string, icon: React.ReactNode, value: number, unit: string) => (
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-full">
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-lg font-bold">
                    {unit === '₦' ? (
                        <NumericFormat
                            value={value}
                            prefix="₦"
                            thousandSeparator
                            displayType='text'
                            renderText={(formattedValue) => formattedValue}
                        />
                    ) : (
                        `${value} ${unit}`
                    )}
                </p>
            </div>
        </div>
    );

    // Helper function to render performance sections
    const renderPerformanceSection = (periodLabel: string, periodData: any, defaultOpen: boolean = false) => (
        <Collapsible
            defaultOpen={defaultOpen}
            className="w-full space-y-2 border border-gray-100 rounded-lg overflow-hidden"
        >
            <div className="flex items-center justify-between bg-gray-50 p-4">
                <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-500 mr-2"/>
                    <h4 className="font-semibold text-gray-800">{periodLabel}</h4>
                </div>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 p-0">
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">{periodLabel}</span>
                    </Button>
                </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {renderStatCard(
                        "Total Earnings",
                        <BadgeDollarSign className="w-6 h-6 text-blue-500"/>,
                        periodData?.earnings || 0,
                        "₦"
                    )}
                    {renderStatCard(
                        "Distance Covered",
                        <Navigation className="w-6 h-6 text-purple-500"/>,
                        periodData?.distance || 0,
                        "KM"
                    )}
                    {renderStatCard(
                        "Time Spent",
                        <Clock className="w-6 h-6 text-amber-500"/>,
                        periodData?.time || 0,
                        "min"
                    )}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild={true}>
                {props.children}
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[950px] max-h-[90vh] overflow-y-auto"
            >
                <DialogHeader>
                    <div className="flex items-center justify-between mb-2">
                        <DialogTitle className="text-2xl font-bold text-gray-800">
                            {props.driverName}'s Performance
                        </DialogTitle>
                        <Badge className="bg-blue-100 text-blue-600 px-3 py-1">
                            Driver Stats
                        </Badge>
                    </div>
                    <Separator />
                </DialogHeader>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center p-12 space-y-4">
                        <div className="h-10 w-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                        <p className="text-gray-500">Loading performance data...</p>
                    </div>
                ) : data ? (
                    <div className="flex flex-col space-y-6 px-1 py-4">
                        {/* Summary Card */}
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                            <div className="flex items-center space-x-3 mb-4">
                                <CircleDollarSign className="h-8 w-8" />
                                <h3 className="text-xl font-bold">Performance Summary</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white/10 rounded-lg p-4">
                                    <p className="text-white/80 text-sm">Today's Earnings</p>
                                    <p className="text-2xl font-bold">₦{data.today.earnings.toLocaleString()}</p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4">
                                    <p className="text-white/80 text-sm">Yesterday's Earnings</p>
                                    <p className="text-2xl font-bold">₦{data.yesterday.earnings.toLocaleString()}</p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4">
                                    <p className="text-white/80 text-sm">Weekly Earnings</p>
                                    <p className="text-2xl font-bold">₦{data.week.earnings.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Performance Sections */}
                        {renderPerformanceSection("Today's Performance", data.today, true)}
                        {renderPerformanceSection("Yesterday's Performance", data.yesterday)}
                        {renderPerformanceSection("This Week's Performance", data.week)}
                        {renderPerformanceSection("Last 30 Days Performance", data.month)}

                        {/* Action Buttons */}
                        <div className="flex space-x-4 mt-4">
                            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                                Download Report
                            </Button>
                            <Button variant="outline" className="flex-1">
                                Send to Driver
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-12 space-y-4 text-center">
                        <p className="text-gray-500">No performance data available for this driver.</p>
                        <Button onClick={fetchStat}>Refresh Data</Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};