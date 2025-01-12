'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { closeDialogs, DialogsState, dialogsStateObservable } from "@/lib/store/dialogs-store";
import { useEffect, useState } from "react";
import { createUser } from "../actions";
import { useSession } from "next-auth/react";

const accessOptions = [
  { label: "Canva", value: "canva", icon: "/canva-icon.svg" },
  { label: "Clickup", value: "clickup", icon: "/clickup-icon.svg" },
  { label: "Github", value: "github", icon: "/github-icon.svg" },
  { label: "Hubspot", value: "hubspot", icon: "/hubspot-icon.svg" },
  { label: "Gmail", value: "gmail", icon: "/gmail-icon.svg" },
]

export default function NewAccessDialog() {
  const { data: session } = useSession();

  const [dialogState, setDialogState] = useState<DialogsState>({ open: false })
  const [selectedAccess, setSelectedAccess] = useState<string[]>([])

  const onOpenChange = () => {
    closeDialogs()
  }

  const onSubmit = async () => {

    const res = await createUser()

    console.log(res)
  }

  useEffect(() => {
    const subscription = dialogsStateObservable.subscribe(setDialogState)
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <Dialog
      open={dialogState.open === "new-access"}
      onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Set access
          </DialogTitle>
          <DialogDescription>
            Add or remove access for this user
          </DialogDescription>
        </DialogHeader>
        {accessOptions.map((option) => (
          <div key={option.value} className="relative flex w-full items-center gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-primary">
            <Switch
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedAccess([...selectedAccess, option.value])
                } else {
                  setSelectedAccess(selectedAccess.filter((access) => access !== option.value))
                }
              }}
              id={option.value}
              className="order-1 h-4 w-6 rounded-md after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2"
              aria-describedby={`${option.value}-description`}
            />
            <div className="flex grow items-center gap-3">
              <img src={option.icon} alt="" className="w-6 h-6 rounded-full ring-1 ring-offset-1 ring-border" />
              <div className="grid grow gap-2">
                <Label htmlFor={option.value}>
                  {option.label}
                </Label>
              </div>
            </div>
          </div>
        ))}
        <DialogFooter>
          <Button
            size="sm"
            type="button"
            onClick={onSubmit}
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
