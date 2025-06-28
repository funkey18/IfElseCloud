import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppCookieServiceService {

  constructor() { }

  // Encode using Base64
  private encodeData(data: any): string {
    return btoa(encodeURIComponent(JSON.stringify(data)));
  }

  // Decode Base64 data
  private decodeData(encodedData: string): any {
    return JSON.parse(decodeURIComponent(atob(encodedData))); // Convert Base64 string back to object
  }

  // Store session data in cookie
  setSessionData(key: string, data: any, expiryDays: number = 1) {
    const encodedData = this.encodeData(data);
    sessionStorage.setItem(key, encodedData);
  }

  // Retrieve session data from cookie
  getSessionData(key: string): any {
    const encodedData = sessionStorage.getItem(key);
    return encodedData ? this.decodeData(encodedData) : null;
  }

  // Delete session data
  clearSessionData(key: string) {
    sessionStorage.removeItem(key);
  }
}