"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AccountFormDialog } from "@/components/pages/account/dialog/AccountFormDialog";
import { Breadcrumbs } from "@/components/ui/breadcrumb";

export function AccountListHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="pb-4">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Accounts" }
          ]}
        />
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Accounts
        </h1>

        <Button onClick={() => setOpen(true)}>
          New account
        </Button>
      </div>

      <AccountFormDialog
        open={open}
        onOpenChange={setOpen}
        mode="create"
        parentId={null}
      />
    </>
  );
}
