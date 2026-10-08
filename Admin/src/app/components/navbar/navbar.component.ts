import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AdminUser } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: AdminUser | null = null;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
