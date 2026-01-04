"use server";

import { CreateCategorySchema, CreateCategoryInput } from "@/lib/schemas/category";
import { revalidatePath } from "next/cache";
import { getUser } from "@/lib/auth/auth";
import { createCategoryService, deleteCategoryService } from "@/services/categories";

export async function createCategory(input: CreateCategoryInput) {
  const { userId } = await getUser();
  const data = CreateCategorySchema.parse(input);
  
  const category = await createCategoryService({
    ...data,
    userId,
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/transactions");

  return category;
}

export async function deleteCategory(categoryId: string) {
  const { userId } = await getUser();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await deleteCategoryService({
    categoryId,
    userId,
  });

  revalidatePath("/transactions");
  revalidatePath("/dashboard");
}