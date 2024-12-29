"use client"
import React, { useState} from "react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {EllipsisVertical} from "lucide-react";
import {toast} from "sonner";
import {FleetMemberI, FleetOrganizationI} from '@nanahq/sticky'
import {Icons} from "@/components/commons/icons";
import {useProfile} from "@/contexts/profile-context";
export const TeamAdminManagement: React.FC<{isAdmin: boolean, member: FleetMemberI }> = ({ member}) => {
    const [open, setOpen] = useState(false)
    const [removing, setRemoving] = useState(false)
    const [loading, setLoading] = useState(false)
    // const removeFromTeam = async () => {
    //     try {
    //         setRemoving(true)
    //         await fetch('/api/team/remove',{
    //             method: 'PATCH',
    //             body: JSON.stringify({
    //                 teamId: team._id,
    //                 memberId: member._id
    //             }),
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         })
    //         void mutate('/api/team/get-team')
    //         toast.success('Success!')
    //         setOpen(false)
    //     } catch (error: any) {
    //         toast.error(error?.message ?? 'Something went wrong. try again later')
    //     } finally {
    //         setRemoving(false)
    //     }
    // }
    //
    //
    //
    // const makeAdmin = async () => {
    //     try {
    //         setLoading(true)
    //         await fetch('/api/team/add-admin',{
    //             method: 'PATCH',
    //             body: JSON.stringify({
    //                 teamId: team._id,
    //                 memberId: member._id
    //             }),
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         })
    //         void mutate('/api/team/get-team')
    //
    //         toast.success('Success!')
    //         setOpen(false)
    //     } catch (error: any) {
    //         toast.error(error?.message ?? 'Something went wrong. try again later')
    //     } finally {
    //         setLoading(false)
    //     }
    // }



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="text-xs bg-transparent"
                    size={"icon"}
                    variant="outline"
                >
                    <EllipsisVertical className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Team Management</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex flex-row items-center space-x-3">
                        <Button
                            type={"button"}
                            disabled={removing}
                            variant="destructive"
                            // onClick={removeFromTeam}
                        >
                            {removing && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Remove from team
                        </Button>
                        {!member.isOwner && (
                            <Button
                                type={"button"}
                                disabled={loading}
                                variant="default"
                                // onClick={makeAdmin}
                            >
                                {loading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Make admin
                            </Button>
                        )}
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
