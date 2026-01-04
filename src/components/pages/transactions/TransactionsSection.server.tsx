import { getTransactions } from "@/services/transactions"
import { TransactionsHeader } from "./header/TransactionsHeader"
import { TransactionsTable } from "./table/TransactionsTable"
import { TransactionsFilters } from "./filters/TransactionsFilters"
import { TransactionFilters } from "@/types/transactions"
import { NewTransactionButton } from "./actions/NewTransactionButton"
import { getUser } from "@/lib/auth/auth"

type TransactionsSectionServerProps = {
  page: number
  pageSize: number
  filters: TransactionFilters
}

export async function TransactionsSectionServer({
  page,
  pageSize,
  filters,
}: TransactionsSectionServerProps) {
  const { userId } = await getUser();

  const result = await getTransactions(userId, {
    page,
    pageSize,
    filters,
  })

  const { transactions, filtersData } = result
  const { data, pagination } = transactions
  const { accounts, categories } = filtersData

  return (
    <div className="space-y-4 sm:space-y-6">
      <TransactionsHeader total={pagination.total} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <TransactionsFilters
          accounts={accounts}
          categories={categories}
        />

        <NewTransactionButton 
          accounts={accounts}
          categories={categories}
        />
      </div>

      <TransactionsTable
        data={data}
        page={pagination.page}
        pageSize={pagination.pageSize}
        totalPages={pagination.totalPages}
        totalCount={pagination.total}
        accounts={accounts}
        categories={categories}
      />
    </div>
  )
}
