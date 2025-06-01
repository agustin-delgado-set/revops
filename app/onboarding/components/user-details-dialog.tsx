"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { closeDialogs, dialogsStateObservable, DialogsState } from "@/lib/store/dialogs-store";
import { useEffect, useState } from "react";
import { useUsers } from "../context";
import { Users } from "./columns";
import { format } from "date-fns";

export default function UserDetailsDialog() {
    const { users } = useUsers();
    const [dialogState, setDialogState] = useState<DialogsState>({ open: false });

    useEffect(() => {
        const subscription = dialogsStateObservable.subscribe(setDialogState);
        return () => subscription.unsubscribe();
    }, []);

    const user = users.find((u) => u.id === dialogState.payload);

    return (
        <Dialog open={dialogState.open === "user-details"} onOpenChange={closeDialogs}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>User details</DialogTitle>
                    <DialogDescription>Full information of the selected user</DialogDescription>
                </DialogHeader>
                {user ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 py-2 text-sm max-h-[80vh] overflow-y-auto">
                        <div className="flex flex-col">
                            <span className="font-semibold">Name:</span>
                            <span>
                                {user.first_name} {user.last_name}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Personal email:</span>
                            <span>{user.personal_email}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Corporate email:</span>
                            <span>{user.email}</span>
                        </div>
                        <div className="flex flex-col md:col-span-2">
                            <span className="font-semibold">Address:</span>
                            <span>{user.address}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Phone number:</span>
                            <span>{user.phone_number}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Staff type:</span>
                            <span>{user.staff_type}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Department:</span>
                            <span>{user.department}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Timezone:</span>
                            <span>{user.timezone}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Availability (hours/week):</span>
                            <span>{user.availability}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Local currency:</span>
                            <span>{user.local_currency}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Has UK bank account:</span>
                            <span>{user.has_uk_bank_account ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Payment mechanism:</span>
                            <span>{user.payment_mechanism}</span>
                        </div>
                        <div className="flex flex-col md:col-span-2">
                            <span className="font-semibold">Languages:</span>
                            <span>
                                {user.languages && user.languages.length > 0
                                    ? user.languages.join(", ")
                                    : "None"}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Status:</span>
                            <span>{user.status === "pending" ? "Pending" : "Onboarded"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Access:</span>
                            <span>
                                {user.access && user.access.length > 0 ? user.access.join(", ") : "None"}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Contract signed date:</span>
                            <span>
                                {user.contract_signed_date
                                    ? format(new Date(user.contract_signed_date), "PP")
                                    : "-"}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Created at:</span>
                            <span>{user.created_at ? format(new Date(user.created_at), "PP") : "-"}</span>
                        </div>
                    </div>
                ) : (
                    <div>User not found.</div>
                )}
                <DialogFooter>{/* Read only, no actions */}</DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
