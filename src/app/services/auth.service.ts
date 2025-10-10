import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://strapi-cloud-template-blog-ab0ea8f6c9.onrender.com';
  private tokenKey = 'jwt';

  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/local/register`, {
      username, email, password
    });
  }

  login(identifier: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/local`, {
      identifier, password
    }).pipe(
      tap((res: any) => {
        if (res.jwt) {
          localStorage.setItem(this.tokenKey, res.jwt);
        }
      })
    );
  }

  getMe(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}
