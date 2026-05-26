# Goa Trust Realty Backend Services

A highly optimized, premium Next.js and Prisma 7 real estate backend designed using **Domain-Driven Design (DDD)** and **Clean Architecture** patterns. 

---

## 🛠️ Architecture & Core Design

The backend is built around strict separation of concerns, located within `src/lib/backend`:

- **Domain Layer (`/domain`)**: Declares pure, storage-agnostic business schemas (via `zod` validations) and database repository contracts (`IPropertyRepository` interface).
- **Infrastructure Layer (`/infrastructure`)**: Implements database interactions using `PrismaClient` with smart connection fallback logic.
- **Application Layer (`/api`)**: Modular Next.js App Router API handlers translating raw HTTP queries into clean application operations.

---

## 💾 Smart Lazy-Loading Database & Fallback Store

To facilitate zero-friction local development, the backend features a **Prisma 7 Lazy-Loading Engine**:
- **Automatic DB Detection**: If no `DATABASE_URL` is found in your environment variables, the backend automatically detects it and degrades gracefully to an in-memory mock-database populated with high-fidelity mock data.
- **Build-Time Optimization**: Prisma Client instantiation is evaluated lazily. This prevents build failures during static-generation phases on platforms like Vercel.

---

## 📋 API Reference & Interactive Scalar Documentation

The project includes a modern, high-fidelity **Scalar API Documentation** playground with a built-in REST request executor.

- **Endpoint**: `GET /docs` (or route to [http://localhost:3000/docs](http://localhost:3000/docs) when running locally)
- **Specification Schema**: Served dynamically at `/openapi.json`.

### Available Endpoints:

#### `GET /api/properties`
Fetch listings with advanced text search and query filters.
- **Query Parameters**:
  - `search`: Keyword match on property title or location.
  - `location`: Filter listings strictly by location (e.g. `Assagao`).
  - `listingType`: Contract type limit (`sale` or `rent`).

#### `POST /api/properties`
Registers a new real-estate listing. Body is fully sanitized using Zod schemas. Duplicate slug conflicts trigger a `409` code.

#### `GET /api/properties/[id-or-slug]`
Fetch listing details. Supports dual UUID identifier match or fallback match on unique URL slugs.

#### `PUT /api/properties/[id]`
Updates listing details. Body values are partially sanitized.

#### `DELETE /api/properties/[id]`
Permanently removes a listing from the catalog.

---

## 🧪 Unit Testing Suite (Vitest)

An ultra-fast unit testing suite is configured using **Vitest** for isolated, mock-free route testing.

### Run Tests:
Execute once:
```bash
npm run test
```

Active development / Watch mode:
```bash
npm run test:watch
```

---

## 🚀 Getting Started

### 1. Install dependencies:
```bash
npm install
```

### 2. Generate Prisma Client local typings:
```bash
npx prisma generate
```

### 3. Spin up the Next.js development server:
```bash
npm run dev
```

### 4. Run automated endpoint suite check:
Ensure your development server is active, then execute:
```bash
node scripts/test-api.js
```
