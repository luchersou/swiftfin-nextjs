"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { deleteAccount } from "@/actions/accounts";
import { toast } from "sonner";

type DeleteAccountDialogProps = {
  accountId: string;
  accountName: string;
  hasChildren: boolean;
};

export function DeleteAccountDialog({
  accountId,
  accountName,
  hasChildren,
}: DeleteAccountDialogProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteAccount(accountId);
        toast.success("Account deleted successfully!");
      } catch (error) {
        console.error("Error deleting account:", error);
        toast.error("Failed to delete account");
      }
    });
  };

  if (hasChildren) {
    return (
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
            <span className="inline-flex">
                <Button
                size="icon"
                variant="ghost"
                disabled
                aria-label="Cannot delete account with sub-accounts"
                className="cursor-not-allowed opacity-50"
                >
                <Trash2 className="h-4 w-4" />
                </Button>
            </span>
            </TooltipTrigger>
            <TooltipContent>
            <p>Cannot delete account with sub-accounts</p>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>
    );
    }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Delete account"
          className="hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete account?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">{accountName}</span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}