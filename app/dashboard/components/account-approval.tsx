"use client";
import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Home } from "lucide-react";
import Lottie from "react-lottie";
import * as PendingAnimationData from "@/app/lotties/pending.json";

export const ApprovalOverlay= () => {
    return (
        <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
            <Card className="flex flex-col justify-center">
                <CardHeader className="text-3xl pb-2">
                    <CardTitle>Your Account Is Pending Approval</CardTitle>
                </CardHeader>
                <CardDescription className="flex flex-col items-center justify-center px-5 text-center text-lg">
                    Contact Fleet to get your account approved
                    <a href="/" className="text-left underline pl-2 pt-2">
                            Go to Fleet Website
                    </a>
                </CardDescription>
                <CardContent>
                    <PendingLottieAnimations />
                </CardContent>
            </Card>
        </div>
    );
};



type AnimationProps = {
    width?: number;
    height?: number;
};


export const PendingLottieAnimations = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: PendingAnimationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="flex flex-col my-4 justify-center items-center">
            <Lottie options={defaultOptions} height={250} width={250} />
        </div>
    );
};
