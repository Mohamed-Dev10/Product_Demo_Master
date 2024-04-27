
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000/users'; // Assuming the user data is stored in the 'users' endpoint

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users: User[]) => {
        const matchedUser = users.find(user => user.username === username && user.password === password);
        if (matchedUser) {
          localStorage.setItem('currentUser', 'true');
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {

    return localStorage.getItem('currentUser') === 'true';
  }
}
