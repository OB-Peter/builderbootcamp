# BuilderBootcamp Admin Portal (Angular 16 • Node v16)

A dedicated Finance & Transactions management portal for BuilderBootcamp.

## Quick Start

```bash
cd Admin
npm install
npm start
```

Navigate to `http://localhost:4200/`.

---

## Admin Authentication

- **Route:** `/login`
- **Protected Routes:** `/dashboard` (Guarded by `AuthGuard`)
- **Demo Credentials:**
  - **Email:** `admin@builderbootcamp.com`
  - **Password:** `bootcampAdmin2026`
  *(A one-click "Auto-fill Demo Credentials" button is provided on the login page)*

---

## Features

1. **Transaction Metrics**:
   - Total Gross Revenue in Naira (₦) automatically converted from kobo
   - Total Transaction count
   - Successful transactions count
   - Pending / Failed transaction count
2. **Search & Filter**:
   - Real-time search across Reference codes, Student name, Email, Course name, and School
   - Filter tabs: `All`, `Success`, `Pending`, `Failed`
   - Sorting: `Newest First`, `Oldest First`, `Amount: High to Low`, `Amount: Low to High`
3. **Transaction Details Modal**:
   - Full student profile & course enrollment
   - Formatted timestamps & gateway status
   - Raw Paystack response JSON viewer with formatting
   - Quick reference code copy
4. **Data Export**:
   - One-click CSV export of filtered/current transaction lists
5. **Resilient Backend Integration**:
   - Tries `GET /api/payments/transactions`
   - Falls back gracefully to schema-compliant mock data while the backend team implements the endpoint, with a top warning banner and live retry.

---

## For the Backend Developer

The admin portal expects the following endpoint on the server:

### Endpoint:
`GET /api/payments/transactions`

### Expected SQL Query:
```sql
SELECT 
  t.id,
  t.student_id,
  t.reference,
  t.amount_kobo,
  t.status,
  t.raw_response,
  t.created_at,
  s.full_name AS student_name,
  s.email AS student_email,
  s.phone AS student_phone,
  s.school AS student_school,
  c.name AS course_name
FROM transactions t
LEFT JOIN students s ON t.student_id = s.id
LEFT JOIN courses c ON s.course_id = c.id
ORDER BY t.created_at DESC;
```

### Response JSON (HTTP 200):
```json
[
  {
    "id": 1,
    "student_id": 1,
    "reference": "bb_9d8e7a6b5c4f3a21",
    "amount_kobo": 5000000,
    "status": "success",
    "student_name": "Babajide Adeleke",
    "student_email": "babajide@example.com",
    "student_phone": "+234 803 123 4567",
    "student_school": "University of Lagos",
    "course_name": "Front-End Engineering",
    "raw_response": {},
    "created_at": "2026-10-01T07:11:05.000Z"
  }
]
```
