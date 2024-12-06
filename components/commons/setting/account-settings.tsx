"use client"

import * as React from "react"
import { useState } from "react"
import {
    LogOut,
    Users,
    Settings2,
    DollarSign
} from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar"
import {TeamSettings} from "@/components/commons/setting/team-settings";
import {FinanceSettings} from "@/components/commons/setting/finance-settings";
import {useProfile} from "@/contexts/profile-context";
import {Icons} from "@/components/commons/icons";
import {toast} from "sonner";


const data = {
    nav: [
        { name: "Team", icon: Users },
        { name: "Finances", icon: DollarSign },
        { name: "Account", icon: Settings2 },
        { name: "Logout", icon: LogOut },
    ],
}

export default function AccountSettings({ open, setOpen, tab }: { open: boolean; setOpen: (open: boolean) => void, tab?: string }) {
    const [activeTab, setActiveTab] = useState(tab ?? 'Team');
    const {profile} = useProfile()

    const handleCopy = async () => {
        const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite?orgId=${profile?.organization.inviteLink}`
        await navigator.clipboard.writeText(inviteLink ?? '');
        toast.success("Invite link copied to clipboard!", {
            dismissible: true,
        });
    };

    function getTabContent(tab: string) {
        switch (tab) {
            case 'Team':
                return <TeamSettings  />;
            case 'Finances':
                return (
                   <FinanceSettings />
                );
            case 'Account':
                return (
                    <div />
                );
            default:
                return <div>Select a tab</div>;
        }
    }

    function getTabHeader(tab: string) {
        switch (tab) {
            case 'Team':
                return (<div className="flex flex-col items-start justify-start w-full px-4 gap-1">
                    <h1 className="text-lg font-semibold">{activeTab}</h1>
                    <p className="text-sm text-muted-foreground">Configure the team members of your organization</p>
                </div>);
            case 'Finances':
                return (<div className="flex flex-col items-start justify-start w-full px-4 gap-1">
                    <h1 className="text-lg font-semibold">{activeTab}</h1>
                    <p className="text-sm text-muted-foreground">Manage your organization payment accounts and other finances</p>
                </div>);
            case 'Account':
                return (<div className="flex flex-col items-start justify-start w-full px-4 gap-1">
                    <h1 className="text-lg font-semibold">{activeTab}</h1>
                    <p className="text-sm text-muted-foreground">Configure your account like subscriptions, logo, and company name</p>
                </div>);
            default:
                return null;
        }
    }

    if(!profile) {
        return (
            <div className="flex flex-row items-center justify-center h-screen">
                <Icons.spinner className="h-8 w-8 animate-spin" />
            </div>
        )
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="overflow-hidden p-0 min-h-[60vh] min-w-[60vw] max-h-[60vh] max-w-[60vw]">
                <DialogTitle className="sr-only">Settings</DialogTitle>
                <DialogDescription className="sr-only">
                    Customize your settings here.
                </DialogDescription>
                <SidebarProvider className="items-start h-full min-h-min bg-white">
                    <Sidebar collapsible="none" className="hidden bg-muted md:flex">
                        <SidebarContent className="justify-between">
                            <SidebarGroup>
                                <SidebarGroupContent className="bg-muted">
                                    <SidebarMenu>
                                        {data.nav.map((item) => (
                                            <SidebarMenuItem key={item.name}>
                                                <SidebarMenuButton
                                                    className="outline-none"
                                                    asChild
                                                    isActive={item.name === activeTab}
                                                >
                                                    {item.name === 'Logout' ? (
                                                        <a href="/api/auth/logout">
                                                            <item.icon />
                                                            <span>Logout</span>
                                                        </a>
                                                    ) : (
                                                        <button onClick={() => setActiveTab(item.name)}>
                                                            <item.icon />
                                                            <span className={item.name === activeTab ? "font-bold" : ""} style={{ overflow: "visible" }}>
                                {item.name}
                              </span>
                                                        </button>
                                                    )}
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                            <div className="flex flex-col my-4 mx-4 overflow-hidden">
                                <div className="flex justify-start items-center gap-2 mb-2">
                                    {/*<ThemeCustomizer />*/}
                                    {/*<Button variant="ghost" size="icon" onClick={handleThemeChange}>*/}
                                    {/*    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}*/}
                                    {/*</Button>*/}
                                </div>
                                <h2 className="text-sm font-semibold">{profile.firstName} {profile.lastName}</h2>
                                <p className="text-xs text-muted-foreground">{profile.organization.name}</p>
                                <p className="text-xs text-muted-foreground">{profile.email}</p>
                            </div>
                        </SidebarContent>
                    </Sidebar>
                    <main className="flex max-h-[60vh] flex-1 flex-col overflow-hidden">
                        <header className="flex h-20 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                            {getTabHeader(activeTab)}
                        </header>
                        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
                            {getTabContent(activeTab)}
                        </div>
                    </main>
                </SidebarProvider>
            </DialogContent>
        </Dialog>
    )
}
