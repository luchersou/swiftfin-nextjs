"use server"

import { revalidatePath } from "next/cache"
import { getUser } from "@/lib/auth/auth"
import {
  createTransactionSchema,
  CreateTransactionInput,
  updateTransactionSchema,
  UpdateTransactionInput
} from "@/lib/schemas/transactions"

import { 
  createTransactionService, 
  updateTransactionService,
  deleteTransactionService 
} from "@/services/transactions";

export async function createTransaction(input: CreateTransactionInput) {
  const { userId } = await getUser();
  const data = createTransactionSchema.parse(input);
  
  await createTransactionService({
    ...data,
    userId,
  });
  
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/accounts");
  revalidatePath("/dashboard/transactions");
}

export async function updateTransaction(
  transactionId: string,
  data: UpdateTransactionInput
) {
  const { userId } = await getUser();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const validatedData = updateTransactionSchema.parse(data);
  
  const updatedTransaction = await updateTransactionService({
    transactionId,
    userId,
    ...validatedData
  });

  revalidatePath("/dashboard");
  revalidatePath("/transactions");

  return updatedTransaction;
}

export async function deleteTransaction(transactionId: string) {
  const { userId } = await getUser();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await deleteTransactionService({
    transactionId,
    userId,
  });

  revalidatePath("/dashboard");
  revalidatePath("/transactions");

  return { success: true };
}