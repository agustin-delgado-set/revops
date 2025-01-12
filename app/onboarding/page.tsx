import { createClient } from "@/lib/supabase/server";
import { columns, Users } from "./components/columns";
import { DataTable } from "./components/data-table";
import NewAccessDialog from "./components/new-access-dialog";

async function getData(): Promise<Users[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("users")
    .select("*")

  if (error) {
    throw error
  }

  return data
}

export default async function OnboardingPage() {
  const data = await getData()
  return (
    <>
      <DataTable columns={columns} data={data} />
      <NewAccessDialog />
    </>
  )
}