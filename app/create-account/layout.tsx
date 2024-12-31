import {PropsWithChildren, Suspense} from "react";

export default function CreatAccountLayout (props: PropsWithChildren<{}>) {
    return (
        <Suspense fallback={<div>Loading.....</div>}>
            <div className="min-h-screen">
                    {props.children}
            </div>
        </Suspense>
    )
}
