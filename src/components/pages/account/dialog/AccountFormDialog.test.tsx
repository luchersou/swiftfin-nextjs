import { render, screen } from '@testing-library/react';
import { AccountFormDialog } from './AccountFormDialog';
import { AccountType, Currency } from '@prisma/client';

// --------------------
// Mocks
// --------------------
jest.mock('../form/AccountForm', () => ({
  AccountForm: jest.fn(({ mode, parentId, accountId, defaultValues, onSuccess }) => (
    <div data-testid="account-form">
      <span data-testid="form-mode">{mode}</span>
      <span data-testid="form-parent-id">{parentId || 'none'}</span>
      <span data-testid="form-account-id">{accountId || 'none'}</span>
      <span data-testid="form-default-values">{JSON.stringify(defaultValues)}</span>
      <button onClick={onSuccess} data-testid="trigger-success">
        Trigger Success
      </button>
    </div>
  )),
}));

// --------------------
// Tests
// --------------------
describe('AccountFormDialog', () => {
  const mockOnOpenChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Dialog rendering', () => {
    it('renders dialog when open is true', () => {
      render(
        <AccountFormDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          mode="create"
        />
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('does not render dialog content when open is false', () => {
      render(
        <AccountFormDialog
          open={false}
          onOpenChange={mockOnOpenChange}
          mode="create"
        />
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Create mode', () => {
    it('displays create mode title and description', () => {
      render(
        <AccountFormDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          mode="create"
        />
      );

      expect(screen.getByText('New account')).toBeInTheDocument();
      expect(screen.getByText('Create a new account.')).toBeInTheDocument();
    });

    it('passes correct props to AccountForm in create mode', () => {
      const parentId = 'parent-123';

      render(
        <AccountFormDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          mode="create"
          parentId={parentId}
        />
      );

      expect(screen.getByTestId('form-mode')).toHaveTextContent('create');
      expect(screen.getByTestId('form-parent-id')).toHaveTextContent(parentId);
      expect(screen.getByTestId('form-account-id')).toHaveTextContent('none');
    });

    it('passes null parentId when not provided', () => {
      render(
        <AccountFormDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          mode="create"
        />
      );

      expect(screen.getByTestId('form-parent-id')).toHaveTextContent('none');
    });
  });

  describe('Edit mode', () => {
    it('displays edit mode title and description', () => {
      render(
        <AccountFormDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          mode="edit"
          accountId="account-123"
        />
      );

      expect(screen.getByText('Edit account')).toBeInTheDocument();
      expect(screen.getByText('Update the account information.')).toBeInTheDocument();
    });

    it('passes correct props to AccountForm in edit mode', () => {
      const accountId = 'account-123';
      const initialData = {
        name: 'Test Account',
        accountType: 'CHECKING' as const, 
        currency: 'USD' as const,
        balance: '1000', 
      };

      render(
        <AccountFormDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          mode="edit"
          accountId={accountId}
          initialData={initialData}
        />
      );

      expect(screen.getByTestId('form-mode')).toHaveTextContent('edit');
      expect(screen.getByTestId('form-account-id')).toHaveTextContent(accountId);
      expect(screen.getByTestId('form-default-values')).toHaveTextContent(
        JSON.stringify(initialData)
      );
    });
  });

  describe('Form interactions', () => {
    it('closes dialog when AccountForm calls onSuccess', () => {
      render(
        <AccountFormDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          mode="create"
        />
      );

      const triggerButton = screen.getByTestId('trigger-success');
      triggerButton.click();

      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
      expect(mockOnOpenChange).toHaveBeenCalledTimes(1);
    });

    it('passes onOpenChange to Dialog component', () => {
      const { rerender } = render(
        <AccountFormDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          mode="create"
        />
      );

      // Simular fechamento do dialog
      rerender(
        <AccountFormDialog
          open={false}
          onOpenChange={mockOnOpenChange}
          mode="create"
        />
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Optional props', () => {
    it('handles undefined initialData gracefully', () => {
      render(
        <AccountFormDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          mode="create"
        />
      );

      expect(screen.getByTestId('form-default-values')).toBeInTheDocument();
    });

    it('passes all props correctly when all are provided', () => {
      const props = {
        open: true,
        onOpenChange: mockOnOpenChange,
        mode: 'edit' as const,
        parentId: 'parent-456',
        accountId: 'account-789',
        initialData: {
          name: 'Full Test',
          accountType: AccountType.SAVINGS,
          currency: Currency.USD,
          balance: '5000',
        },
      };

      render(<AccountFormDialog {...props} />);

      expect(screen.getByTestId('form-mode')).toHaveTextContent('edit');
      expect(screen.getByTestId('form-parent-id')).toHaveTextContent('parent-456');
      expect(screen.getByTestId('form-account-id')).toHaveTextContent('account-789');
    });
  });
});