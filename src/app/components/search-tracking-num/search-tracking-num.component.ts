import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, OnInit, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-tracking-num',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  templateUrl: './search-tracking-num.component.html',
  styleUrl: './search-tracking-num.component.scss'
})
export class SearchTrackingNumComponent implements OnInit {

  trackingNumber: string = '';
  alertMessage: string = '';
  http = inject(HttpClient);
  searchResult: any = [];

  isValidTrackingNumber: boolean = false;
  isValidTrackingNumberOutput = output<boolean>();
  searchResultOutput = output<any[]>();
  alertMessageOutput = output<string>();

  sendAlertMessage() {
    this.alertMessageOutput.emit(this.alertMessage);
  }

  // OnInit
  ngOnInit(): void {
    this.getTrackingNumberFromSession();
    if (this.trackingNumber) {
      this.onSearch(this.trackingNumber);
    }
  }

  // Search button
  onSearch(e: string) {
    this.cleanSearchResult();
    this.sendSearchResult();

    if (this.trackingNumber === '' || this.trackingNumber !== Number(this.trackingNumber).toString()) {
      this.alertMessage = `No matching result. <br /> Please try again!`;
      this.sendAlertMessage();
      this.isValidTrackingNumber = false;
      // this.sendTrackingNumber();
      // this.sendSearchResult();
    } else {
      this.saveTrackingNumberToSession(this.trackingNumber); // 儲存到 Session Storage
      const apiUrl = 'json/shipment-summary.json';
      this.http.get(apiUrl).subscribe({
        next: (res: any) => {
          this.searchResult = res.shipment;
          this.isValidTrackingNumber = true;
          this.sendAlertMessage();
          this.sendTrackingNumber();
          this.sendSearchResult();
        },
        error: (err) => {
          this.isValidTrackingNumber = false;
          this.alertMessage = `No matching result. <br /> Please try again!`;
          this.sendAlertMessage();
          this.sendTrackingNumber();
          this.sendSearchResult();
        },
        complete: () => {}
      });
    }
  }

  // Session Storage Methods
  saveTrackingNumberToSession(value: string): void {
    sessionStorage.setItem('trackingNumber', value); // 儲存到 Session Storage
  }

  getTrackingNumberFromSession(): void {
    const storedTrackingNumber = sessionStorage.getItem('trackingNumber');
    if (storedTrackingNumber) {
      this.trackingNumber = storedTrackingNumber; // 從 Session Storage 中讀取
    }
  }

  clearTrackingNumberFromSession(): void {
    sessionStorage.removeItem('trackingNumber'); // 清除 Session Storage
    this.trackingNumber = '';
  }

  sendTrackingNumber() {
    this.isValidTrackingNumberOutput.emit(this.isValidTrackingNumber);
  }

  sendSearchResult() {
    this.searchResultOutput.emit(this.searchResult);
  }

  cleanSearchResult() {
    this.searchResult = [];
    this.searchResultOutput.emit(this.searchResult);
  }
}
