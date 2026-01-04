"use server";

import { revalidatePath } from "next/cache";

import {
  createAccountSchema,
  CreateAccountInput,
  updateAccountSchema,
  UpdateAccountInput,
} from "@/lib/schemas/account";

import { getUser } from "@/lib/auth/auth";

import { 
  createAccountService,
  updateAccountService,
  deleteAccountService
} from "@/services/accounts";

export async function createAccount(input: CreateAccountInput) {
  const { userId } = await getUser();

  const data = createAccountSchema.parse(input);

  await createAccountService({
    ...data,
    userId,
  });

  revalidatePath("/dashboard");
  revalidatePath("/accounts");
}

export async function updateAccount(
  accountId: string,
  input: UpdateAccountInput
) {
  const { userId } = await getUser();

  const data = updateAccountSchema.parse(input);

  await updateAccountService({
    ...data,
    accountId,
    userId,
  });

  revalidatePath("/dashboard");
  revalidatePath("/accounts");
}

export async function deleteAccount(accountId: string) {
  const { userId } = await getUser();

  await deleteAccountService({
    accountId,
    userId,
  });

  revalidatePath("/dashboard");
  revalidatePath("/accounts");
}