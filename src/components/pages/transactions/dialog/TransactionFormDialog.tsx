"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { TransactionForm } from "@/components/pages/transactions/form/TransactionForm";
import { TransactionFormValues } from "@/lib/schemas/transactions";

interface TransactionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";

  transactionId?: string;
  initialData?: TransactionFormValues;

  accounts: { id: string; name: string }[];
  categories?: { id: string; name: string }[];

  onSuccess: () => void;
}

export function TransactionFormDialog({
  open,
  onOpenChange,
  mode,
  transactionId,
  initialData,
  accounts,
  categories = [],
  onSuccess,
}: TransactionFormDialogProps) {
  const isEdit = mode === "edit";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] overflow-y-auto" 
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit transaction" : "Add transaction"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the transaction details below."
              : "Create a new transaction to track your finances."}
          </DialogDescription>
        </DialogHeader>

        <TransactionForm
          mode={mode}
          transactionId={transactionId}
          initialData={initialData}
          accounts={accounts}
          categories={categories}
          onSuccess={() => {
            onOpenChange(false);
            onSuccess();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
