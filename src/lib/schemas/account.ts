import { z } from "zod";
import { AccountType, Currency } from "@prisma/client";

const INITIAL_BALANCE_REGEX = /^-?\d+(\.\d{1,2})?$/;

export const accountFormSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Account name must have at least 2 characters")
    .max(100, "Account name must have at most 100 characters"),
  accountType: z.enum(AccountType),
  currency: z.enum(Currency),
  balance: z
    .string()
    .regex(INITIAL_BALANCE_REGEX, "Use a valid amount (e.g. 100 or 100.50)"),
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;

export const createAccountSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Account name must have at least 2 characters")
    .max(100, "Account name must have at most 100 characters"),
  accountType: z.enum(AccountType),
  currency: z.enum(Currency).default(Currency.USD),
  balance: z
    .string()
    .regex(INITIAL_BALANCE_REGEX, "Use a valid amount (e.g. 100 or 100.50)")
    .default("0"),
  isActive: z.boolean().default(true),
  order: z.number().int().positive().optional(),
  parentId: z.uuid().optional(),
});

export type CreateAccountInput = z.infer<typeof createAccountSchema>;

export const updateAccountSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Account name must have at least 2 characters")
    .max(100, "Account name must have at most 100 characters").optional(),
  currency: z.enum(Currency).optional(),
  isActive: z.boolean().optional(),
  order: z.number().int().positive().optional(),
  parentId: z.uuid().nullable().optional(),
});

export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;