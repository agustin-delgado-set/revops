'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { closeDialogs, DialogsState, dialogsStateObservable } from "@/lib/store/dialogs-store";
import { cn } from "@/lib/utils";
import { LoaderCircle, TriangleAlert } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createUser, getHubspotUserByEmail, removeUser } from "../actions";
import { useUsers } from "../context";
import { Users } from "./columns";

const accessOptions = [
  { label: "Gmail", value: "gmail", icon: "/gmail-icon.svg" },
  { label: "Hubspot", value: "hubspot", icon: "/hubspot-icon.svg" },
  { label: "Slack", value: "slack", icon: "/slack-icon.svg" },
]

export default function NewAccessDialog() {
  const { data: session } = useSession();
  const { users, setUsers } = useUsers()

  const [dialogState, setDialogState] = useState<DialogsState>({ open: false })
  const [selectedAccess, setSelectedAccess] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const user = users.find((user) => user?.id === dialogState.payload)
  const newAccess = selectedAccess.filter((access) => !user?.access.includes(access))
  const removedAccess = user?.access.filter((access) => !selectedAccess.includes(access))

  const onOpenChange = () => {
    closeDialogs()
  }

  const onSubmit = async () => {
    if (!user) {
      console.error("User not found");
      return;
    }

    setLoading(true);

    let updatedUser = user;
    let finalEmailToUse = user.access.includes("gmail") ? user.email : user.personal_email;

    try {
      for (const access of removedAccess || []) {
        if (access === "gmail") {
          const gmailRes = await removeUser({
            access: "gmail",
            user_id: updatedUser.id,
            email: updatedUser.email,
            access_token: session?.accessToken as string
          });
          if (!gmailRes?.success) {
            toast.error("Error removing Gmail access");
          } else if ("user" in gmailRes && gmailRes.user) {
            updatedUser = gmailRes.user as Users;
            finalEmailToUse = updatedUser.email;
            toast.success("Gmail access removed");
          }
        }

        if (access === "hubspot") {
          const hubspotUserId = await getHubspotUserByEmail({ email: finalEmailToUse });
          const hubspotRes = await removeUser({
            access: "hubspot",
            hubspot_user_id: hubspotUserId,
            user_id: updatedUser.id
          });
          if (!hubspotRes?.success) {
            toast.error("Error removing Hubspot access");
          } else if ("user" in hubspotRes && hubspotRes.user) {
            updatedUser = hubspotRes.user as Users;
            finalEmailToUse = updatedUser.email;
            toast.success("Hubspot access removed");
          }
        }

        if (access === "slack") {
          const slackRes = await removeUser({
            access: "slack",
            user_id: updatedUser.id,
            email: updatedUser.email
          });
          if (!slackRes?.success) {
            toast.error("Error removing Slack access");
          } else if ("user" in slackRes && slackRes.user) {
            updatedUser = slackRes.user as Users;
            finalEmailToUse = updatedUser.email;
            toast.success("Slack access removed");
          }
        }
      }

      if (newAccess.includes("gmail")) {
        const gmailRes = await createUser({
          access: "gmail",
          email: updatedUser.email,
          user_id: updatedUser.id,
          access_token: session?.accessToken as string,
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name
        });

        if (!gmailRes?.success) {
          toast.error("Error granting Gmail access");
        } else if ("user" in gmailRes && gmailRes.user) {
          updatedUser = (gmailRes as { user: Users }).user;
          finalEmailToUse = updatedUser.email;
          toast.success("Gmail access granted");
        }
      }

      if (newAccess.includes("hubspot")) {
        const hubspotRes = await createUser({
          access: "hubspot",
          email: finalEmailToUse,
          user_id: updatedUser.id
        });

        if (!hubspotRes?.success) {
          toast.error("Error granting Hubspot access");
        } else if ("user" in hubspotRes && hubspotRes.user) {
          updatedUser = hubspotRes.user as Users;
          finalEmailToUse = updatedUser.email;
          toast.success("Hubspot access granted");
        }
      }

      if (newAccess.includes("slack")) {
        const slackRes = await createUser({
          access: "slack",
          email: finalEmailToUse,
          user_id: updatedUser.id
        });
        if (!slackRes?.success) {
          toast.error("Error granting Slack access");
        } else if ("user" in slackRes && slackRes.user) {
          updatedUser = slackRes.user as Users;
          finalEmailToUse = updatedUser.email;
          toast.success("Slack access granted");
        }
      }

      setUsers((users) =>
        users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );

    } catch (err) {
      console.error("Error updating accesses", err);
      toast.error("Error updating accesses");
    } finally {
      setLoading(false);
      closeDialogs();
    }
  };


  useEffect(() => {
    const subscription = dialogsStateObservable.subscribe(setDialogState)
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (users) {
      setSelectedAccess(user?.access || [])
    }
  }, [user])

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
              checked={selectedAccess.includes(option.value)}
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

        <div className={cn(
          "fixed bottom-[-75px] w-full left-1/2 transform -translate-x-1/2 rounded-lg border border-border px-4 py-2 bg-background shadow-md transition-opacity duration-100",
          !!selectedAccess.length && !selectedAccess.includes("gmail") ? "opacity-100" : "opacity-0"
        )}>
          <p className="text-sm">
            <TriangleAlert
              className="-mt-0.5 me-3 inline-flex text-amber-500"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            If Gmail access is not granted, the user will be invited to the workspace with their personal email.
          </p>
        </div>

        <DialogFooter>
          <Button
            size="sm"
            type="button"
            disabled={!newAccess.length && !removedAccess?.length || loading}
            onClick={onSubmit}
          >
            {loading && <LoaderCircle className="animate-spin" />}
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
