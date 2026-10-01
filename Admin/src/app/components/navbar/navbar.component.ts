import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TransactionService } from '../../services/transaction.service';
import { AdminUser } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: AdminUser | null = null;

  constructor(
    public authService: AuthService,
    public transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  onLogout(): void {
    if (confirm('Are you sure you want to sign out of the Admin Portal?')) {
      this.authService.logout();
    }
  }
}
