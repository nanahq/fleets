"use client"
import {InviteForm} from "@/app/invite/component/crinvite-form";
import {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {formDataToObject} from "@/lib/utils";
import {toast} from "sonner";

export default function AcceptInvitePage() {
    const [submitting, setSubmitting] = useState(false)
    const params = useSearchParams();
    const orgId = params.get("orgId");
    const router = useRouter()
    const handleSubmit = async (e: any): Promise<void> => {
        e.preventDefault()
        const form = new FormData(e.target)

        const dataObject = formDataToObject<any>(form as any)

        if(dataObject.confirmPassword !== dataObject.password) {
            toast.error('Password and confirm password does not match')
            return
        }
        try {
            dataObject.confirmPassword = undefined
            dataObject.inviteLink = orgId
            setSubmitting(true)
            const res = await fetch('/api/fleet/invite/member', {
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
            void router.push('/login')
        } catch (error) {
            toast.error('Failed to create account')
        } finally {
            setSubmitting(false)
        }
    }

    if(!orgId) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background" style={{opacity: "0.96"}}>
                <div className="text-center p-6 rounded-lg">
                    <h1 className="text-3xl font-semibold text-foreground mb-4">
                        Invalid Invite Link
                    </h1>
                    <p className="text-md text-foreground mb-6">
                        This invite link is invalid. Please re-check
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
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
                           You have been invited to Join Fleet
                        </h1>
                        <p data-testid="RegisterPage.Subheading" className="text-sm text-muted-foreground">
                            Enter your details to get started
                        </p>
                    </div>
                    <InviteForm onSubmit={handleSubmit} formSubmissionStatus={submitting} />
                    <p data-testid="RegisterPage.Terms" className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    )
}
