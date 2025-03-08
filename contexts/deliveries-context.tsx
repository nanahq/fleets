

"use client"
import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {DeliveryI} from '@nanahq/sticky'
import useSWR, {Fetcher} from "swr";

export interface DeliveriesProps {
    deliveries: DeliveryI[]
    mapDeliveries: DeliveryI[]
    selectedDelivery: any
    setSelectedDelivery: (driver: any) => void
    hasExistingDeliverySelected: boolean
}

const Deliveries = createContext<DeliveriesProps>({} as any);

export function useDelivery(): DeliveriesProps {
    return useContext(Deliveries);
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


export function DeliveriesProvider(
    props: PropsWithChildren<{fallbackDeliveries: any[]}>
): JSX.Element | null {
    const [selectedDelivery, setSelectedDelivery] = useState<any>(null)
    const [hasExistingDeliverySelected, setHasExistingDeliverySelected] = useState(false)
    const [deliveries, setDeliveries]  = useState<DeliveryI[]>([])
    const [mapDeliveries, setMapDeliveries]  = useState<DeliveryI[]>([])

    const {data: deliveriesData} = useSWR<any>('/api/fleet/member/deliveries', fetcher,  {
        fallbackData: props.fallbackDeliveries
    })

    const {data: mapDeliveriesData} = useSWR<any>('/api/fleet/map-deliveries', fetcher,  {
        fallbackData: props.fallbackDeliveries
    })


    useEffect(() => {
        if (Array.isArray(mapDeliveriesData)) {
            setMapDeliveries(mapDeliveriesData as any);
        }
        if (Array.isArray(deliveriesData)) {
            setDeliveries(deliveriesData as any);
        }
        if (!hasExistingDeliverySelected && deliveries?.length > 0) {
            setSelectedDelivery(deliveries[0]);
        } else if (hasExistingDeliverySelected && selectedDelivery) {
            const updatedDelivery = (deliveriesData as DeliveryI[]).find(
                (c: any) => c._id === selectedDelivery._id
            );
            if (updatedDelivery) {
                setSelectedDelivery(updatedDelivery);
            }
        }
    }, [deliveriesData,mapDeliveriesData, hasExistingDeliverySelected, selectedDelivery]);


    const handleSelect = (driver: any) => {
        setSelectedDelivery(driver)
        setHasExistingDeliverySelected(true)
    }

    return (
        <Deliveries.Provider value={{ mapDeliveries, deliveries, selectedDelivery, setSelectedDelivery: handleSelect, hasExistingDeliverySelected}}>
            {props.children}
        </Deliveries.Provider>
    );
}
