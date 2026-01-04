"use client";

import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountFormDialog } from "@/components/pages/account/dialog/AccountFormDialog";
import { DeleteAccountDialog } from "@/components/pages/account/dialog/DeleteAccountDialog";
import { AccountTreeNode } from "@/types/account";

type AccountActionsProps = {
  account: AccountTreeNode;
};

export function AccountActions({ account }: AccountActionsProps) {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const isParent = account.parentId === null;
  const hasChildren = account.children.length > 0;

  return (
    <>
      <div className="flex items-center gap-1">
        {isParent && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setOpenCreate(true)}
            aria-label="Add sub account"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}

        <Button
          size="icon"
          variant="ghost"
          onClick={() => setOpenEdit(true)}
          aria-label="Edit account"
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <DeleteAccountDialog
          accountId={account.id}
          accountName={account.name}
          hasChildren={hasChildren}
        />
      </div>

      <AccountFormDialog
        open={openCreate}
        onOpenChange={setOpenCreate}
        mode="create"
        parentId={account.id}
      />

      <AccountFormDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        mode="edit"
        accountId={account.id}
        initialData={{
          name: account.name,
          accountType: account.type,
          currency: account.currency,
          balance: account.balance.toString(),
        }}
      />
    </>
  );
}