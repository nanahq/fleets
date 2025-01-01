import {Metadata, NextPage} from "next";
import {LayoutComponent} from "@/components/commons/layout";
import {DriversProvider} from "@/contexts/drivers-context";
import {ProfileProvider} from "@/contexts/profile-context";

import {DeliveriesProvider} from "@/contexts/deliveries-context";
export const metadata: Metadata = {
    title: "Dashboard - Fleet",
    description: "All-in-one logistics management platform",
};


// async function getInitialData(): Promise<{profile: any, deals: any[], team: any, contacts: any[], organizations: any[]}> {
//     cookies().getAll()
//     const auth = await getSession()
//     if(Boolean(auth?.accessToken)) {
//         const headers = {
//             'Authorization' : `Bearer ${auth?.accessToken}`
//         }
//         const [dealsResponse, teamResponse, contactsResponse, organizationsResponse, profileResponse] = await Promise.all([
//             fetch(`${process.env.API_ENDPOINT}/api/v1/deal/list`, {
//                 headers
//             }),
//             fetch(`${process.env.API_ENDPOINT}/api/v1/team/get-team`, {
//                 headers
//             }),
//             fetch(`${process.env.API_ENDPOINT}/api/v1/client/list`, {
//                 headers
//             }),
//             fetch(`${process.env.API_ENDPOINT}/api/v1/client/organizations`, {
//                 headers
//             }),
//             fetch(`${process.env.API_ENDPOINT}/api/v1/broker/profile`, {
//                 headers
//             })
//         ])
//
//
//         const [deals, team, contacts, organizations, profile] = await Promise.all([
//             dealsResponse.json(),
//             teamResponse.json(),
//             contactsResponse.json(),
//             organizationsResponse.json(),
//             profileResponse.json(),
//         ])
//         return  {
//             deals: Array.isArray(deals) ? deals : [],
//             contacts: Array.isArray(contacts) ? contacts : [],
//             organizations: Array.isArray(organizations) ? organizations : [],
//             team: !Object(team).hasOwnProperty('statusCode') ?  team : undefined,
//             profile: !Object(profile).hasOwnProperty('statusCode') ?  profile : undefined
//         }
//     } else {
//         throw new Error('No token found. please login to access this feature')
//     }
// }

const DashboardLayout: NextPage<any> = async ({ children }) => {
    // const ssrData = await getInitialData()
    // const  fallback = {
    //     '/api/team/get-team': ssrData?.team ?? undefined,
    //     '/api/broker/profile': ssrData?.profile ?? undefined,
    //     '/api/deal/list': ssrData?.deals ?? [],
    //     '/api/client/list': ssrData?.contacts ?? [],
    //     '/api/client/organizations': ssrData.organizations ?? []
    // }
    return (
        <ProfileProvider>
        <DriversProvider fallbackDrivers={[]} >
            <DeliveriesProvider fallbackDeliveries={[]}>
            <LayoutComponent
                defaultLayout={[15, 85]}
                defaultCollapsed={false}
                navCollapsedSize={4}
            >
                {children}
            </LayoutComponent>
            </DeliveriesProvider>
        </DriversProvider>
        </ProfileProvider>
    );
};

export default DashboardLayout
