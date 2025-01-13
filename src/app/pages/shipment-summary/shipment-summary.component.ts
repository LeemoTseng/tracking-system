import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { OtherDetailsComponent } from '../../components/other-details/other-details.component';
import { TrackingDetailsComponent } from '../../components/tracking-details/tracking-details.component';
import { FormsModule } from '@angular/forms';
import { SearchTrackingNumComponent } from '../../components/search-tracking-num/search-tracking-num.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { MainInterfaceService, processItems } from '../../interfaces/main-interface.service';
import { MainServiceService } from '../../services/main-service.service';

@Component({
  selector: 'app-shipment-summary',
  standalone: true,
  imports: [HeaderComponent, MatIconModule, CommonModule,
    MatRippleModule, MatTableModule, OtherDetailsComponent,
    TrackingDetailsComponent, FormsModule, CommonModule,
    SearchTrackingNumComponent, FooterComponent, FooterComponent, RouterOutlet],
  templateUrl: './shipment-summary.component.html',
})
export class ShipmentSummaryComponent {

  trackingNumber: string = '';

  rippleColor = 'rgba(0,0,0,0.05)';
  isValidTrackingNumber: boolean = false;
  isLoading = true;
  searchResult: any = [];
  alertMessage: string = '';

  // get data

  processService = inject(MainServiceService);
  processInterface = inject(MainInterfaceService);

  bgColor = 'rgba(0,0,0,0.05)';

  processList: processItems[] = [];
  nowStatus: string = 'Booking Creation';

  // get generalInfo() { return this.details?.generalInfo || {}; }
  // get packageInfo() { return this.details?.packageInfo || {}; }
  // get routeInfo() { return this.details?.routeInfo || {}; }
  // get shipperInfo() { return this.details?.shipperInfo || {}; }
  // get statusList() { return this.details?.status || []; }
  // get consigneeInfo() { return this.details?.consigneeInfo || {}; }
test(){
  // console.log('this.processList',this.processList);
  // console.log('this.isShipmentCompleted',this.isShipmentCompleted);
}

  //Send Data
  isShipmentCompleted: boolean = false;


  // loading
  onLoading(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  ngOnInit(): void {
    this.onLoading();
    this.getTrackingNumberFromSession();
    this.getProcessData();

  }

  // Header -> this component
  isLogin: boolean = false;
  loginSituation(isLogin: boolean) {
    this.isLogin = isLogin;
    // console.log('Summary isLogin:', this.isLogin);
  }
  username: string = '';
  // Check login status from cookie
  checkLoginStatus(): void {
    const isLoggedIn = this.getCookie('isLoggedIn');
    const username = this.getCookie('username');
    if (isLoggedIn === 'true' && username) {
      this.isLogin = true;
      this.username = username;
    } else {
      // this.isLogin = false;
      // this.router.navigate(['/login']); 
    }
  }
  // Get Cookie
  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }

  getIsValidTrackingNumberOutput(v: boolean) {
    this.isValidTrackingNumber = v;
    // console.log('isValidTrackingNumber:', this.isValidTrackingNumber);
  }


  getAlertMessageOutput(v: string) {
    this.alertMessage = v;
    // console.log('alertMessage received in parent:', this.alertMessage);
  }

  getTrackingNumberFromSession(): void {
    const storedTrackingNumber = sessionStorage.getItem('trackingNumber');
    if (storedTrackingNumber) {
      this.trackingNumber = storedTrackingNumber; // 從 Session Storage 中讀取
      console.log('trackingNumber:', this.trackingNumber);
    }
  }

  // input data to child component - tracking-details
  details = { generalInfo: {}, packageInfo: {}, routeInfo: {}, shipperInfo: {}, status: [], consigneeInfo: {} };

  // Get data

  getProcessData() {
    this.processService.getShipmentSummaryData().subscribe({
      next: (res) => {
        // console.log('res', res);
        const shipmentData = res.shipment;
        this.details = {
          generalInfo: shipmentData.generalInfo,
          packageInfo: shipmentData.packageInfo,
          routeInfo: shipmentData.routeInfo,
          shipperInfo: shipmentData.shipperInfo,
          status: shipmentData.status,
          consigneeInfo: shipmentData.consigneeInfo
        };

        this.processList = shipmentData.status;
        this.processList = this.processList.map((item: any) => {
          return {
            ...item,
            formattedDate: this.formatDate(item.dateAndTime),
          };
        });
        this.nowStatus = this.getClosestStatus();
        console.log('processList:', this.processList);
      },
      error: (err) => { console.log(err) },
      complete: () => { }
    });
  }


  getClosestStatus(): string {
    const nowDate = new Date();
    let closestStatus = '';
    let minDiff = Infinity;

    this.processList.forEach((process) => {
      const processDate = new Date(process.dateAndTime);
      const diff = processDate.getTime() - nowDate.getTime();

      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
        closestStatus = process.status;
      }
    });

    if (!closestStatus) {
      closestStatus = this.processList[this.processList.length - 1]?.status || 'Not Available';
    }
    return closestStatus;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  checkIfCompleted(status: string): boolean {
    const nowDate = new Date();
    const statuses = this.processList.map((item) => item.status);
    const currentIndex = statuses.indexOf(this.nowStatus);
    const itemIndex = statuses.indexOf(status);

    const process = this.processList[itemIndex];
    if (process) {
      const processDate = new Date(process.dateAndTime);
      this.isShipmentCompleted = itemIndex < currentIndex || processDate < nowDate;
      return this.isShipmentCompleted;
    }
    this.isShipmentCompleted = false;
    return false;
  }
}
