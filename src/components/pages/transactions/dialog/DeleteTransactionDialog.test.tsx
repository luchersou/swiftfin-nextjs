import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DeleteTransactionDialog } from "./DeleteTransactionDialog";
import { deleteTransaction } from "@/actions/transactions";
import { toast } from "sonner";

// --------------------
// Mocks
// --------------------

jest.mock("@/actions/transactions", () => ({
  deleteTransaction: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("@/components/ui/alert-dialog", () => {
  const React = require("react");
  return {
    AlertDialog: ({ open, children }: any) =>
      open ? <div>{children}</div> : null,

    AlertDialogContent: ({ children }: any) => <div>{children}</div>,
    AlertDialogHeader: ({ children }: any) => <div>{children}</div>,
    AlertDialogTitle: ({ children }: any) => <h2>{children}</h2>,
    AlertDialogDescription: ({ children }: any) => <p>{children}</p>,
    AlertDialogFooter: ({ children }: any) => <div>{children}</div>,
    AlertDialogCancel: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    AlertDialogAction: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
  };
});

describe("DeleteTransactionDialog", () => {
  const defaultProps = {
    open: true,
    onOpenChange: jest.fn(),
    transactionId: "tx-123",
    onSuccess: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --------------------------------------------------
  // Rendering
  // --------------------------------------------------
  it("renders dialog title and description when open", () => {
    render(<DeleteTransactionDialog {...defaultProps} />);

    expect(
      screen.getByText("Delete transaction")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/are you sure you want to delete/i)
    ).toBeInTheDocument();
  });

  // --------------------------------------------------
  // Success flow
  // --------------------------------------------------
  it("deletes transaction, closes dialog and calls onSuccess on success", async () => {
    (deleteTransaction as jest.Mock).mockResolvedValueOnce(undefined);

    render(<DeleteTransactionDialog {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", { name: /^delete$/i })
    );

    await waitFor(() => {
      expect(deleteTransaction).toHaveBeenCalledWith("tx-123");
    });

    expect(toast.success).toHaveBeenCalledWith(
      "Transaction deleted successfully"
    );

    expect(defaultProps.onOpenChange).toHaveBeenCalledWith(false);
    expect(defaultProps.onSuccess).toHaveBeenCalled();
  });

  // --------------------------------------------------
  // Error flow
  // --------------------------------------------------
  it("shows error toast when deleteTransaction fails", async () => {
    (deleteTransaction as jest.Mock).mockRejectedValueOnce(
      new Error("Delete failed")
    );

    render(<DeleteTransactionDialog {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", { name: /^delete$/i })
    );

    await waitFor(() => {
      expect(deleteTransaction).toHaveBeenCalled();
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Failed to delete transaction"
    );

    expect(defaultProps.onOpenChange).not.toHaveBeenCalled();
    expect(defaultProps.onSuccess).not.toHaveBeenCalled();
  });

  // --------------------------------------------------
  // Loading state
  // --------------------------------------------------
  it("disables buttons and shows loading text while deleting", async () => {
    let resolvePromise: () => void;

    (deleteTransaction as jest.Mock).mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolvePromise = resolve;
        })
    );

    render(<DeleteTransactionDialog {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", { name: /^delete$/i })
    );

    expect(
      screen.getByRole("button", { name: /deleting/i })
    ).toBeDisabled();

    expect(
      screen.getByRole("button", { name: /cancel/i })
    ).toBeDisabled();

    // Finish the async operation
    resolvePromise!();

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /^delete$/i })
      ).toBeEnabled();
    });
  });
});
