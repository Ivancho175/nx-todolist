import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

const apiUrl = process.env['NX_API_URL'];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public async loginUser(data: { email: string; password: string }) {
    const response = this.http.post(apiUrl + '/auth/login', data);
    return lastValueFrom(response);
  }
}
