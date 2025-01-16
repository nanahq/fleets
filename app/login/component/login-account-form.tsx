"use client";

import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {useFormState} from 'react-dom'
import {useRef} from "react";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/commons/icons";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    onSubmit: (e: any) => void
    formSubmissionStatus: boolean
}


export function LoginAccountForm({ className, formSubmissionStatus, onSubmit, ...props }: UserAuthFormProps) {
    return (
        <div className={cn("grid gap-6",)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label
                            data-testid="loginEmailLabel"
                            htmlFor="email">
                            Email
                        </Label>
                        <Input
                            data-testid="loginEmailInput"
                            required={true}
                            name="email"
                            id="email"
                            placeholder="email"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect="off"
                        />
                    </div>
                        <div className="grid gap-2">
                            <Label
                                data-testid="loginPasswordLabel"
                                htmlFor="password">
                                Password
                            </Label>
                            <Input
                                data-testid="loginPasswordInput"
                                required={true}
                                name="password"
                                id="password"
                                placeholder="password"
                                type="password"
                                autoCapitalize="none"
                                autoComplete="current-password"
                                autoCorrect="off"
                            />
                        </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={formSubmissionStatus}>
                        {formSubmissionStatus && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Continue
                    </Button>
                </div>
            </form>
        </div>
    )
}
