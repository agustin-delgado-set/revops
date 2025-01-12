"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { STAFF_TYPES } from "../adapter";
import { setDialogsState } from "@/lib/store/dialogs-store";

export type Users = {
  id: string;
  created_at: string;
  personal_email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  email: string;
  staff_type: string;
  department: string;
  onboarded: boolean;
  access: string[];
}

const accessIcons = {
  canva: "/canva-icon.svg",
  clickup: "/clickup-icon.svg",
  github: "/github-icon.svg",
  hubspot: "/hubspot-icon.svg",
  gmail: "/gmail-icon.svg",
}

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "created_at",
    header: () => (
      <div className="pl-4">
        Date
      </div>
    ),
    cell: ({ row }) => {
      return <div className="pl-4">
        {format(new Date(row.original.created_at), "dd MMM yyyy")}
      </div>
    },
  },
  {
    accessorKey: "first_name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="flex flex-col">
        <span className="font-medium">{row.original.last_name} {row.original.first_name}</span>
        <span className="text-muted-foreground text-xs">{row.original.personal_email}</span>
      </div>
    }
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="font-medium">{row.original.email}</span>
  },
  {
    accessorKey: "staff_type",
    header: "Type",
    cell: ({ row }) => {
      const type = STAFF_TYPES.find((type) => type.value === row.original.staff_type)
      return <span>{type?.label}</span>
    },
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {

      return row.original.department.charAt(0).toUpperCase() + row.original.department.slice(1)
    },
  },
  {
    accessorKey: "onboarded",
    header: "Status",
    cell: ({ row }) => {
      return <div className="min-w-[90px]">
        <Badge
          className="shadow-none"
          variant={row.original.onboarded ? "default" : "outline"}
        >
          {row.original.onboarded ? "Onboarded" : "Pending"}
        </Badge>
      </div>
    },
  },
  {
    accessorKey: "actions",
    header: () => (
      <div className="text-left pr-4">
        Access
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="relative min-w-[120px] h-10">
          <div className="group left-0 flex -space-x-3 hover:-space-x-0 transition-all absolute top-1/2 transform -translate-y-1/2">
            {!row.original.access.length && (
              <Button
                variant="outline"
                className="!h-7 !w-7 rounded-full shrink-0 p-0"
                onClick={() => setDialogsState({ open: "new-access", payload: row.original.id })}
              >
                <Plus />
              </Button>
            )}
            {row.original.access.sort().map((access) => (
              <Avatar
                key={access}
                className="h-7 w-7 ring ring-background transition-all hover:scale-110 bg-white hover:z-10"
              >
                <AvatarImage
                  src={accessIcons[access as keyof typeof accessIcons]}
                  alt={access}
                />
              </Avatar>
            ))}
          </div>
        </div>
      );
    },
  }
]
