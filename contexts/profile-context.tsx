"use client"
import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import { FleetMemberI, FleetOrganizationI} from '@nanahq/sticky'
import useSWR, {Fetcher} from "swr";


interface ExtendedFleetMember extends Omit<FleetMemberI, 'organization'> {
    organization: FleetOrganizationI
}
export interface ProfileProps {
    profile: ExtendedFleetMember | undefined,
    members: FleetMemberI[]
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
    const [members, setMembers] = useState<FleetMemberI[]>([])
    const {data} = useSWR<any>('/api/fleet/member/populated', fetcher,  {
        fallbackData: props.fallbackProfile
    })

    const {data: membersData} = useSWR<any>('/api/fleet/member/all', fetcher,  {
        fallbackData: []
    })


    useEffect(() => {
        if (Object(data).hasOwnProperty("organization")) {
            setProfile(data as ExtendedFleetMember);
        }
        if(Array.isArray(membersData)) {
            setMembers(membersData)
        }
    }, [data, membersData]);

    return (
        <Profile.Provider value={{ profile, members}}>
            {props.children}
        </Profile.Provider>
    );
}
