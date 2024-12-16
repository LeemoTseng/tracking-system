import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CopiedService {

  constructor() { }

  private isCopied = false;

  copyText(value: string, callback?: () => void): void {
    navigator.clipboard.writeText(value).then(() => {
      console.log(value);
      this.isCopied = true;
      if (callback) {
        callback();
      }
      setTimeout(() => {
        this.isCopied = false;
      }, 600);
    });
  }

  isCopying(): boolean {
    return this.isCopied;
  }
}
