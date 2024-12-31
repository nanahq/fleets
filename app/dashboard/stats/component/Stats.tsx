import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
// import {CommissionBar} from "./CommissionBar";
// import AssetClassPie from "./AssetClassPie";
import { CheckIcon, DollarSign, TimerIcon, LandPlot,} from "lucide-react";
// import CrmBar from "./CrmBar";
// import LoanTypeRadar from "./LoanTypeRadar";
import {Separator} from "@/components/ui/separator";
import {UnitSuffix} from "./unit-suffix";
// import RepDealsPie from "./RepDealsPie";
// import RepCloseRate from "./RepCloseRate";
// import RepCommissionBar from "./RepCommissionBar";
import {FleetOrgStat} from "@nanahq/sticky";
import {cn} from "@/lib/utils";
import {DriverCommissionBar} from "@/app/dashboard/stats/component/CommissionBar";

export const Stats: React.FC<{ data: FleetOrgStat }> = (props) => {

    return (
        <div className="space-y-4 w-full">
            <Separator className="border-t-2 border-muted" />
            <div
                className={`grid gap-4 w-full md:grid-cols-2 lg:grid-cols-4`}
            >

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
                        <CheckIcon />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {props.data.totalDeliveries}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Money Generated
                        </CardTitle>
                        <DollarSign />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            <UnitSuffix
                                prefix="₦"
                                noSuffixSpacing={true}
                                value={
                                 props.data.totalEarnings
                                }
                                units={{
                                    3: "K",
                                    6: "M",
                                    9: "B",
                                    12: "T",
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                        <>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium mr-1">
                                    Total distance covered
                                </CardTitle>
                                <LandPlot />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    <UnitSuffix
                                        suffix="KM"
                                        noSuffixSpacing={true}
                                        value={
                                          props.data.totalDistance
                                        }
                                        units={{
                                            3: "K",
                                            6: "M",
                                            9: "B",
                                            12: "T",
                                        }}
                                    />KM
                                </div>
                            </CardContent>
                        </>
                </Card>
                <Card>
                    <>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium mr-1">
                                Total time spent
                            </CardTitle>
                            <TimerIcon />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                <UnitSuffix
                                    suffix="Minutes"
                                    noSuffixSpacing={true}
                                    value={
                                        props.data.totalTimeSpent
                                    }
                                    units={{
                                        3: "K",
                                        6: "M",
                                        9: "B",
                                        12: "T",
                                    }}
                                />minutes
                            </div>
                        </CardContent>
                    </>
                </Card>
                <Card>
                    <>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium mr-1">
                                Average Delivery Fee
                            </CardTitle>
                            <DollarSign />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                <UnitSuffix
                                    prefix="₦"
                                    noSuffixSpacing={true}
                                    value={
                                        props.data.averageDelivery
                                    }
                                    units={{
                                        3: "K",
                                        6: "M",
                                        9: "B",
                                        12: "T",
                                    }}
                                />
                            </div>
                        </CardContent>
                    </>
                </Card>
                <Card>
                    <>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium mr-1">
                                Average time Spent on each delivery
                            </CardTitle>
                            <TimerIcon />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                <UnitSuffix
                                    suffix="Minutes"
                                    noSuffixSpacing={true}
                                    value={
                                        props.data.averageDeliveryTime
                                    }
                                    units={{
                                        3: "K",
                                        6: "M",
                                        9: "B",
                                        12: "T",
                                    }}
                                />minutes
                            </div>
                        </CardContent>
                    </>
                </Card>
                <Card>
                    <>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium mr-1">
                                Average Delivery distance
                            </CardTitle>
                            <LandPlot />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                <UnitSuffix
                                    suffix="Minutes"
                                    noSuffixSpacing={true}
                                    value={
                                        props.data.averageDeliveryDistance
                                    }
                                    units={{
                                        3: "K",
                                        6: "M",
                                        9: "B",
                                        12: "T",
                                    }}
                                />KM
                            </div>
                        </CardContent>
                    </>
                </Card>
            </div>
            <div />

                {/*<div*/}
                {/*    className={cn("w-full")}*/}
                {/*>*/}
                {/*    <CommissionBar data={props.data} />*/}
                {/*</div>*/}

            {/*<div className="grid grid-cols-3 gap-4 w-full">*/}
            {/*    <div*/}

            {/*    >*/}
            {/*        <AssetClassPie data={props.data} />*/}
            {/*    </div>*/}

            {/*    <div*/}

            {/*    >*/}
            {/*        <LoanTypeRadar data={props.data} />*/}
            {/*    </div>*/}

            {/*    <div*/}

            {/*    >*/}
            {/*        <RepDealsPie data={props.data} />*/}
            {/*    </div>*/}
            {/*</div>*/}


                <div

                >
                    <DriverCommissionBar data={props.data} />
                </div>
        </div>
    );
};

export default Stats;
