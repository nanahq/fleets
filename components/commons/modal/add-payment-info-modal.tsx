import {PropsWithChildren, useEffect, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {mutate} from "swr";
import {formDataToObject} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {useProfile} from "@/contexts/profile-context";
import {toast} from "sonner";
import {Icons} from "@/components/commons/icons";
import {Separator} from "@/components/ui/separator";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const supportedBanksArray: string[] = [
    '000014', // ACCESS_BANK
    '000005', // ACCESS_BANK DIAMOND
    '000010', // ECO_BANK
    '000007', // FIDELITY_BANK
    '000016', // FIRST_BANK
    '090409', // FCMB
    '000013', // GT_BANK
    '000002', // KEY_STONE_BANK
    '100007', // STANBIC_BANK
    '000001', // STERLING_BANK
    '000018', // UNION_BANK
    '000004', // UBA
    '000011', // UNITY_BANK
    '000017', // WEMA_BANK
    '000015', // ZENITH_BANK,
    "090405", // moniepoint
    "100004", // OPAY
    "000026", // TAJ,
    "000006" //JAIZ
];

export const AddPaymentInfoModal: React.FC<PropsWithChildren<any>> = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [banks, setBanks] = useState<Array<{label: string, value: string}>>([])
    const [open, setOpen] = useState(false)
    const [resolvingBank, setResolvingBank] = useState(false)
    const {profile} = useProfile()
    const [bankName, setBankName] = useState<string>('')
    const [bankAccountName, setBankAccountName] = useState<string>('')
    const [bankAccountNumber, setBankAccountNumber] = useState<string>('')
    const [selectedBank, setSelectedBank] = useState<string>('')


    const [fetchingBank, setFetchingBank] = useState(false)


    useEffect(() => {
        void fetchBanks()
    }, [])
    const fetchBanks = async () => {
        try {
            setFetchingBank(true)
            const res = await fetch(`https://api.payonus.com/payout/transfer/api/v1/get-list-of-banks`, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer sk_live_J9BBY7JAMVNAGRYQDLFXDPMA1PGI'
                }
            })

            if(!res.ok) {
                throw res
            }

            const data = await res.json()
            const formattedBanks = data?.data.banks?.filter((bank: any) => supportedBanksArray.includes(bank.bankCode)).map((bank: any) => ({value: bank.bankCode, label: bank.bankName}))

            setBanks(formattedBanks)

        } catch (error) {
            console.error(error)
        } finally {
            setFetchingBank(false)
        }
    }
    const handleSubmit = async () => {

        if(!Boolean(bankAccountNumber)) {
            toast.info('No bank account number entered!')
        }
        if(!Boolean(bankAccountName)) {
            toast.info('We cant not confirm the name of this account!')
        }

        try{
            setIsLoading(true)
            const res = await fetch( '/api/fleet/owner/update-organization',{
                headers: {
                    'Content-Type': 'application/json',
                },
                body:  JSON.stringify({
                    payment: {
                        bankName: banks.find(b => b.value === selectedBank)?.label,
                        bankAccountName,
                        bankAccountNumber,
                    }
                }),
                method: 'PUT',
            })

            if(!res.ok) {
                throw res
            }
            setOpen(false)
            setSelectedBank('')
            setBankAccountName('')
            setBankAccountNumber('')
            toast.success('Bank account added')
            await mutate('/api/fleet/member/populated')
        } catch (error) {
            console.log(error)
            toast.error('Failed to add bank account')
        } finally {
            setIsLoading(false)
        }

    }


    const handleAccountNumber = async (value: string) => {
        if (value.length <= 10) {
            setBankAccountNumber(value);

            if(value.length === 10) {
                if (selectedBank !== undefined) {
                    try {
                        setResolvingBank(true)
                        const res  = await fetch('https://api.payonus.com/payout/transfer/api/v1/verify-bank-account', {
                            method: 'POST',
                            headers: {
                                Authorization: 'Bearer sk_live_J9BBY7JAMVNAGRYQDLFXDPMA1PGI',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "accountNumber":  value,
                                "beneficiaryBank": selectedBank
                            })
                        })

                        if(!res.ok) {
                            throw res
                        }

                        const data = await res.json()
                        setBankAccountName(data?.data?.accountName)
                    } catch (error) {
                        console.log(error)
                    } finally {
                        setResolvingBank(false)
                    }
                }
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild={true}>
                {props.children}
            </DialogTrigger>
            <DialogContent
                data-testid="ClientPage.AddClient.Modal"
                className="sm:max-w-[425px] max-w-[1000px]"
            >
                <DialogHeader>
                    <DialogTitle data-testid="ClientPage.AddClient.Title">
                        Add Remittance bank
                    </DialogTitle>
                    <DialogDescription className="text-xs">This bank account will be used to remit your earnings. Earnings are paid every next day. Contact our customer support for more information about remittance and payments</DialogDescription>
                </DialogHeader>
                <Separator />
                {fetchingBank ? (
                    <div className="flex flex-row items-center">
                        <Icons.spinner className="h-4 w-4 animate-spin" />
                        <p>Fetching bank list. Please wait</p>
                    </div>
                ): (
                    <div className="flex flex-col gap-4 mb-5">
                        <div className="grid gap-2">
                            <Label
                                data-testid="loginEmailLabel"
                                htmlFor="firstName">
                                Bank
                            </Label>
                        <Select
                            value={selectedBank as any}
                            onValueChange={setSelectedBank}
                        >
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select bank" />
                            </SelectTrigger>
                            <SelectContent>
                                {banks.map(bank => (
                                    <SelectItem key={bank.value} value={bank.value}>{bank.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label
                                data-testid="loginEmailLabel"
                                htmlFor="lastName">
                                Bank Account Number
                            </Label>
                            <Input
                                disabled={resolvingBank}
                                data-testid="loginEmailInput"
                                name=""
                                id="lastName"
                                placeholder="Bank account"
                                type="text"
                                onChange={e => handleAccountNumber(e.target.value)}
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect="off"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label
                                data-testid="loginEmailLabel"
                                htmlFor="email">
                                Bank Account Name
                            </Label>
                            <Input
                                disabled={true}
                                contentEditable="false"
                                value={bankAccountName}
                                data-testid="loginEmailInput"
                                name="email"
                                id="email"
                                placeholder={resolvingBank ? 'Getting account name...' : 'Name of account'}
                                type="text"
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect="off"
                            />
                        </div>
                    </div>
                )}
                    <DialogFooter>
                        <Button
                            onClick={handleSubmit}
                            data-testid="ClientPage.AddClient.SubmitButton"
                            type="button"
                        >
                            {isLoading && <Icons.spinner className="h-4 w-4 animate-spin" />}
                            Add bank account
                        </Button>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
