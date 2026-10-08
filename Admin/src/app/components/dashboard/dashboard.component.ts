import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TransactionService } from '../../services/transaction.service';
import { Transaction, TransactionSummary } from '../../models/transaction.model';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Navigation / Tabs
  activeTab: 'transactions' | 'students' = 'transactions';

  // Transactions State
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  summary: TransactionSummary = {
    totalRevenueKobo: 0,
    totalTransactions: 0,
    successfulCount: 0,
    pendingCount: 0,
    failedCount: 0
  };
  searchTerm = '';
  selectedStatus = 'all';
  sortBy = 'date-desc';

  // Students State
  students: Student[] = [];
  filteredStudents: Student[] = [];
  studentSearchTerm = '';
  selectedStudentStatus = 'all';
  studentSortBy = 'date-desc';
  paidStudentsCount = 0;
  pendingStudentsCount = 0;

  // UI States
  isLoading = true;
  errorMessage = '';

  // Details Modal
  selectedTransaction: Transaction | null = null;
  copiedReference: string | null = null;

  constructor(public transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    forkJoin({
      transactions: this.transactionService.getTransactions().pipe(
        catchError((err) => {
          console.error('Error loading transactions:', err);
          return of([] as Transaction[]);
        })
      ),
      students: this.transactionService.getStudents().pipe(
        catchError((err) => {
          console.error('Error loading students:', err);
          return of([] as Student[]);
        })
      )
    }).subscribe({
      next: ({ transactions, students }) => {
        this.transactions = transactions || [];
        this.students = students || [];

        // Compute transaction metrics
        this.summary = this.transactionService.calculateSummary(this.transactions);

        // Compute student metrics
        this.computeStudentStats();

        // Apply filters
        this.applyFilters();
        this.applyStudentFilters();

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load dashboard data:', err);
        this.errorMessage = 'Failed to load dashboard data. Please verify your backend server.';
        this.isLoading = false;
      }
    });
  }

  computeStudentStats(): void {
    let paid = 0;
    let pending = 0;
    for (const s of this.students) {
      const st = (s.payment_status || '').toLowerCase();
      if (st === 'paid' || st === 'success') {
        paid++;
      } else {
        pending++;
      }
    }
    this.paidStudentsCount = paid;
    this.pendingStudentsCount = pending;
  }

  setActiveTab(tab: 'transactions' | 'students'): void {
    this.activeTab = tab;
  }

  // Transaction Filters & Sort
  applyFilters(): void {
    let result = [...this.transactions];

    if (this.selectedStatus !== 'all') {
      result = result.filter(
        (tx) => (tx.status || '').toLowerCase() === this.selectedStatus.toLowerCase()
      );
    }

    if (this.searchTerm.trim()) {
      const q = this.searchTerm.trim().toLowerCase();
      result = result.filter((tx) => {
        const ref = (tx.reference || '').toLowerCase();
        const name = (tx.full_name || tx.student_name || '').toLowerCase();
        const email = (tx.email || tx.student_email || '').toLowerCase();
        const course = (tx.course_name || tx.course_title || '').toLowerCase();
        const school = (tx.institution || tx.student_school || tx.school || '').toLowerCase();
        return (
          ref.includes(q) ||
          name.includes(q) ||
          email.includes(q) ||
          course.includes(q) ||
          school.includes(q)
        );
      });
    }

    result.sort((a, b) => {
      if (this.sortBy === 'date-desc') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (this.sortBy === 'date-asc') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (this.sortBy === 'amount-desc') {
        return (b.amount_kobo || 0) - (a.amount_kobo || 0);
      } else if (this.sortBy === 'amount-asc') {
        return (a.amount_kobo || 0) - (b.amount_kobo || 0);
      }
      return 0;
    });

    this.filteredTransactions = result;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  setStatusFilter(status: string): void {
    this.selectedStatus = status;
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  // Student Filters & Sort
  applyStudentFilters(): void {
    let result = [...this.students];

    if (this.selectedStudentStatus !== 'all') {
      result = result.filter((s) => {
        const st = (s.payment_status || 'pending').toLowerCase();
        if (this.selectedStudentStatus === 'paid') {
          return st === 'paid' || st === 'success';
        } else if (this.selectedStudentStatus === 'pending') {
          return st !== 'paid' && st !== 'success';
        }
        return true;
      });
    }

    if (this.studentSearchTerm.trim()) {
      const q = this.studentSearchTerm.trim().toLowerCase();
      result = result.filter((s) => {
        const name = (s.full_name || '').toLowerCase();
        const email = (s.email || '').toLowerCase();
        const phone = (s.phone || '').toLowerCase();
        const course = (s.course_name || '').toLowerCase();
        const school = (s.school || s.institution || '').toLowerCase();
        const ref = (s.reference || '').toLowerCase();
        return (
          name.includes(q) ||
          email.includes(q) ||
          phone.includes(q) ||
          course.includes(q) ||
          school.includes(q) ||
          ref.includes(q)
        );
      });
    }

    result.sort((a, b) => {
      if (this.studentSortBy === 'date-desc') {
        return (
          new Date(b.created_at || '').getTime() -
          new Date(a.created_at || '').getTime()
        );
      } else if (this.studentSortBy === 'date-asc') {
        return (
          new Date(a.created_at || '').getTime() -
          new Date(b.created_at || '').getTime()
        );
      } else if (this.studentSortBy === 'name-asc') {
        return (a.full_name || '').localeCompare(b.full_name || '');
      } else if (this.studentSortBy === 'name-desc') {
        return (b.full_name || '').localeCompare(a.full_name || '');
      }
      return 0;
    });

    this.filteredStudents = result;
  }

  onStudentSearchChange(): void {
    this.applyStudentFilters();
  }

  setStudentStatusFilter(status: string): void {
    this.selectedStudentStatus = status;
    this.applyStudentFilters();
  }

  onStudentSortChange(): void {
    this.applyStudentFilters();
  }

  // Modals & Actions
  openDetails(tx: Transaction): void {
    this.selectedTransaction = tx;
  }

  closeDetails(): void {
    this.selectedTransaction = null;
  }

  copyReference(reference: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    navigator.clipboard.writeText(reference).then(() => {
      this.copiedReference = reference;
      setTimeout(() => {
        this.copiedReference = null;
      }, 2000);
    });
  }

  exportCsv(): void {
    this.transactionService.exportToCsv(this.filteredTransactions);
  }

  exportStudentsCsv(): void {
    this.transactionService.exportStudentsToCsv(this.filteredStudents);
  }

  formatNaira(amountKobo: number): string {
    const naira = (amountKobo || 0) / 100;
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(naira);
  }

  formatJson(data: any): string {
    if (!data) return 'No raw payload available';
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  }
}
