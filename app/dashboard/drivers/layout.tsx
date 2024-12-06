import {PropsWithChildren, Suspense} from "react";

export default function CreatAccountLayout (props: PropsWithChildren<{}>) {
    return (
        <Suspense fallback={<div>Loading.....</div>}>
            <div className="overflow-hidden h-screen">
                {props.children}
            </div>
        </Suspense>
    )
}
