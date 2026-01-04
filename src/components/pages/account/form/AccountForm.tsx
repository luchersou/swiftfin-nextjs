"use client";

import { useTransition } from "react";
import {
  createAccount,
  updateAccount,
} from "@/actions/accounts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountType, Currency } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner"; 

import {
  accountFormSchema,
  AccountFormValues,
} from "@/lib/schemas/account";

type AccountFormProps = {
  mode: "create" | "edit";
  accountId?: string;
  parentId?: string | null;
  defaultValues?: AccountFormValues;
  onSuccess: () => void;
};

export function AccountForm({
  mode,
  accountId,
  parentId,
  defaultValues,
  onSuccess,
}: AccountFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: defaultValues ?? {
      name: "",
      accountType: AccountType.CHECKING,
      currency: Currency.USD,
      balance: "0",
    },
  });

  const isEdit = mode === "edit";
  const isSubmitting = isPending;

  function onSubmit(values: AccountFormValues) {
    startTransition(async () => {
      try {
        if (mode === "create") {
          await createAccount({
            name: values.name,
            accountType: values.accountType,
            currency: values.currency,
            balance: values.balance ?? "0",
            parentId: parentId ?? undefined,
            isActive: true,
          });
          toast.success("Account created successfully!");
        }

        if (mode === "edit") {
          if (!accountId) {
            toast.error("Account ID is required");
            return;
          }

          await updateAccount(accountId, {
            name: values.name,
            currency: values.currency,
          });
          toast.success("Account updated successfully!");
        }

        form.reset();
        onSuccess();
      } catch (error) {
        console.error("Error saving account:", error);
        toast.error(
          mode === "edit"
            ? "Failed to update account"
            : "Failed to create account"
        );
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Account name"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isEdit && <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {isEdit ? "Current balance" : "Initial balance"}
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />}

        {!isEdit && <FormField
          control={form.control}
          name="accountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account type</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(AccountType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />}

        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Currency).map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? isEdit
                ? "Saving..."
                : "Creating..."
              : isEdit
              ? "Save changes"
              : "Create account"}
          </Button>
        </div>
      </form>
    </Form>
  );
}