import { useRouter, useSearchParams } from "next/navigation";

import { render, screen, fireEvent } from "@testing-library/react";

import { TransactionsFilters } from "./TransactionsFilters";

// --------------------------------------------------
// Mocks
// --------------------------------------------------

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

// Mock Select to behave like a native select
jest.mock("@/components/ui/select", () => ({
  Select: ({ children, onValueChange }: any) => (
    <div>
      {children}
      <button
        data-testid="select-trigger"
        onClick={() => onValueChange("test")}
      />
    </div>
  ),
  SelectTrigger: ({ children }: any) => <div>{children}</div>,
  SelectValue: ({ placeholder }: any) => <span>{placeholder}</span>,
  SelectContent: ({ children }: any) => <div>{children}</div>,
  SelectItem: ({ children }: any) => <div>{children}</div>,
}));

describe("TransactionsFilters", () => {
  const accounts = [{ id: "acc-1", name: "Cash" }];
  const categories = [{ id: "cat-1", name: "Food" }];

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    pushMock.mockClear();
  });

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  it("renders all filter selects", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("")
    );

    render(
      <TransactionsFilters
        accounts={accounts}
        categories={categories}
      />
    );

    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
  });

  // --------------------------------------------------
  // Update filter
  // --------------------------------------------------
  it("updates query params when a filter changes", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("")
    );

    render(
      <TransactionsFilters
        accounts={accounts}
        categories={categories}
      />
    );

    fireEvent.click(screen.getAllByTestId("select-trigger")[0]);

    expect(pushMock).toHaveBeenCalledWith(
      expect.stringContaining("?type=test")
    );
  });

  // --------------------------------------------------
  // Clear button
  // --------------------------------------------------
  it("shows clear button when there are active filters", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("type=EXPENSE")
    );

    render(
      <TransactionsFilters
        accounts={accounts}
        categories={categories}
      />
    );

    expect(
      screen.getByRole("button", { name: /clear/i })
    ).toBeInTheDocument();
  });

  it("clears all filters when clear button is clicked", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("type=EXPENSE")
    );

    render(
      <TransactionsFilters
        accounts={accounts}
        categories={categories}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: /clear/i })
    );

    expect(pushMock).toHaveBeenCalledWith("?");
  });
});
