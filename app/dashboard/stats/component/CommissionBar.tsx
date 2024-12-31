"use client";

import {Bar, BarChart, CartesianGrid, XAxis} from "recharts";
import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {FleetOrgStat} from "@nanahq/sticky";

export function generateGrayShade(index: number, total: number): string {
    const maxShade = 20;
    const minShade = 80;
    const shade = Math.round(maxShade + ((minShade - maxShade) * index) / total);
    return `hsl(0, 0%, ${shade}%)`;
}

const chartConfig = {
    earnings: {
        label: "Earnings",
    },
} satisfies ChartConfig;


export const DriverCommissionBar: React.FC<{data: FleetOrgStat}> = (props) => {
    const chartDataProd = React.useMemo(() => {
        if (!props.data.driversEarnings) return [];

        return Object.entries(props.data.driversEarnings).map(([name, earnings], index, array) => {
            return {
                name,
                earnings,
                fill: generateGrayShade(index, array.length)
            }
        });
    }, [props.data.driversEarnings]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Total earnings by driver</CardTitle>
                <CardDescription>
                    Displaying the total earnings for each driver during
                    the selected time period
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full max-h-[400px]">
                    <BarChart
                        data={chartDataProd}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    hideLabel
                                    nameKey="earnings"
                                    labelStyle={{ padding: "10px" }}
                                />
                            }
                        />
                        <Bar
                            dataKey="earnings"
                            fill="var(--color-desktop)"
                            radius={8}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

