import {Card, CardContent, CardHeader, CardTitle, CardFooter} from "@/components/ui/card";
import {DataTable} from "@/components/commons/table/table";
import {TeamTableColumn} from "@/components/commons/table/column-team-members";
import * as React from "react";
import {PayoutTableColumn} from "@/components/commons/table/column-payout";
import {VendorPayoutI} from "@nanahq/sticky";
import {Settings} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useProfile} from "@/contexts/profile-context";
import {useMemo} from "react";
import {AddPaymentInfoModal} from "@/components/commons/modal/add-payment-info-modal";

const payout: Partial<VendorPayoutI>[] = [
{
    earnings: 500000,
paid: true,
    refId: 67890,
}
]
export const FinanceSettings = () => {
    const { profile } = useProfile()

    const hasPaymentInfo = useMemo(() => {
        return Boolean(profile?.organization?.payment)
    }, [profile?.organization.payment])
    return (
        <div>
            { !hasPaymentInfo ?(
                    <div className="flex items-center my-4 flex-col space-y-2">
                        <div className="">No payment information added</div>
                        <AddPaymentInfoModal>
                            <Button variant="outline" className="max-w-max" size="sm">
                                Add payment information
                            </Button>
                        </AddPaymentInfoModal>
                    </div>
                )
           : (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between w-full">
                    <CardTitle>Payout bank account</CardTitle>
                    {hasPaymentInfo && (
                        <Button size="sm" variant="outline" className="text-sm">
                            Edit bank information
                            <Settings className="w-4 h-4" />
                        </Button>
                    )}
                </CardHeader>
                <CardContent>
                    {hasPaymentInfo ? (
                        <div className="flex flex-row justify-between w-full">
                            <div className="flex flex-col text-base font-medium text-foreground">
                                <p>Zenith Bank</p>
                                <p>Baitana Logistics</p>
                                <p>1234567890</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-2">
                            <div className="">No payment information added</div>
                            <Button variant="outline" className="max-w-max" size="sm">
                                Add payment information
                            </Button>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <span className="text-green-600 text-sm">Active</span>
                </CardFooter>
            </Card>
            )}
            <div className="flex flex-col mt-5 space-y-4">
                <div>
                    <h1 className="text-lg font-semibold">Payout history</h1>
                    <p className="text-sm text-muted-foreground">Payout history from 10 days prior</p>
                </div>
                {/*<DataTable*/}
                {/*    columns={*/}
                {/*        PayoutTableColumn() as any*/}
                {/*    }*/}
                {/*    data={payout as any}*/}
                {/*/>*/}
            </div>
        </div>
    )
}
