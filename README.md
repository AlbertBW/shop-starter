# Shop Starter Kit

A modern, full-stack e-commerce starter kit built with the [T3 stack](https://create.t3.gg/): Next.js, Prisma, tRPC, Tanstack Query, Zod, and Tailwind. It also incorporates Clerk, shadcn/ui, Tanstack Form, and Stripe. This project serves as a foundation for building custom online stores, offering essential features for product management, user authentication, and payment processing.

[**Live Demo**](https://shop-starter.albertbw.dev)

## Features

- 🛍️ **Complete E-commerce Functionality**: Product listings, cart management, checkout process
- 👤 **User Authentication**: Secure login and registration with Clerk
- 🔒 **Role-Based Access Control**: Admin and customer user roles
- 💳 **Payment Processing**: Integrated with Stripe for secure payments
- 📱 **Responsive Design**: UI that works across all devices
- 🚀 **Admin Dashboard**: Complete admin interface to manage products, orders, and users

## Tech Stack

### Core Framework

- **[Next.js 15](https://nextjs.org/)**: React framework with App Router for server components and routing
- **[TypeScript](https://www.typescriptlang.org/)**: Type safety throughout the application

### Database & ORM

- **[Prisma](https://www.prisma.io/)**: Modern ORM for database access
- **[PostgreSQL](https://www.postgresql.org/)**: Robust relational database

### Authentication & User Management

- **[Clerk](https://clerk.dev/)**: User authentication and management
- **OAuth Providers**: GitHub and Google login support

### UI & Styling

- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)**: Reusable UI components
- **[Lucide Icons](https://lucide.dev/)**: SVG icon set
- **[Tanstack Form](https://tanstack.com/form)**: Form state management

### State Management & API Integration

- **[tRPC](https://trpc.io/)**: End-to-end typesafe APIs
- **[Zod](https://zod.dev/)**: Schema validation
- **[Tanstack Query](https://tanstack.com/query)**: Data fetching and caching

### Payments

- **[Stripe](https://stripe.com/)**: Secure payment processing
- **[Stripe Webhooks](https://stripe.com/docs/webhooks)**: Real-time event handling
