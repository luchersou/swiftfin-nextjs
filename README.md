# SwiftFin 💰

A modern personal finance management application built with Next.js 16, featuring real-time currency conversion, comprehensive transaction tracking, and insightful financial analytics.

🔗 **Live Demo**: [swiftfin-nextjs.vercel.app](https://swiftfin-nextjs.vercel.app)

## ✨ Features

### 📊 Dashboard Analytics
- Visual statistics and charts displaying your financial overview
- Real-time currency conversion using the Frankfurter API
- All data displayed in USD by default with automatic conversion rates
- Theme support for personalized viewing experience

### 💳 Account Management
- Full CRUD operations for financial accounts
- Hierarchical account structure with parent account support
- Multi-currency support (USD/EUR)
- Detailed account views showing:
  - Initial deposit
  - Total income and expenses
  - Transaction history
  - Current balance

### 📝 Transaction Management
- Complete CRUD operations for transactions
- Advanced filtering system:
  - Filter by transaction type (income/expense)
  - Filter by account
  - Filter by category
- **Server-side pagination** for optimal performance
- Transactions must be associated with an existing account

### 🏷️ Category System
- Create and delete categories on-the-fly
- Assign categories to transactions or leave uncategorized
- Flexible category management within the transaction form

### 💱 Multi-Currency Support
- Choose between USD or EUR for each account
- Automatic currency conversion via Frankfurter API
- EUR transactions are automatically converted to USD in dashboard view
- Real-time exchange rate updates

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **Next Themes** - Dark/light mode support

### Backend & Database
- **Prisma** - Type-safe ORM
- **Supabase** - PostgreSQL database hosting
- **Zod** - Schema validation

### Authentication
- **Clerk** - Complete authentication solution

### Deployment
- **Vercel** - Serverless deployment platform

### External APIs
- **Frankfurter API** - Real-time currency exchange rates

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Supabase account
- Clerk account

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/swiftfin.git
cd swiftfin
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
.env
```

Fill in your environment variables:
```env
DATABASE_URL=
DIRECT_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

CLERK_WEBHOOK_SECRET=
```

4. Set up the database
```bash
npx prisma migrate dev
```

5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Usage

1. **Create an Account**: Start by creating at least one financial account
2. **Add Transactions**: Add income or expense transactions to your accounts
3. **Organize with Categories**: Create categories to organize your transactions
4. **View Analytics**: Check the dashboard for visual insights into your finances
5. **Filter & Search**: Use the transaction page to filter and find specific transactions
6. **Multi-Currency**: Create accounts in USD or EUR with automatic conversion

## 🎯 Key Highlights

- **React Server Components**: Utilizes Next.js 16 App Router with Server Components for optimal performance
- **Server-Side Pagination**: Unlike many applications that use client-side pagination, SwiftFin implements server-side pagination for better performance with large datasets
- **Real-Time Currency Conversion**: Automatic conversion between EUR and USD using live exchange rates
- **Hierarchical Accounts**: Support for parent-child account relationships
- **Flexible Categories**: Dynamic category creation and management
- **Modern UI/UX**: Built with shadcn/ui and Tailwind CSS for a polished user experience

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
