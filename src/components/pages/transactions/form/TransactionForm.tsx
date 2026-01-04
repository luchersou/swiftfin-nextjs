"use client";

import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
  transactionFormSchema,
  TransactionFormValues,
} from "@/lib/schemas/transactions";
import { TransactionType } from "@prisma/client";
import { 
  createTransaction, 
  updateTransaction 
} from "@/actions/transactions";
import { 
  createCategory, 
  deleteCategory 
} from "@/actions/categories";

type TransactionFormProps = {
  mode: "create" | "edit";
  initialData?: TransactionFormValues;
  transactionId?: string;
  accounts: { id: string; name: string }[];
  categories?: { id: string; name: string }[];
  onSuccess: () => void;
}

export function TransactionForm({
  mode,
  initialData,
  transactionId,
  accounts,
  categories = [],
  onSuccess,
}: TransactionFormProps) {
  const [isPending, startTransition] = useTransition() 
  const [isAddingCategory, setIsAddingCategory] = useState(false) 
  const [isCategoryLoading, setIsCategoryLoading] = useState(false) 
  const [newCategoryName, setNewCategoryName] = useState("")
  const [localCategories, setLocalCategories] = useState(categories)

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: initialData || {
      amount: "",
      description: "",
      date: new Date(),
      type: "EXPENSE",
      accountId: undefined,
      notes: "",
    },
  });

  function onSubmit(values: TransactionFormValues) {
    startTransition(async () => {
      try {
        if (mode === "create") {
          await createTransaction({
            amount: values.amount,
            description: values.description,
            date: values.date,
            transactionType: values.type,
            accountId: values.accountId,
            categoryId: values.categoryId || undefined,
            notes: values.notes,
          });
          toast.success("Transaction created successfully!");
        }

        if (mode === "edit") {
          if (!transactionId) {
            toast.error("Transaction ID is required");
            return;
          }

          await updateTransaction(transactionId, {
            amount: values.amount,
            description: values.description,
            date: values.date,
            transactionType: values.type,
            accountId: values.accountId,
            categoryId: values.categoryId || null,
            notes: values.notes,
          });
          toast.success("Transaction updated successfully!");
        }

        form.reset();
        onSuccess();
      } catch (error) {
        console.error("Error saving transaction:", error);
        toast.error(
          mode === "edit"
            ? "Failed to update transaction"
            : "Failed to create transaction"
        );
      }
    });
  }

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name is required")
      return
    }

    setIsCategoryLoading(true)

    try {
      const newCategory = await createCategory({
        name: newCategoryName.trim(),
      })

      setLocalCategories((prev) => [...prev, newCategory])
      form.setValue("categoryId", newCategory.id)

      setNewCategoryName("")
      setIsAddingCategory(false)

      toast.success("Category created successfully!")
    } catch (error) {
      toast.error("Failed to create category")
    } finally {
      setIsCategoryLoading(false)
    }
  }



  const handleDeleteCategory = async (categoryId?: string) => {
    if (!categoryId || categoryId === "none") return

    setIsCategoryLoading(true)

    try {
      await deleteCategory(categoryId)

      setLocalCategories((prev) =>
        prev.filter((c) => c.id !== categoryId)
      )

      form.setValue("categoryId", undefined)
      toast.success("Category deleted")
    } catch (error) {
      toast.error("Failed to delete category")
    } finally {
      setIsCategoryLoading(false)
    }
  }


  const transactionTypes = Object.values(TransactionType);

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {transactionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0) + type.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="0.00"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter description"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={
                    field.value instanceof Date
                      ? field.value.toISOString().split("T")[0]
                      : field.value
                  }
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <Select
                value={field.value ?? undefined}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Category (Optional)</FormLabel>

                {!isAddingCategory && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => setIsAddingCategory(true)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {isAddingCategory ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="New category name"
                    value={newCategoryName}
                    disabled={isCategoryLoading}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isCategoryLoading) {
                        e.preventDefault()
                        handleAddCategory()
                      }

                      if (e.key === "Escape" && !isCategoryLoading) {
                        setIsAddingCategory(false)
                        setNewCategoryName("")
                      }
                    }}
                  />

                  <Button
                    type="button"
                    size="sm"
                    disabled={isCategoryLoading}
                    onClick={handleAddCategory}
                  >
                    {isCategoryLoading ? "Adding..." : "Add"}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isCategoryLoading}
                    onClick={() => {
                      setIsAddingCategory(false)
                      setNewCategoryName("")
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                /* SELECT MODE */
                <div className="flex gap-2">
                  <Select
                    value={field.value ?? undefined}
                    onValueChange={(value) =>
                      field.onChange(value === "none" ? undefined : value)
                    }
                    disabled={!localCategories.length || isCategoryLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="none">
                        <span className="text-muted-foreground">
                          No category
                        </span>
                      </SelectItem>

                      {localCategories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {field.value && field.value !== "none" && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="shrink-0"
                      disabled={isCategoryLoading}
                      onClick={() => handleDeleteCategory(field.value)}
                    >
                      <X className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending
            ? "Saving..."
            : mode === "edit"
            ? "Update Transaction"
            : "Create Transaction"}
        </Button>
      </form>
    </Form>
  );
}