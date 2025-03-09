"use client";

import * as React from "react";
import { useState } from "react";
import AccountSettings from "./account-settings";
import { Menu} from "lucide-react";
import {useProfile} from "@/contexts/profile-context";


export function AccountSwitcher() {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const {profile} = useProfile()

    return (
        <>

            <div className="flex  w-full bg-nana-200 text-white flex-row items-center rounded cursor-pointer p-1.5 mt-3" onClick={() => setSettingsOpen(true)}>
                <Menu className="text-white mr-1 p-0" size={18} />
                <span className=" text-sm">{profile?.organization.name}</span>
            </div>
            <AccountSettings open={settingsOpen} setOpen={setSettingsOpen} />
        </>
    );
}
