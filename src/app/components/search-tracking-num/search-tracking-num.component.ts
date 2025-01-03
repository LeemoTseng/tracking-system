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

  // search tracking number
  trackingNumber: string = '';
  alertMessage: string = '';
  http = inject(HttpClient);
  searchResult: any = []; // input to tracking-details

  isValidTrackingNumber: boolean = false;
  isValidTrackingNumberOutput = output<boolean>();
  searchResultOutput = output<any[]>();

  alertMessageOutput = output<string>();
  sendAlertMessage() {
    this.alertMessageOutput.emit(this.alertMessage);
    console.log('sendAlertMessage:', this.alertMessage);
  }


  //OnInit
  ngOnInit(): void {
    this.getCookie('trackingNumber');
    if (this.trackingNumber) {
      this.onSearch(this.trackingNumber);
    }
    // this.clearCookie('trackingNumber');


  }




  // search button


  onSearch(e: string) {
    this.cleanSearchResult();
    this.sendSearchResult();

    if (this.trackingNumber === '' || this.trackingNumber !== Number(this.trackingNumber).toString()) {
      this.alertMessage = `No matching result. <br />
          Please try again!`;
      this.sendAlertMessage();
      this.isValidTrackingNumber = false;
      this.sendTrackingNumber();
      this.sendSearchResult();
    } else {
      this.saveCookie('trackingNumber', this.trackingNumber);
      const apiUrl = 'json/shipment-summary.json';
      this.http.get(apiUrl).subscribe({
        next: (res: any) => {
          this.searchResult = res.shipment
          // console.log('searchResult:', this.searchResult);
          this.isValidTrackingNumber = true;
          this.sendAlertMessage();
          this.sendTrackingNumber();
          this.sendSearchResult();
        },
        error: (err) => {
          // console.log('err',err);
          this.isValidTrackingNumber = false;
          this.alertMessage = `No matching result. <br />
          Please try again!`;
          this.sendAlertMessage();
          this.sendTrackingNumber();
          this.sendSearchResult();

        },
        complete: () => { }
      })

    }
  }

  sendTrackingNumber() {
    this.isValidTrackingNumberOutput.emit(this.isValidTrackingNumber);
    console.log('sendTrackingNumber:', this.isValidTrackingNumber);
  }
  sendSearchResult() {
    this.searchResultOutput.emit(this.searchResult);
    console.log('sendSearchResult:', this.searchResult);

  }

  cleanSearchResult() {
    this.searchResult = [];
    this.searchResultOutput.emit(this.searchResult);
    console.log('cleanSearchResult:', this.searchResult);
  }

  // sendAlertMessage() {
  //   this.alertMessageOutput.emit(this.alertMessage);
  //   console.log('sendAlertMessage:', this.alertMessage);
  // }

  // Get Cookie
  getCookie(cookieName: string): string | null {
    // console.log(document.cookie);
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === cookieName) {
        this.trackingNumber = value;
        return value;
      }
    }
    return null;
  }

  clearCookie(cookieName: string): void {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    console.log(`Cookie "${cookieName}" has been cleared.`);
  }

  saveCookie(cookieName: string, cookieValue: string): void {
  document.cookie = `${cookieName}=${cookieValue}; path=/;`;
  // console.log(`Cookie "${cookieName}" has been saved.`);

}

}
