"use client"
import React, { createContext, PropsWithChildren, useContext } from "react";
import {FleetMemberI, FleetOrganizationI, FleetOrgStat, VendorPayoutI} from '@nanahq/sticky'
import useSWR, { Fetcher } from "swr";

interface ExtendedFleetMember extends Omit<FleetMemberI, 'organization'> {
    organization: FleetOrganizationI
}

export interface ProfileProps {
    profile: ExtendedFleetMember | undefined,
    members: FleetMemberI[]
    payout: VendorPayoutI[]

}

const Profile = createContext<ProfileProps>({} as any);

export function useProfile(): ProfileProps {
    return useContext(Profile);
}

const fetcher: Fetcher<any, string> = (url: string) =>
    fetch(url)
        .then((res) => {
            if(!res.ok) {
                throw res.statusText
            }
            return res.json()
        })
        .catch((error) => {
            console.error(error);
        }) as any;

export function ProfileProvider(
    props: PropsWithChildren<{fallbackProfile?: ExtendedFleetMember}>
): JSX.Element {
    const {data: profile} = useSWR<ExtendedFleetMember>('/api/fleet/member/populated', fetcher, {
    })

    const {data: members = []} = useSWR<FleetMemberI[]>('/api/fleet/member/all', fetcher, {
        fallbackData: []
    })

    const {data: payout = []} = useSWR<VendorPayoutI[]>('/api/fleet/payout/all', fetcher, {
        fallbackData: []
    })


    return (
        <Profile.Provider value={{
            profile: profile && 'organization' in profile ? profile : undefined,
            members,
            payout
        }}>
            {props.children}
        </Profile.Provider>
    );
}
