import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui/button/button.component';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { 
    this.isLoggedIn$ = this.authService.isLoggedIn$();
  }
  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
  getButtonVariant(route: string): 'primary' | 'secondary' | 'ghost' {
    return this.isActiveRoute(route) ? 'primary' : 'secondary';
  }

  logout() {
    this.authService.logout();
  }
}