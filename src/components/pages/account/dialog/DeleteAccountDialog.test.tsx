import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { toast } from "sonner";

import { deleteAccount } from "@/actions/accounts";

import { DeleteAccountDialog } from "./DeleteAccountDialog";

// --------------------
// Mocks
// --------------------

jest.mock("@/actions/accounts", () => ({
  deleteAccount: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Radix / shadcn dialogs render via portals.
// This mock avoids portal-related issues in tests.
jest.mock("@/components/ui/alert-dialog", () => {
  const React = require("react");
  return {
    AlertDialog: ({ children }: any) => <div>{children}</div>,
    AlertDialogTrigger: ({ children }: any) => <div>{children}</div>,
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

describe("DeleteAccountDialog", () => {
  const defaultProps = {
    accountId: "account-123",
    accountName: "Main Account",
    hasChildren: false,
  };

  // --------------------------------------------------
  // hasChildren = true
  // --------------------------------------------------
  it("disables delete button and shows tooltip when account has children", () => {
    render(
      <DeleteAccountDialog
        {...defaultProps}
        hasChildren={true}
      />
    );

    const button = screen.getByRole("button", {
      name: /cannot delete account with sub-accounts/i,
    });

    expect(button).toBeDisabled();
  });

  // --------------------------------------------------
  // hasChildren = false
  // --------------------------------------------------
  it("renders delete button when account has no children", () => {
    render(<DeleteAccountDialog {...defaultProps} />);

    const button = screen.getByRole("button", {
      name: /delete account/i,
    });

    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it("opens confirmation dialog when delete button is clicked", () => {
    render(<DeleteAccountDialog {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", { name: /delete account/i })
    );

    expect(
      screen.getByText(/delete account\?/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/main account/i)
    ).toBeInTheDocument();
  });

  // --------------------------------------------------
  // Success flow
  // --------------------------------------------------
  it("calls deleteAccount and shows success toast on successful delete", async () => {
    (deleteAccount as jest.Mock).mockResolvedValueOnce(undefined);

    render(<DeleteAccountDialog {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", { name: /delete account/i })
    );

    fireEvent.click(
      screen.getByRole("button", { name: /^delete$/i })
    );

    await waitFor(() => {
      expect(deleteAccount).toHaveBeenCalledWith("account-123");
    });

    expect(toast.success).toHaveBeenCalledWith(
      "Account deleted successfully!"
    );
  });

  // --------------------------------------------------
  // Error flow
  // --------------------------------------------------
  it("shows error toast when deleteAccount fails", async () => {
    (deleteAccount as jest.Mock).mockRejectedValueOnce(
      new Error("Delete failed")
    );

    render(<DeleteAccountDialog {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", { name: /delete account/i })
    );

    fireEvent.click(
      screen.getByRole("button", { name: /^delete$/i })
    );

    await waitFor(() => {
      expect(deleteAccount).toHaveBeenCalled();
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Failed to delete account"
    );
  });
});
