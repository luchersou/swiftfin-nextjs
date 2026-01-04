import { Suspense } from "react";
import { AccountDetailsContent } from "@/components/pages/account/details/AccountDetailsContent.server";
import { AccountDetailsSkeleton } from "@/components/skeletons/AccountDetailsSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Details",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AccountPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<AccountDetailsSkeleton />}>
      <AccountDetailsContent id={id} />
    </Suspense>
  );
}
