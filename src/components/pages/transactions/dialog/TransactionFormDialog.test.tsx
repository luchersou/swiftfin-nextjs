import { render, screen, fireEvent } from "@testing-library/react";

import { TransactionFormDialog } from "./TransactionFormDialog";

// --------------------
// Mocks
// --------------------

// Mock Dialog (Radix / shadcn)
jest.mock("@/components/ui/dialog", () => {
  const React = require("react");
  return {
    Dialog: ({ open, children }: any) =>
      open ? <div>{children}</div> : null,

    DialogContent: ({ children }: any) => <div>{children}</div>,
    DialogHeader: ({ children }: any) => <div>{children}</div>,
    DialogTitle: ({ children }: any) => <h2>{children}</h2>,
    DialogDescription: ({ children }: any) => <p>{children}</p>,
  };
});


// Mock TransactionForm
jest.mock(
  "@/components/pages/transactions/form/TransactionForm",
  () => ({
    TransactionForm: ({ onSuccess }: any) => (
      <div>
        <p>Transaction Form</p>
        <button onClick={onSuccess}>Submit form</button>
      </div>
    ),
  })
);

describe("TransactionFormDialog", () => {
  const accounts = [{ id: "1", name: "Cash" }];
  const categories = [{ id: "1", name: "Food" }];

  const defaultProps = {
    open: true,
    onOpenChange: jest.fn(),
    mode: "create" as const,
    accounts,
    categories,
    onSuccess: jest.fn(),
  };

  // --------------------------------------------------
  // Rendering
  // --------------------------------------------------
  it("renders create mode title and description", () => {
    render(<TransactionFormDialog {...defaultProps} />);

    expect(
      screen.getByText("Add transaction")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Create a new transaction to track your finances."
      )
    ).toBeInTheDocument();
  });

  it("renders edit mode title and description", () => {
    render(
      <TransactionFormDialog
        {...defaultProps}
        mode="edit"
        transactionId="tx-123"
      />
    );

    expect(
      screen.getByText("Edit transaction")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Update the transaction details below."
      )
    ).toBeInTheDocument();
  });

  // --------------------------------------------------
  // Open / Close behavior
  // --------------------------------------------------
  it("does not render dialog content when open is false", () => {
    render(
      <TransactionFormDialog
        {...defaultProps}
        open={false}
      />
    );

    expect(
      screen.queryByText(/transaction/i)
    ).not.toBeInTheDocument();
  });

  // --------------------------------------------------
  // Integration with TransactionForm
  // --------------------------------------------------
  it("closes dialog and calls onSuccess when form succeeds", () => {
    const onOpenChange = jest.fn();
    const onSuccess = jest.fn();

    render(
      <TransactionFormDialog
        {...defaultProps}
        onOpenChange={onOpenChange}
        onSuccess={onSuccess}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: /submit form/i })
    );

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(onSuccess).toHaveBeenCalled();
  });
});
