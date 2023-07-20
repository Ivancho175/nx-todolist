import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  public setAccessToken(token: string) {
    localStorage.setItem('nx-todolist-token', token);
  }

  public getAccessToken() {
    return localStorage.getItem('nx-todolist-token');
  }
}
