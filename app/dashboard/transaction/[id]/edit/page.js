import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TransactionForm from "@/app/dashboard/components/transaction-form";

export const metadata = {
  title: "Edit Transaction",
};

export default async function Page({ params }) {
  const { id } = await params; // 👈 await params
  const supabase = await createClient();
  const { data: transaction, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) notFound();

  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Edit Transaction</h1>
      <TransactionForm initialData={transaction} />
    </>
  );
}
