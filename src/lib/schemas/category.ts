import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z
    .string()
    .min(1)
    .max(100)
    .transform((v) => v.trim()),
});

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>
