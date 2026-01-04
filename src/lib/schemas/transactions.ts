import { z } from "zod";
import { TransactionType } from "@prisma/client";

const AMOUNT_REGEX = /^-?\d+(\.\d{1,2})?$/

export const transactionFormSchema = z.object({
  amount: z
    .string()
    .regex(AMOUNT_REGEX, "Use a valid amount (e.g. 100 or 100.50)"),
  description: z
    .string()
    .min(2, "Description must have at least 2 characters")
    .max(255, "Description must be at most 255 characters"),
  date: z.date(),
  type: z.enum(TransactionType),
  accountId: z.uuid({
    message: "Select an account",
  }),
  categoryId: z.uuid().optional(),
  notes: z.string().max(500).optional(),
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;

export const createTransactionSchema = z.object({
  amount: z
    .string()
    .regex(AMOUNT_REGEX, "Use a valid amount (e.g. 100 or 100.50)"),
  description: z
    .string()
    .min(2, "Description must have at least 2 characters")
    .max(255, "Description must be at most 255 characters"),
  date: z.coerce.date(),
  transactionType: z.enum(TransactionType),
  notes: z.string().max(500).optional(),
  accountId: z.uuid({
    message: "Select an account",
  }),
  categoryId: z.uuid().optional(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

export const updateTransactionSchema = z.object({
  amount: z
    .string()
    .regex(AMOUNT_REGEX, "Use a valid amount (e.g. 100 or 100.50)")
    .optional(),
  description: z
    .string()
    .min(2, "Description must have at least 2 characters")
    .max(255, "Description must be at most 255 characters")
    .optional(),
  date: z.coerce.date().optional(),
  transactionType: z.enum(TransactionType).optional(),
  notes: z.string().max(500).nullable().optional(),
  accountId: z.uuid().optional(),
  categoryId: z.uuid().nullable().optional(),
});

export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
