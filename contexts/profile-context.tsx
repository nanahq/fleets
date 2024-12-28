"use client"
import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {FleetMemberI, FleetOrganizationI, VendorPayoutI} from '@nanahq/sticky'
import useSWR, {Fetcher} from "swr";


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

const fetcher: Fetcher<any, string>  = (url: string) =>
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
): JSX.Element | null {
    const [profile, setProfile]  = useState<ExtendedFleetMember | undefined>(undefined)
    const [payout, setPayout] = useState<VendorPayoutI[]>([])
    const [members, setMembers] = useState<FleetMemberI[]>([])
    const {data} = useSWR<any>('/api/fleet/member/populated', fetcher,  {
        fallbackData: props.fallbackProfile
    })

    const {data: membersData} = useSWR<any>('/api/fleet/member/all', fetcher,  {
        fallbackData: []
    })

    const {data: payoutData} = useSWR<any>('/api/fleet/payout/all', fetcher,  {
        fallbackData: []
    })



    useEffect(() => {
        if (Object(data).hasOwnProperty("organization")) {
            setProfile(data as ExtendedFleetMember);
        }
        if(Array.isArray(membersData)) {
            setMembers(membersData)
        }

        if(Array.isArray(payoutData)) {
            setPayout(payoutData)
        }
    }, [data, membersData]);

    return (
        <Profile.Provider value={{ profile, members, payout}}>
            {props.children}
        </Profile.Provider>
    );
}
