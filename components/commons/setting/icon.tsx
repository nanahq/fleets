"use client";

import * as React from "react";
import { useState } from "react";
import { useTheme } from "next-themes";
import AccountSettings from "./account-settings";
import {User} from "lucide-react";

interface AccountSwitcherProps {
    isCollapsed: boolean;
}

export function AccountSwitcher({ isCollapsed }: AccountSwitcherProps) {
    const [settingsOpen, setSettingsOpen] = useState(false);

    return (
        <>

            <div className="flex items-center justify-center rounded-lg p-1 hover:bg-muted hover:border-primary hover:border-[1px] hover:cursor-pointer focus-visible:ring-0" onClick={() => setSettingsOpen(true)}>
                <img
                    src="/image/nana-icon.png"
                    className="h-7 w-7 rounded-lg object-contain"
                />
            </div>
            <AccountSettings open={settingsOpen} setOpen={setSettingsOpen} />
        </>
    );
}
