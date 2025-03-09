import {PropsWithChildren, Suspense} from "react";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: "Welcome back - Fleet",
    description: "Login to your account",
}

export default function CreatAccountLayout (props: PropsWithChildren<{}>) {
    return (
            <div className="bg-white rounded-lg min-h-screen">
                {props.children}
            </div>
    )
}
