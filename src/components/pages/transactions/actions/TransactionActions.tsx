"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { TransactionFormDialog } from "@/components/pages/transactions/dialog/TransactionFormDialog";
import { DeleteTransactionDialog } from "@/components/pages/transactions/dialog/DeleteTransactionDialog";

import { TransactionFormValues } from "@/lib/schemas/transactions";
import { TransactionType } from "@prisma/client";

interface TransactionActionsProps {
  mode?: "create" | "edit"; 
  transaction?: {
    id: string;
    amount: string;
    description: string;
    date: Date;
    type: TransactionType;
    accountId: string;
    categoryId?: string | null;
    notes?: string | null;
  };
  accounts: { id: string; name: string }[];
  categories?: { id: string; name: string }[];
  onSuccess?: () => void;
}

export function TransactionActions({
  mode = "edit",
  transaction,
  accounts,
  categories = [],
  onSuccess,
}: TransactionActionsProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const isEdit = mode === "edit" && !!transaction;

  const initialData: TransactionFormValues | undefined = isEdit
    ? {
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.date,
        type: transaction.type,
        accountId: transaction.accountId, 
        categoryId: transaction.categoryId ?? undefined, 
        notes: transaction.notes ?? "",
      }
    : undefined;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open actions</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            {isEdit ? "Edit" : "Add"}
          </DropdownMenuItem>

          {isEdit && (
            <DropdownMenuItem
              onClick={() => setDeleteOpen(true)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {editOpen && (
        <TransactionFormDialog
          mode="edit"
          open={editOpen}
          onOpenChange={setEditOpen}
          transactionId={transaction?.id}
          initialData={initialData}
          accounts={accounts}
          categories={categories}
          onSuccess={() => {
            setEditOpen(false);
            onSuccess?.();
          }}
        />
      )}

      {transaction && deleteOpen && (
        <DeleteTransactionDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          transactionId={transaction.id}
          onSuccess={() => {
            setDeleteOpen(false);
            onSuccess?.();
          }}
        />
      )}
    </>
  );
}
