import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AccountForm } from './AccountForm'
import { AccountType, Currency } from '@prisma/client'
import { createAccount, updateAccount } from '@/actions/accounts'

// --------------------
// Mocks
// --------------------
jest.mock('@/actions/accounts', () => ({
  createAccount: jest.fn(),
  updateAccount: jest.fn(),
}))

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

// --------------------
// Helpers
// --------------------
function renderForm(
  props?: Partial<React.ComponentProps<typeof AccountForm>>
) {
  return render(
    <AccountForm
      mode="create"
      onSuccess={jest.fn()}
      {...props}
    />
  )
}

// --------------------
// Tests
// --------------------
describe('AccountForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders creation fields in create mode', () => {
    renderForm()

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/initial balance/i)).toBeInTheDocument()
    expect(screen.getByText(/account type/i)).toBeInTheDocument()
    expect(screen.getByText(/currency/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /create account/i })
    ).toBeInTheDocument()
  })

  it('does not render balance and account type fields in edit mode', () => {
    renderForm({ mode: 'edit', accountId: '123' })

    expect(
      screen.queryByLabelText(/initial balance/i)
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText(/account type/i)
    ).not.toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /save changes/i })
    ).toBeInTheDocument()
  })

  it('calls createAccount with correct data', async () => {
    const user = userEvent.setup()
    const onSuccess = jest.fn()

    renderForm({ onSuccess })

    await user.type(
      screen.getByLabelText(/name/i),
      'My Account'
    )

    await user.clear(
      screen.getByLabelText(/initial balance/i)
    )

    await user.type(
      screen.getByLabelText(/initial balance/i),
      '100'
    )

    await user.click(
      screen.getByRole('button', { name: /create account/i })
    )

    expect(createAccount).toHaveBeenCalledWith({
      name: 'My Account',
      accountType: AccountType.CHECKING,
      currency: Currency.USD,
      balance: '100',
      parentId: undefined,
      isActive: true,
    })

    expect(onSuccess).toHaveBeenCalled()
  })

  it('calls updateAccount in edit mode', async () => {
    const user = userEvent.setup()
    const onSuccess = jest.fn()

    renderForm({
      mode: 'edit',
      accountId: 'abc-123',
      onSuccess,
      defaultValues: {
        name: 'Old name',
        accountType: AccountType.CHECKING,
        currency: Currency.USD,
        balance: '0',
      },
    })

    await user.clear(
      screen.getByLabelText(/name/i)
    )

    await user.type(
      screen.getByLabelText(/name/i),
      'New name'
    )

    await user.click(
      screen.getByRole('button', { name: /save changes/i })
    )

    expect(updateAccount).toHaveBeenCalledWith(
      'abc-123',
      {
        name: 'New name',
        currency: Currency.USD,
      }
    )

    expect(onSuccess).toHaveBeenCalled()
  })
})
