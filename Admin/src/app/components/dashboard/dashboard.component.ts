import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction, TransactionSummary } from '../../models/transaction.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  summary: TransactionSummary = {
    totalRevenueKobo: 0,
    totalTransactions: 0,
    successfulCount: 0,
    pendingCount: 0,
    failedCount: 0
  };

  isLoading = true;
  errorMessage = '';
  searchTerm = '';
  selectedStatus = 'all';
  sortBy = 'date-desc';

  // Details Modal
  selectedTransaction: Transaction | null = null;
  copiedReference: string | null = null;

  // Backend Integration Modal
  showBackendDocs = false;

  constructor(public transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data || [];
        this.summary = this.transactionService.calculateSummary(this.transactions);
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load transactions. Check your connection or API status.';
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    let result = [...this.transactions];

    // Status filter
    if (this.selectedStatus !== 'all') {
      result = result.filter(tx => tx.status.toLowerCase() === this.selectedStatus.toLowerCase());
    }

    // Search filter
    if (this.searchTerm.trim()) {
      const q = this.searchTerm.trim().toLowerCase();
      result = result.filter(tx => {
        return (
          tx.reference?.toLowerCase().includes(q) ||
          tx.student_name?.toLowerCase().includes(q) ||
          tx.student_email?.toLowerCase().includes(q) ||
          tx.course_name?.toLowerCase().includes(q) ||
          tx.student_school?.toLowerCase().includes(q)
        );
      });
    }

    // Sorting
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
