import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Fix typo here: it should be style**s**Url
})
export class NavbarComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) { 
    // Subscribe to the isLoggedIn$ observable
    this.isLoggedIn$ = this.authService.isLoggedIn$();
  }

  logout() {
    this.authService.logout();
  }
}