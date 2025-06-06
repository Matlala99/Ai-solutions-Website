import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Get an item from localStorage
  getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null; // Return null on the server
  }

  // Set an item in localStorage
  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  // Remove an item from localStorage
  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  // Clear all items from localStorage
  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
}
