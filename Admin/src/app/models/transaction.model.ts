export interface Transaction {
  id: number;
  student_id?: number | null;
  reference: string;
  amount_kobo: number;
  status: 'success' | 'pending' | 'failed' | string;
  raw_response?: any;
  created_at: string;
  full_name?: string;
  course_name?: string;
  course_title?: string;
  course_id?: number;
  email?: string;
  phone?: string;
  institution?: string;
  school?: string;
  student_name?: string;
  student_email?: string;
  student_phone?: string;
  student_school?: string;
}

export interface TransactionSummary {
  totalRevenueKobo: number;
  totalTransactions: number;
  successfulCount: number;
  pendingCount: number;
  failedCount: number;
}
