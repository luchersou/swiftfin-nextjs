import { prisma } from "@/lib/prisma";
import { CreateCategoryInput } from "@/lib/schemas/category";

export type CreateCategoryServiceInput = CreateCategoryInput & {
  userId: string
}

export async function createCategoryService({
  name,
  userId,
}: {
  name: string
  userId: string
}) {
  const normalizedName = name.trim().toLowerCase();

  const existingCategory = await prisma.category.findFirst({
    where: {
      userId,
      name: normalizedName,
    },
  });

  if (existingCategory) {
    return existingCategory;
  }

  const category = await prisma.category.create({
    data: {
      name: normalizedName,
      isActive: true,
      userId,
    },
  });

  return category;
}


type DeleteCategoryServiceInput = {
  categoryId: string;
  userId: string;
};

export async function deleteCategoryService({
  categoryId,
  userId,
}: DeleteCategoryServiceInput) {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      userId,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const transactionsCount = await prisma.transaction.count({
    where: {
      categoryId,
    },
  });

  if (transactionsCount > 0) {
    throw new Error(
      "You cannot delete a category that is being used by transactions"
    );
  }

  await prisma.category.delete({
    where: { id: categoryId },
  });
}