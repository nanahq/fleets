"use client"

import Link from "next/link"

import {cn, formDataToObject} from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {LoginAccountForm} from "@/app/login/component/login-account-form";
import {useState} from "react";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import Image from "next/image";

import {  Package, Users, Activity } from 'lucide-react';


export default function LoginPage() {
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()

    const features = [
        {
            icon: <Package className="h-6 w-6 text-white" />,
            title: "Delivery Management",
            description: "Streamline your delivery operations with our centralized delivery system"
        },
        {
            icon: <Activity className="h-6 w-6 text-white" />,
            title: "Real-time Analytics",
            description: "Track your riders location and performance metrics and optimize your operations"
        }
    ];
    const handleSubmit = async (e: any): Promise<void> => {
        e.preventDefault()
        const form = new FormData(e.target)

        const dataObject = formDataToObject<any>(form as any)

        try {
            setSubmitting(true)
            const res = await fetch('/api/auth/fleet/login', {
                method: 'POST',
                body: JSON.stringify(dataObject),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(!res.ok) {
                const body = await res.json()
                throw body
            }

            toast.success('Login success!')
            router.push('/dashboard')
        } catch (error: any) {
            toast.error(error?.message ?? 'Failed to login into account')
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <div className="container relative hidden h-screen flex-col  md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

            <div className="relative hidden h-full flex-col bg-nana-100 p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-gradient-to-br from-nana-200 to-nana-100" />
                <div className="relative z-20 flex flex-col h-full">
                    <div className="flex-1">
                        <div className="space-y-6">
                            <h1 className="text-4xl font-bold leading-tight tracking-tighter mb-4">
                                Transform Your Delivery Operations
                            </h1>
                            <p className="text-lg text-white/90 mb-8">
                                One platform to discover, manage, and optimize your entire delivery ecosystem
                            </p>

                            <div className="grid gap-6">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                                        <div className="p-2 bg-white/10 rounded-lg">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{feature.title}</h3>
                                            <p className="text-sm text-white/75">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="relative mt-8">
                        <div className="absolute -top-16 left-0 right-0 h-16 bg-gradient-to-t from-nana-200/20 to-transparent" />
                        <Image
                            src="/image/image.png"
                            width={500}
                            height={500}
                            alt="Fleet by nana"
                            className="rounded-lg shadow-2xl border border-white/10"
                        />
                    </div>
                </div>
            </div>

            <div className="lg:p-8 flex flex-col">
                <div className="flex  flex-col items-center">
                 <span className="mr-4" data-testid="RegisterPage.AppLogo">
                            <img className="aspect-[4:1]" width={100} height={25}  src="/image/fleet-black.png" alt="Fleet By Nana" />
                             <p className="text-xs text-black font-light">
                                 All-in-one logistics platform
                             </p>
                        </span>
                </div>
                <div className="mx-auto flex w-full flex-col mt-20 justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2">
                        <h1 data-testid="RegisterPage.Heading" className="text-2xl font-semibold tracking-tight">
                            Welcome back
                        </h1>
                        <p data-testid="RegisterPage.Subheading" className="text-sm text-muted-foreground">
                            Login with your email and password
                        </p>
                    </div>
                    <LoginAccountForm formSubmissionStatus={submitting} onSubmit={handleSubmit} />
                    <p data-testid="RegisterPage.Terms" className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our Terms of Service and Privacy Policy.
                    </p>
                    <Link
                        data-testid="RegisterPage.LoginLink"
                        aria-disabled={true}
                        href="/create-account"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            // "absolute right-4 top-4 md:right-8 md:top-8"
                        )}
                    >
                        Don't have an account, Sign up!
                    </Link>
                </div>
            </div>
        </div>
    )
}
