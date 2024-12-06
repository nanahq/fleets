"use client"
import Link from "next/link"

import {cn, formDataToObject} from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {CreateAccountForm} from "@/app/create-account/component/create-account-form";
import {useState} from "react";
import {toast} from "sonner";
import {useRouter} from  "next/navigation";

interface UserRegistration {
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
    phone: string;
    password: string;
    confirmPassword?: string;
}

export default function RegisterPage() {
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        const form = new FormData(e.target)

        const dataObject = formDataToObject<UserRegistration>(form as any)

        if(dataObject.confirmPassword !== dataObject.password) {
            toast.error('Password and confirm password does not match')
            return
        }
      try {
          dataObject.confirmPassword = undefined
          setSubmitting(true)

          const res = await fetch('/api/fleet/create/organization', {
              method: 'POST',
              body: JSON.stringify(dataObject),
              headers: {
                  'Content-Type': 'application/json'
              }
          })

          if(!res.ok) {
              throw res
          }

          toast.success('Create account was successful. You can now login to your account')
          router.push('/login')
      } catch (error) {
            toast.error('Failed to create account')
      } finally {
          setSubmitting(false)
      }
    }
    return (
        <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <Link
                data-testid="RegisterPage.LoginLink"
                aria-disabled={true}
                href="/login"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute right-4 top-4 md:right-8 md:top-8"
                )}
            >
                Have an account? Login
            </Link>
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
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
                           Join Fleet
                        </h1>
                        <p data-testid="RegisterPage.Subheading" className="text-sm text-muted-foreground">
                            Get your company's account up and running in 5 minutes
                        </p>
                    </div>
                    <CreateAccountForm formSubmissionStatus={submitting} onSubmit={handleSubmit} />
                    <p data-testid="RegisterPage.Terms" className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    )
}
