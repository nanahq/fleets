"use client"

import Link from "next/link"

import {cn, formDataToObject} from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {LoginAccountForm} from "@/app/login/component/login-account-form";
import {useState} from "react";
import {toast} from "sonner";
import {router} from "next/client";
import {useRouter} from "next/navigation";


export default function LoginPage() {
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
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
                throw res
            }

            toast.success('Login success!')
            router.push('/dashboard')
        } catch (error) {
            console.error(error?.message)
            toast.error('Failed to login into account')
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <Link
                data-testid="RegisterPage.LoginLink"
                aria-disabled={true}
                href="/create-account"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute right-4 top-4 md:right-8 md:top-8"
                )}
            >
                Don't have an account, Sign up!
            </Link>
            <div className="relative hidden h-full flex-col bg-nana-100 p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-nana-200" />
                <div className="relative z-20">
                    <div className="flex h-full flex-col items-between">
                            <span className="mr-4" data-testid="RegisterPage.AppLogo">
                            <h1 className="text-3xl font-bold text-white">Fleet</h1>
                             <p className="text-sm text-white font-light">
                                 All-in-one logistics platform
                             </p>
                        </span>
                        <div />
                    </div>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
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
                </div>
            </div>
        </div>
    )
}
