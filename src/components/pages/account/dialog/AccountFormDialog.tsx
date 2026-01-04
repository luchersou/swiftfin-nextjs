"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { AccountForm } from "../form/AccountForm";
import { AccountFormValues } from "@/lib/schemas/account";

type AccountDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  parentId?: string | null;
  accountId?: string;
  initialData?: AccountFormValues;
};

export function AccountFormDialog({
  open,
  onOpenChange,
  mode,
  parentId,
  accountId,
  initialData,
}: AccountDialogProps) {
  const isEdit = mode === "edit";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit account" : "New account"}
          </DialogTitle>

          <DialogDescription>
            {isEdit
              ? "Update the account information."
              : "Create a new account."}
          </DialogDescription>
        </DialogHeader>

        <AccountForm
          mode={mode}
          parentId={parentId}
          accountId={accountId}
          defaultValues={initialData}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
