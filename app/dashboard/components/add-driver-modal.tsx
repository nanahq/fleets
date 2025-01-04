import {PropsWithChildren, useState} from "react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {mutate} from "swr";
import {formDataToObject} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {useProfile} from "@/contexts/profile-context";
import {toast} from "sonner";
import {Icons} from "@/components/commons/icons";
import {internationalisePhoneNumber} from '@nanahq/sticky'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
export const AddDriverModal: React.FC<PropsWithChildren<{open: boolean, setOpen: any}>> = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const {profile} = useProfile()
    const handleSubmit = async (e: any) => {
            e.preventDefault()
            const form = new FormData(e.target)
            const data = formDataToObject(form as any)

        try{
            setIsLoading(true)
            const res = await fetch( '/api/fleet/owner/driver',{
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...data, phone: internationalisePhoneNumber(data?.phone ?? ''), organization: profile?.organization._id, type: "DELIVER_PRE_ORDER"}),
                method: 'POST',
            })

            if(!res.ok) {
                if(res.body) {
                    const body = await res.json()
                    throw body
                } else {
                    throw res
                }
            }
            await mutate('/api/fleet/member/drivers')
            props.setOpen(false)
            toast.success('Driver created!')
        } catch (error: any) {
            toast.error(error?.message ?? 'Failed to created a driver. Something went wrong')

        } finally {
            setIsLoading(false)
        }

    }


    return (
        <Dialog open={props.open} onOpenChange={props.setOpen}>
            <DialogTrigger asChild={true}>
                {props.children}
            </DialogTrigger>
            <DialogContent
                data-testid="ClientPage.AddClient.Modal"
                className="sm:max-w-[425px] max-w-[1000px]"
            >
                <DialogHeader>
                    <DialogTitle data-testid="ClientPage.AddClient.Title">
                        Create driver
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 mb-5">
                        <div className="flex flex-row space-x-2 items-center">
                            <div className="grid gap-2">
                                <Label
                                    data-testid="loginEmailLabel"
                                    htmlFor="firstName">
                                    First name
                                </Label>
                                <Input
                                    data-testid="loginEmailInput"
                                    required={true}
                                    name="firstName"
                                    id="firstName"
                                    placeholder="first name"
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="off"
                                    autoCorrect="off"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label
                                    data-testid="loginEmailLabel"
                                    htmlFor="lastName">
                                    Last Name
                                </Label>
                                <Input
                                    data-testid="loginEmailInput"
                                    required={true}
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Last name"
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="off"
                                    autoCorrect="off"
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label
                                data-testid="loginEmailLabel"
                                htmlFor="email">
                                Email
                            </Label>
                            <Input
                                data-testid="loginEmailInput"
                                required={true}
                                name="email"
                                id="email"
                                placeholder="email"
                                type="text"
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect="off"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label
                                data-testid="loginEmailLabel"
                                htmlFor="phone">
                                Phone number
                            </Label>
                            <Input
                                data-testid="loginEmailInput"
                                required={true}
                                name="phone"
                                id="phone"
                                placeholder="Phone"
                                type="text"
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect="off"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label
                                data-testid="loginPasswordLabel"
                                htmlFor="password">
                                Password
                            </Label>
                            <Input
                                data-testid="loginPasswordInput"
                                required={true}
                                name="password"
                                id="password"
                                placeholder="password"
                                type="password"
                                autoCapitalize="none"
                                autoComplete="current-password"
                                autoCorrect="off"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label
                                data-testid="loginPasswordLabel"
                                htmlFor="password">
                                State of operations for driver
                            </Label>
                            <Select
                                name="state"
                                required={true}
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select State" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem key="KANO" value="KANO">KANO</SelectItem>
                                    <SelectItem key="KADUNA" value="KADUNA">KADUNA</SelectItem>
                                    <SelectItem key="ABUJA" value="ABUJA">ABUJA</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            data-testid="ClientPage.AddClient.SubmitButton"
                            type="submit"
                        >
                            {isLoading && <Icons.spinner className="h-4 w-4 animate-spin" />}
                            Create
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    );
}
