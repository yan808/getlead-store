# GetLead.Store - SaaS Lead Generation Platform

A modern, production-ready web application for automatic lead generation and delivery to service businesses.

## 🚀 Features

- **Modern Design**: Brillance SaaS template with premium UI/UX
- **Authentication**: Supabase auth with email/password
- **Dashboard**: Real-time lead management and analytics
- **Onboarding**: 3-step business setup process
- **Pricing**: Transparent pricing with Stripe integration
- **Responsive**: Mobile-first design for all devices

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router + TypeScript)
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Notifications**: Twilio SMS, Resend Email
- **Charts**: Recharts
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account (optional for payments)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd getlead.store
npm install
```

### 2. Environment Setup

Create `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration (Optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Notification Services (Optional)
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
RESEND_API_KEY=your_resend_api_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
```

### 3. Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the following schema:

```sql
-- Organizations table
CREATE TABLE organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  niche TEXT,
  service_area TEXT,
  lead_volume TEXT,
  city TEXT,
  state TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  description TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  status TEXT DEFAULT 'new',
  price DECIMAL(10,2) DEFAULT 20.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members table
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'manager',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own organizations" ON organizations
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can view leads from their organizations" ON leads
  FOR SELECT USING (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert leads to their organizations" ON leads
  FOR INSERT WITH CHECK (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  );
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📱 Pages

- **`/`** - Landing page with hero, features, pricing
- **`/signup`** - User registration
- **`/signin`** - User login
- **`/onboarding`** - 3-step business setup
- **`/dashboard`** - Main dashboard with leads and analytics
- **`/pricing`** - Pricing plans and FAQ

## 🔧 API Routes

- **`/api/leads`** - GET/POST leads for authenticated users
- **`/api/leads/seed`** - POST create test leads
- **`/api/stripe/webhook`** - Stripe payment webhooks (coming soon)

## 🎨 Design System

The application uses the **Brillance SaaS template** design system:

- **Colors**: Blue (#1A73E8), Green (#3DBE91), Light backgrounds
- **Typography**: Inter font family
- **Components**: shadcn/ui components
- **Layout**: Responsive grid system

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

```bash
npm run build
npm start
```

## 🔐 Authentication Flow

1. User signs up with email/password
2. Supabase creates user account
3. User completes onboarding (niche, area, volume)
4. User is redirected to dashboard
5. Dashboard shows user's leads and analytics

## 📊 Database Schema

### Organizations
- Business information
- Service area and niche
- Lead volume preferences
- Stripe customer ID

### Leads
- Customer contact information
- Service description
- Status tracking
- Pricing

### Team Members
- Role-based access control
- Organization permissions

## 🛡 Security

- Row Level Security (RLS) enabled
- User authentication required
- Organization-based data isolation
- Secure API endpoints

## 📈 Analytics

- Total leads count
- New leads tracking
- Completed leads
- Revenue calculations
- Lead status distribution

## 🔔 Notifications (Coming Soon)

- SMS notifications via Twilio
- Email notifications via Resend
- Telegram bot integration
- Real-time updates

## 💳 Payments (Coming Soon)

- Stripe Checkout integration
- $200 activation fee
- Per-lead pricing
- Automatic billing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support, email support@getlead.store or create an issue on GitHub.

---

**Built with ❤️ using Next.js, Supabase, and Tailwind CSS**