"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { setDialogsState } from "@/lib/store/dialogs-store";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Pencil, Plus } from "lucide-react";
import { STAFF_TYPES } from "../adapter";
import { Checkbox } from "@/components/ui/checkbox";

export type Users = {
  id: number;
  created_at: string;
  personal_email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  email: string;
  staff_type: string;
  department: string;
  status: "pending" | "onboarded";
  access: string[];
}

export const accessIcons = {
  canva: "/canva-icon.svg",
  clickup: "/clickup-icon.svg",
  github: "/github-icon.svg",
  hubspot: "/hubspot-icon.svg",
  gmail: "/gmail-icon.svg",
  slack: "/slack-icon.svg",
}

export const columns: ColumnDef<Users>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "created_at",
    header: () => (
      <div className="pl-4">
        Date
      </div>
    ),
    cell: ({ row }) => {
      return <div className="pl-4">
        {row.original?.created_at && format(new Date(row.original?.created_at), "dd MMM yyyy")}
      </div>
    },
  },
  {
    accessorKey: "first_name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="flex flex-col">
        <span className="font-medium">{row.original?.last_name} {row.original?.first_name}</span>
        <span className="text-muted-foreground text-xs">{row.original?.personal_email}</span>
      </div>
    }
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="font-medium">{row.original?.email}</span>
  },
  {
    accessorKey: "staff_type",
    header: "Type",
    cell: ({ row }) => {
      const type = STAFF_TYPES.find((type) => type.value === row.original?.staff_type)
      return <span>{type?.label}</span>
    },
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {

      return row.original?.department.charAt(0).toUpperCase() + row.original?.department.slice(1)
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <div className="min-w-[90px]">
        <Badge
          className="shadow-none"
          variant={row.original?.status !== "pending" ? "default" : "outline"}
        >
          {row.original?.status === "pending" ? "Pending" : "Onboarded"}
        </Badge>
      </div>
    },
  },
  {
    accessorKey: "access",
    header: () => (
      <div className="text-left pr-4">
        Access
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-between rounded-full bg-muted p-0.5">
          {row.original?.access.length > 0 && (
            <div className="flex -space-x-2">
              {row.original?.access.sort().map((access) => (
                <img
                  key={access}
                  className="rounded-full ring-1 ring-white transition-all hover:scale-110"
                  src={accessIcons[access as keyof typeof accessIcons]}
                  width={30}
                  height={30}
                  alt={access}
                />
              ))}
            </div>
          )}
          <Button
            onClick={() => {
              setDialogsState({
                open: "new-access",
                payload: row.original?.id
              });
            }}
            variant="ghost"
            size="icon"
            className="flex items-center ring-2 ring-white justify-center rounded-full px-3 text-xs text-muted-foreground shadow-none hover:text-foreground"
          >
            {row.original?.access.length > 0 ? <Pencil /> : <Plus />}
          </Button>
        </div>
      );
    },
  }
]
