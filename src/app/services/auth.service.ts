import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Firebase imports
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$: Observable<any> = this.userSubject.asObservable();
  
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    // Get auth state, then fetch user data
    this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.userSubject.next({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          });
          return of(user);
        } else {
          this.userSubject.next(null);
          return of(null);
        }
      })
    ).subscribe();
  }

  // Google Auth
  async googleLogin(): Promise<any> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      console.log('Google login successful');
      return credential;
    } catch (error) {
      console.error('Error during Google login:', error);
      throw error;
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  // Get current user
  getCurrentUser(): any {
    return this.userSubject.value;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }
} 