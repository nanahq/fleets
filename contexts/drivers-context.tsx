"use client"
import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {DriverI} from '@nanahq/sticky'
import useSWR, {Fetcher} from "swr";

export interface DriversProps {
    drivers: DriverI[]
    selectedDriver: any
    setSelectedDriver: (driver: any) => void
    hasExistingDriverSelected: boolean
}

const Drivers = createContext<DriversProps>({} as any);

export function useDrivers(): DriversProps {
    return useContext(Drivers);
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


export function DriversProvider(
    props: PropsWithChildren<{fallbackDrivers: any[], fallbackOrganization: any[]}>
): JSX.Element | null {
    const [selectedDriver, setSelectedDriver] = useState<any>(null)
    const [hasExistingDriverSelected, setHasExistingDriverSelected] = useState(false)
    const [drivers, setDrivers]  = useState<DriverI[]>([])
    const {data: driversData} = useSWR<any>('/api/fleet/member/drivers', fetcher,  {
        fallbackData: props.fallbackDrivers
    })

    useEffect(() => {
        if (Array.isArray(driversData)) {
            setDrivers(driversData as any);
        }


        if (!hasExistingDriverSelected && drivers?.length > 0) {
            setSelectedDriver(drivers[0]);
        } else if (hasExistingDriverSelected && selectedDriver) {
            const updatedDriver = (driversData as DriverI[]).find(
                (c: any) => c._id === selectedDriver._id
            );
            if (updatedDriver) {
                setSelectedDriver(updatedDriver);
            }
        }
    }, [driversData, hasExistingDriverSelected, selectedDriver]);


    const handleSelect = (driver: any) => {
        setSelectedDriver(driver)
        setHasExistingDriverSelected(true)
    }

    return (
        <Drivers.Provider value={{ drivers, selectedDriver, setSelectedDriver: handleSelect, hasExistingDriverSelected}}>
            {props.children}
        </Drivers.Provider>
    );
}
