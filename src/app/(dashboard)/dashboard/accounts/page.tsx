import { Suspense } from "react";
import { AccountListSectionServer } from "@/components/pages/account/list/AccountListSection.server";
import { AccountListSkeleton } from "@/components/skeletons/AccountListSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accounts",
};

export default function AccountPage() {
  return (
    <Suspense fallback={<AccountListSkeleton />}>
      <AccountListSectionServer />
    </Suspense>
  );
}
