
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private router: Router , private http: HttpClient) { }

  fetchCurrentUser(): Observable<any> {
    return this.http.get('/api/current-user').pipe(
      tap((user) => {
        this.currentUserSubject.next(user); // Store the user data
      })
    );
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  // Emits whether the user is logged in or not
  isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  logout() {
    localStorage.removeItem('user');
    this.loggedInSubject.next(false); // Update the logged-in state
    this.router.navigate(['/login']);
  }

  // Check if the user is logged in by checking for user data in localStorage
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  // Call this method after login to update the logged-in state
  login(user: any) {
    this.loggedInSubject.next(true);
    this.currentUserSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
}