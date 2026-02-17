import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TransactionForm } from "./TransactionForm";
import {
  createTransaction,
  updateTransaction,
} from "@/actions/transactions";
import { toast } from "sonner";

// --------------------------------------------------
// Mocks
// --------------------------------------------------

jest.mock("react-hook-form", () => {
  return {
    useForm: () => ({
      handleSubmit:
        (fn: any) =>
        () =>
          fn({
            amount: "100",
            description: "Test transaction",
            date: new Date("2024-01-01"),
            type: "EXPENSE",
            accountId: "acc-1",
            categoryId: undefined,
            notes: "",
          }),
      control: {},
      reset: jest.fn(),
      setValue: jest.fn(),
    }),
  };
});


jest.mock("@/actions/transactions", () => ({
  createTransaction: jest.fn(),
  updateTransaction: jest.fn(),
}));

jest.mock("@/actions/categories", () => ({
  createCategory: jest.fn(),
  deleteCategory: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock shadcn / react-hook-form UI
jest.mock("@/components/ui/form", () => {
  const React = require("react");
  return {
    Form: ({ children }: any) => <div>{children}</div>,
    FormField: ({ render }: any) =>
      render({
        field: {
          value: "",
          onChange: jest.fn(),
        },
      }),
    FormItem: ({ children }: any) => <div>{children}</div>,
    FormLabel: ({ children }: any) => <label>{children}</label>,
    FormControl: ({ children }: any) => <div>{children}</div>,
    FormMessage: () => null,
  };
});

jest.mock("@/components/ui/input", () => ({
  Input: (props: any) => <input {...props} />,
}));

jest.mock("@/components/ui/textarea", () => ({
  Textarea: (props: any) => <textarea {...props} />,
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock("@/components/ui/select", () => {
  const React = require("react");
  return {
    Select: ({ children }: any) => <div>{children}</div>,
    SelectTrigger: ({ children }: any) => <div>{children}</div>,
    SelectValue: ({ placeholder }: any) => <span>{placeholder}</span>,
    SelectContent: ({ children }: any) => <div>{children}</div>,
    SelectItem: ({ children }: any) => <div>{children}</div>,
  };
});

describe("TransactionForm", () => {
  const accounts = [{ id: "acc-1", name: "Cash" }];

  const baseProps = {
    accounts,
    onSuccess: jest.fn(),
  };

  // --------------------------------------------------
  // Create mode
  // --------------------------------------------------
  it("creates transaction and shows success toast", async () => {
    (createTransaction as jest.Mock).mockResolvedValueOnce(undefined);

    render(
      <TransactionForm
        {...baseProps}
        mode="create"
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /create transaction/i,
      })
    );

    await waitFor(() => {
      expect(createTransaction).toHaveBeenCalled();
    });

    expect(toast.success).toHaveBeenCalledWith(
      "Transaction created successfully!"
    );

    expect(baseProps.onSuccess).toHaveBeenCalled();
  });

  // --------------------------------------------------
  // Edit mode
  // --------------------------------------------------
  it("updates transaction and shows success toast", async () => {
    (updateTransaction as jest.Mock).mockResolvedValueOnce(undefined);

    render(
      <TransactionForm
        {...baseProps}
        mode="edit"
        transactionId="tx-123"
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /update transaction/i,
      })
    );

    await waitFor(() => {
      expect(updateTransaction).toHaveBeenCalledWith(
        "tx-123",
        expect.any(Object)
      );
    });

    expect(toast.success).toHaveBeenCalledWith(
      "Transaction updated successfully!"
    );
  });

  // --------------------------------------------------
  // Error flow
  // --------------------------------------------------
  it("shows error toast when create fails", async () => {
    (createTransaction as jest.Mock).mockRejectedValueOnce(
      new Error("fail")
    );

    render(
      <TransactionForm
        {...baseProps}
        mode="create"
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /create transaction/i,
      })
    );

    await waitFor(() => {
      expect(createTransaction).toHaveBeenCalled();
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Failed to create transaction"
    );
  });

  // --------------------------------------------------
  // Loading state
  // --------------------------------------------------
  it("shows loading state while saving", async () => {
    let resolvePromise!: () => void;

    (createTransaction as jest.Mock).mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolvePromise = resolve;
        })
    );

    render(
      <TransactionForm
        {...baseProps}
        mode="create"
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /create transaction/i,
      })
    );

    expect(
      screen.getByRole("button", { name: /saving/i })
    ).toBeDisabled();

    resolvePromise();

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: /create transaction/i,
        })
      ).toBeEnabled();
    });
  });
});
