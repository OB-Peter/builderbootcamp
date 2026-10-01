export interface Transaction {
  id: number;
  student_id?: number | null;
  reference: string;
  amount_kobo: number;
  status: 'success' | 'pending' | 'failed';
  raw_response?: any;
  created_at: string;
  student_name?: string;
  student_email?: string;
  student_phone?: string;
  student_school?: string;
  course_name?: string;
}

export interface TransactionSummary {
  totalRevenueKobo: number;
  totalTransactions: number;
  successfulCount: number;
  pendingCount: number;
  failedCount: number;
}
