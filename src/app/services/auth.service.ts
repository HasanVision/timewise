// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor( private router: Router)
//    { }

//    logout() {
//     localStorage.removeItem('user');
//     this.router.navigate(['/login']);
// }
// isLoggedIn(): boolean {
//   return !!localStorage.getItem('user');

// }
// }
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private router: Router) { }

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
  login() {
    this.loggedInSubject.next(true); // Update the logged-in state after successful login
  }
}