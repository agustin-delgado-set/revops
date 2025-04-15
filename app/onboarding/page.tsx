'use client'

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import NewAccessDialog from "./components/new-access-dialog";

export default function OnboardingPage() {
  return (
    <>
      <DataTable columns={columns} />
      <NewAccessDialog />
    </>
  )
}