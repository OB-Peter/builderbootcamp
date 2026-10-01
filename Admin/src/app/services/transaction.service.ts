import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Transaction, TransactionSummary } from '../models/transaction.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = environment.apiUrl;
  public isUsingMockData = false;
  public lastErrorMessage = '';

  // Seed sample transactions representing the database schema
  private mockTransactions: Transaction[] = [
    {
      id: 101,
      student_id: 1,
      reference: 'bb_9d8e7a6b5c4f3a21',
      amount_kobo: 5000000,
      status: 'success',
      student_name: 'Babajide Adeleke',
      student_email: 'babajide@example.com',
      student_phone: '+234 803 123 4567',
      student_school: 'University of Lagos',
      course_name: 'Full-Stack Web Development',
      created_at: '2026-09-28T14:32:10.000Z',
      raw_response: {
        status: 'success',
        reference: 'bb_9d8e7a6b5c4f3a21',
        amount: 5000000,
        currency: 'NGN',
        channel: 'card',
        gateway_response: 'Successful',
        paid_at: '2026-09-28T14:32:10.000Z',
        customer: {
          email: 'babajide@example.com',
          customer_code: 'CUS_9x48k291'
        },
        authorization: {
          authorization_code: 'AUTH_89d381023',
          bin: '408408',
          last4: '4081',
          exp_month: '12',
          exp_year: '2028',
          channel: 'card',
          card_type: 'visa',
          bank: 'Access Bank'
        }
      }
    },
    {
      id: 102,
      student_id: 2,
      reference: 'bb_1c2d3e4f5a6b7c8d',
      amount_kobo: 4000000,
      status: 'success',
      student_name: 'Chioma Okonkwo',
      student_email: 'chioma.o@example.com',
      student_phone: '+234 812 987 6543',
      student_school: 'Covenant University',
      course_name: 'Backend Engineering with Node.js',
      created_at: '2026-09-29T10:15:45.000Z',
      raw_response: {
        status: 'success',
        reference: 'bb_1c2d3e4f5a6b7c8d',
        amount: 4000000,
        currency: 'NGN',
        channel: 'bank_transfer',
        gateway_response: 'Approved by Financial Institution',
        paid_at: '2026-09-29T10:15:45.000Z',
        customer: {
          email: 'chioma.o@example.com'
        }
      }
    },
    {
      id: 103,
      student_id: 3,
      reference: 'bb_77a88b99c00d11e2',
      amount_kobo: 3500000,
      status: 'pending',
      student_name: 'Tunde Bakare',
      student_email: 'tunde.dev@example.com',
      student_phone: '+234 701 445 8899',
      student_school: 'Obafemi Awolowo University',
      course_name: 'Cloud & DevOps Fundamentals',
      created_at: '2026-09-30T16:04:12.000Z',
      raw_response: {
        status: 'pending',
        reference: 'bb_77a88b99c00d11e2',
        amount: 3500000,
        currency: 'NGN',
        gateway_response: 'Transaction initiated; awaiting customer payment'
      }
    },
    {
      id: 104,
      student_id: 4,
      reference: 'bb_fa9920b178c54de6',
      amount_kobo: 5000000,
      status: 'failed',
      student_name: 'Fatima Bello',
      student_email: 'fatima.bello@example.com',
      student_phone: '+234 905 667 1122',
      student_school: 'Ahmadu Bello University',
      course_name: 'Full-Stack Web Development',
      created_at: '2026-10-01T04:22:30.000Z',
      raw_response: {
        status: 'failed',
        reference: 'bb_fa9920b178c54de6',
        amount: 5000000,
        currency: 'NGN',
        gateway_response: 'Insufficient funds'
      }
    },
    {
      id: 105,
      student_id: 5,
      reference: 'bb_3310aa88ff62bb71',
      amount_kobo: 4000000,
      status: 'success',
      student_name: 'Emmanuel Adeyemi',
      student_email: 'emmanuel@example.com',
      student_phone: '+234 814 332 9900',
      student_school: 'University of Ibadan',
      course_name: 'Backend Engineering with Node.js',
      created_at: '2026-10-01T07:11:05.000Z',
      raw_response: {
        status: 'success',
        reference: 'bb_3310aa88ff62bb71',
        amount: 4000000,
        currency: 'NGN',
        channel: 'card',
        gateway_response: 'Successful'
      }
    }
  ];

  constructor(private http: HttpClient) {}

  /**
   * Fetches all transactions from the server.
   * If backend endpoint is 404/not yet deployed, seamlessly falls back to mock sample data.
   */
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/payments/transactions`).pipe(
      tap(() => {
        this.isUsingMockData = false;
        this.lastErrorMessage = '';
      }),
      catchError((error: HttpErrorResponse) => {
        // Also attempt alternative route /api/transactions
        return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`).pipe(
          tap(() => {
            this.isUsingMockData = false;
            this.lastErrorMessage = '';
          }),
          catchError(() => {
            this.isUsingMockData = true;
            this.lastErrorMessage =
              'Backend endpoint (/api/payments/transactions) is not yet active. Showing demo data matching database schema.';
            return of(this.mockTransactions);
          })
        );
      })
    );
  }

  /**
   * Calculates overall metrics from a transaction list
   */
  calculateSummary(transactions: Transaction[]): TransactionSummary {
    let totalRevenueKobo = 0;
    let successfulCount = 0;
    let pendingCount = 0;
    let failedCount = 0;

    for (const tx of transactions) {
      if (tx.status === 'success') {
        successfulCount++;
        totalRevenueKobo += (tx.amount_kobo || 0);
      } else if (tx.status === 'pending') {
        pendingCount++;
      } else if (tx.status === 'failed') {
        failedCount++;
      }
    }

    return {
      totalRevenueKobo,
      totalTransactions: transactions.length,
      successfulCount,
      pendingCount,
      failedCount
    };
  }

  /**
   * Exports list of transactions to CSV file and triggers browser download
   */
  exportToCsv(transactions: Transaction[]): void {
    const headers = [
      'Transaction ID',
      'Reference',
      'Student Name',
      'Email',
      'Phone',
      'Course',
      'Amount (NGN)',
      'Status',
      'Date & Time'
    ];

    const rows = transactions.map(t => [
      t.id,
      `"${t.reference}"`,
      `"${t.student_name || 'N/A'}"`,
      `"${t.student_email || 'N/A'}"`,
      `"${t.student_phone || 'N/A'}"`,
      `"${t.course_name || 'N/A'}"`,
      (t.amount_kobo / 100).toFixed(2),
      t.status.toUpperCase(),
      `"${new Date(t.created_at).toLocaleString()}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `builderbootcamp_transactions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
