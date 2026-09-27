# BuilderBootcamp

Bootcamp registration + Paystack payment platform.
Stack: Node.js (ES modules) + Express + MySQL (AWS RDS) + React frontend.

## Setup

### 1. Database
Run `infra/schema.sql` against your MySQL/RDS instance:
```
mysql -h <rds-endpoint> -u <user> -p < infra/schema.sql
```

### 2. Backend
```
cd server
npm install
cp .env.example .env   # fill in your real DB + Paystack keys
npm run dev
```
Server runs on http://localhost:5000 by default.

### 3. Frontend
`client/` is a full Vite + React app with routing already wired up.
```
cd client
npm install
cp .env.example .env   # points at your backend, defaults to http://localhost:5000
npm run dev
```
Runs on http://localhost:5173.

Routes:
- `/` — landing page (`Home.jsx`)
- `/register` — registration + course selection, redirects to Paystack checkout
- `/payment/callback` — verifies payment after Paystack redirects back

## Notes
- Backend uses ES modules (`import`/`export`, `"type": "module"` in package.json).
- Never expose `PAYSTACK_SECRET_KEY` to the frontend — it's only used server-side.
- The webhook route (`/api/payments/webhook`) is the reliable source of truth for
  payment confirmation; register its URL in your Paystack dashboard once deployed.
- `listStudents` (admin endpoint) has no auth yet — add authentication before
  exposing it publicly.
