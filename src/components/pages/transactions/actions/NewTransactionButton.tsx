"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TransactionFormDialog } from "@/components/pages/transactions/dialog/TransactionFormDialog";
import { useRouter } from "next/navigation";

type NewTransactionButtonProps = {
  accounts: Array<{ id: string; name: string }>;
  categories: Array<{ id: string; name: string }>;
};

export function NewTransactionButton({
  accounts,
  categories,
}: NewTransactionButtonProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        New transaction
      </Button>

      <TransactionFormDialog
        open={open}
        onOpenChange={setOpen}
        mode="create"
        accounts={accounts}
        categories={categories}
        onSuccess={() => {
          setOpen(false);
          router.refresh();
        }}
      />
    </>
  );
}