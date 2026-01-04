import { getAccountTree } from "@/services/accounts";
import { AccountListHeader } from "./AccountListHeader";
import { AccountTree } from "./AccountListTree";

export async function AccountListSectionServer() {
  const accounts = await getAccountTree();

  return (
    <div className="space-y-6">
      <AccountListHeader />
      <AccountTree accounts={accounts} />
    </div>
  );
}
