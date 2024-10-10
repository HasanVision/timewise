import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) { }

  fetchCurrentUser(): Observable<any> {
    const token = this.getAccessToken();
    if (!token) {
      console.error('No access token found');
      this.logout();  
      return throwError(() => new Error('No access token found')); 
    }
  
    return this.http.get('http://localhost:4000/api/current-user', {
      headers: {
        Authorization: `Bearer ${token}`,  // Ensure token is sent
      }
    }).pipe(
      tap((user) => {
        this.currentUserSubject.next(user); 
      }),
      catchError((error) => {
        console.error('Error fetching current user:', error);
        if (error.status === 401 || error.status === 403) {
          // this.logout();
        }
        return throwError(() => new Error('Error fetching current user'));
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

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Call this method after login to update the logged-in state
  login(user: any) {
    this.loggedInSubject.next(true);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { tap } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
//   private currentUserSubject = new BehaviorSubject<any>(null);
//   public currentUser = this.currentUserSubject.asObservable();

//   constructor(private router: Router , private http: HttpClient) { }

//   fetchCurrentUser(): Observable<any> {
//     const token = this.getAccessToken();
//     if (!token) {
//       // Return an error or redirect to login if token is missing
//       console.error('No access token found');
//       this.logout();  
//       return new Observable();  
//     }
  
//     return this.http.get('http://localhost:4000/api/current-user', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       // withCredentials: true,
//     }).pipe(
//       tap((user) => {
//         this.currentUserSubject.next(user); // Store the user data
//       }),
//       catchError((error) => {
//         console.error('Error fetching current user:', error);
//         if (error.status === 401 || error.status === 403) {
//           // TODO: Redirect to login page SHOULD PUT IT BACK IN PRODUCTION
//           // this.logout();
//         }
//         return throwError(error);
//       })
//     );
//   }

//   getCurrentUser(): any {
//     return this.currentUserSubject.value;
//   }

//   // Emits whether the user is logged in or not
//   isLoggedIn$(): Observable<boolean> {
//     return this.loggedInSubject.asObservable();
//   }

//   logout() {
//     localStorage.removeItem('user');
//     this.loggedInSubject.next(false); // Update the logged-in state
//     this.router.navigate(['/login']);
//   }

//   // Check if the user is logged in by checking for user data in localStorage
//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('user');
    
//   }

//   getAccessToken(): string | null {
//     return localStorage.getItem('accessToken');
    
//   }
  

//   // Call this method after login to update the logged-in state
//   login(user: any) {
//     this.loggedInSubject.next(true);
//     localStorage.setItem('user', JSON.stringify(user));
//     this.currentUserSubject.next(user);
    
//   }
// }