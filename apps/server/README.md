# Server Tech Stack

## Core Technologies

- [NestJS](https://nestjs.com/) - Progressive Node.js framework for building server-side applications
- [GraphQL](https://graphql.org/) - Query language for APIs
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript

## Key Features

- Type-safe database access with Prisma
- GraphQL API with code-first approach
- Dependency injection and modular architecture with NestJS

## Prerequisites

- Node.js (v14 or later)
- PostgreSQL database
- PNPM (v7 or later)

## Getting Started

1. Install PNPM: `npm install -g pnpm`
2. Install dependencies: `pnpm install`
3. Set up environment variables (copy `.env.example` to `.env`)
4. Run database migrations: `pnpm prisma migrate dev`
5. Start the server: `pnpm dev`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm prisma:generate` - Generate Prisma Client
- `pnpm clean` - Clean build artifacts
- `pnpm install` - Install dependencies
