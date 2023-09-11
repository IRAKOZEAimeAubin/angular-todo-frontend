import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ApiError } from './ApiError';
import { User } from './User';
import { url } from './localUrl';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private handleError(err: HttpErrorResponse): Observable<never> {
    let error = new ApiError();
    if (err.error instanceof ErrorEvent) {
      error.message = err.error.message;
    } else {
      error.status = err.status;
      error.message = err.message;
    }
    console.error(error);
    return throwError(() => error);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${url}/auth/login`, user).pipe(
      tap((data) => console.log('User:', data)),
      catchError(this.handleError)
    );
  }
}
