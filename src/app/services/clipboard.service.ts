import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor() { }
  private isCopied = false;

  copyText(value: string, callback?: () => void): void {
    navigator.clipboard.writeText(value).then(() => {
      console.log(value);
      this.isCopied = true;

      // 可選的回調函式，通知複製成功
      if (callback) {
        callback();
      }

      // 自動還原 isCopied 狀態
      setTimeout(() => {
        this.isCopied = false;
      }, 600);
    });
  }

  isCopying(): boolean {
    return this.isCopied;
  }
}
