"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    CheckCircle,
    DollarSign,
    Clock,
    MapPin,
    Truck,
    TrendingUp,
    Calendar,
    Route
} from "lucide-react";
import { UnitSuffix } from "./unit-suffix";
import { FleetOrgStat } from "@nanahq/sticky";
import { DriverCommissionBar } from "@/app/dashboard/stats/component/CommissionBar";

export const Stats: React.FC<{ data: FleetOrgStat }> = (props) => {
    return (
        <div className="space-y-6 w-full px-6 pt-5 pb-10">
            {/* Header section */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard Statistics</h1>
                    <p className="text-gray-500 text-sm">Overview of your logistics performance</p>
                </div>
            </div>

            {/* Primary stats - most important metrics in larger cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                <Card className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <CardHeader className="pb-2 border-b border-gray-50">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-gray-800">Total Deliveries</CardTitle>
                            <div className="p-2 bg-green-50 rounded-full">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-gray-900">{props.data.totalDeliveries.toLocaleString()}</span>
                            <span className="ml-2 text-sm text-gray-500">completed orders</span>
                        </div>
                        <div className="mt-1 text-xs text-green-600 font-medium">
                            <TrendingUp className="inline h-3 w-3 mr-1" />
                            Managing {props.data.totalDrivers} drivers
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <CardHeader className="pb-2 border-b border-gray-50">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-gray-800">Total Revenue</CardTitle>
                            <div className="p-2 bg-blue-50 rounded-full">
                                <DollarSign className="h-5 w-5 text-blue-500" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-gray-900">₦</span>
                            <span className="text-3xl font-bold text-gray-900">
                <UnitSuffix
                    noSuffixSpacing={true}
                    value={props.data.totalEarnings}
                    units={{
                        3: "K",
                        6: "M",
                        9: "B",
                        12: "T",
                    }}
                />
              </span>
                        </div>
                        <div className="mt-1 text-xs text-blue-600 font-medium">
                            <TrendingUp className="inline h-3 w-3 mr-1" />
                            Avg. ₦{props.data.averageDelivery.toLocaleString()} per delivery
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <CardHeader className="pb-2 border-b border-gray-50">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-gray-800">Total Distance</CardTitle>
                            <div className="p-2 bg-purple-50 rounded-full">
                                <Route className="h-5 w-5 text-purple-500" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">
                <UnitSuffix
                    noSuffixSpacing={true}
                    value={props.data.totalDistance}
                    units={{
                        3: "K",
                        6: "M",
                        9: "B",
                        12: "T",
                    }}
                />
              </span>
                            <span className="ml-1 text-xl font-semibold text-gray-700">km</span>
                        </div>
                        <div className="mt-1 text-xs text-purple-600 font-medium">
                            <TrendingUp className="inline h-3 w-3 mr-1" />
                            Avg. {props.data.averageDeliveryDistance.toLocaleString()} km per delivery
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Secondary stats - smaller cards in grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white rounded-lg shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Time Metrics</CardTitle>
                        <Clock className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-800">
                            <UnitSuffix
                                noSuffixSpacing={true}
                                value={props.data.totalTimeSpent}
                                units={{
                                    3: "K",
                                    6: "M",
                                    9: "B",
                                    12: "T",
                                }}
                            />
                            <span className="text-sm font-medium text-gray-500 ml-1">min</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Avg. {props.data.averageDeliveryTime} min per delivery
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white rounded-lg shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Delivery Fee</CardTitle>
                        <DollarSign className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-800">
                            ₦
                            <UnitSuffix
                                noSuffixSpacing={true}
                                value={props.data.averageDelivery}
                                units={{
                                    3: "K",
                                    6: "M",
                                    9: "B",
                                    12: "T",
                                }}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Per completed delivery
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white rounded-lg shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Time/Delivery</CardTitle>
                        <Calendar className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-800">
                            <UnitSuffix
                                noSuffixSpacing={true}
                                value={props.data.averageDeliveryTime}
                                units={{
                                    3: "K",
                                    6: "M",
                                    9: "B",
                                    12: "T",
                                }}
                            />
                            <span className="text-sm font-medium text-gray-500 ml-1">min</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Average time per order
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white rounded-lg shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Distance</CardTitle>
                        <MapPin className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-800">
                            <UnitSuffix
                                noSuffixSpacing={true}
                                value={props.data.averageDeliveryDistance}
                                units={{
                                    3: "K",
                                    6: "M",
                                    9: "B",
                                    12: "T",
                                }}
                            />
                            <span className="text-sm font-medium text-gray-500 ml-1">km</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Average distance per order
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Driver Commission Chart */}
            {/*<Card className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">*/}
            {/*    <CardHeader className="pb-2 border-b border-gray-50">*/}
            {/*        <div className="flex items-center justify-between">*/}
            {/*            <CardTitle className="text-lg font-semibold text-gray-800">Driver Commission Distribution</CardTitle>*/}
            {/*            <div className="p-2 bg-amber-50 rounded-full">*/}
            {/*                <Truck className="h-5 w-5 text-amber-500" />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </CardHeader>*/}
            {/*    <CardContent className="pt-4">*/}
            {/*        <div className="h-80">*/}
            {/*            <DriverCommissionBar data={props.data} />*/}
            {/*        </div>*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}
        </div>
    );
};

export default Stats;