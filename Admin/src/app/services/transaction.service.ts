import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction, TransactionSummary } from '../models/transaction.model';
import { Student } from '../models/student.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Fetches all transactions from the backend API.
   * Calls GET /payments/transactions
   */
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/payments/transactions`);
  }

  /**
   * Fetches all registered students from the backend API.
   * Calls GET /students
   */
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students`);
  }

  /**
   * Calculates overall metrics from a transaction list.
   */
  calculateSummary(transactions: Transaction[]): TransactionSummary {
    let totalRevenueKobo = 0;
    let successfulCount = 0;
    let pendingCount = 0;
    let failedCount = 0;

    for (const tx of transactions) {
      const status = (tx.status || '').toLowerCase();
      if (status === 'success') {
        successfulCount++;
        totalRevenueKobo += (tx.amount_kobo || 0);
      } else if (status === 'pending') {
        pendingCount++;
      } else if (status === 'failed') {
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
   * Exports list of transactions to CSV file and triggers browser download.
   */
  exportToCsv(transactions: Transaction[]): void {
    const headers = [
      'Transaction ID',
      'Reference',
      'Student Name',
      'Email',
      'Phone',
      'Institution',
      'Course',
      'Amount (NGN)',
      'Status',
      'Date & Time'
    ];

    const rows = transactions.map(t => [
      t.id,
      `"${t.reference || ''}"`,
      `"${t.full_name || t.student_name || 'N/A'}"`,
      `"${t.email || t.student_email || 'N/A'}"`,
      `"${t.phone || t.student_phone || 'N/A'}"`,
      `"${t.institution || t.student_school || 'N/A'}"`,
      `"${t.course_name || t.course_title || 'N/A'}"`,
      (((t.amount_kobo || 0) / 100).toFixed(2)),
      (t.status || '').toUpperCase(),
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

  /**
   * Exports list of students to CSV file and triggers browser download.
   */
  exportStudentsToCsv(students: Student[]): void {
    const headers = [
      'Student ID',
      'Full Name',
      'Email',
      'Phone',
      'School / Institution',
      'Course',
      'Payment Status',
      'Reference',
      'Registration Date'
    ];

    const rows = students.map(s => [
      s.id,
      `"${s.full_name || 'N/A'}"`,
      `"${s.email || 'N/A'}"`,
      `"${s.phone || 'N/A'}"`,
      `"${s.school || s.institution || 'N/A'}"`,
      `"${s.course_name || 'N/A'}"`,
      (s.payment_status || 'PENDING').toUpperCase(),
      `"${s.reference || 'N/A'}"`,
      `"${s.created_at ? new Date(s.created_at).toLocaleString() : 'N/A'}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `builderbootcamp_students_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
