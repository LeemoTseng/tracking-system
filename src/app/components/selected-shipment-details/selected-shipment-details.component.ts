import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../footer/footer.component';
import { TrackingDetailsComponent } from '../tracking-details/tracking-details.component';
import { OtherDetailsComponent } from '../other-details/other-details.component';
import { MainServiceService } from '../../services/main-service.service';
import { MainInterfaceService, processItems } from '../../interfaces/main-interface.service';
import { milestonesInterface } from '../../all-interface';

@Component({
  selector: 'app-selected-shipment-details',
  standalone: true,
  imports: [HeaderComponent, MatIconModule, FooterComponent,
    TrackingDetailsComponent, OtherDetailsComponent, RouterLink
  ],
  templateUrl: './selected-shipment-details.component.html',
})
export class SelectedShipmentDetailsComponent {
  router = inject(Router);
  isLogin: boolean = false;
  isShow = false;
  username: string = '';
  isLoading = true;

  selectedtrackingNumber = '1234567890';
  searchResult: any = [];

  trackingNumber: string = '';

  rippleColor = 'rgba(0,0,0,0.05)';
  isValidTrackingNumber: boolean = false;
  alertMessage: string = '';

  // Get process data

  processService = inject(MainServiceService);
  processInterface = inject(MainInterfaceService);

  bgColor = 'rgba(0,0,0,0.05)';

  processList: processItems[] = [];
  nowStatus: string = 'Booking Creation';

  // get shipment details
  mainService = inject(MainServiceService);
  processItems = inject(MainInterfaceService);

  milestones: milestonesInterface[] = [];
  milestonesColumns: any[] = [];

  flights: any[] = [];
  flightsColumns: any[] = [];

  columns: any[] = [];
  ImgDataSource: any[] = [];
  fileDataSource: any[] = [];

  //Send Data
  isShipmentCompleted: boolean = false;

  ngOnInit(): void {
    this.resetWindow();
    this.isShow = false;
    this.checkLoginStatus();
    this.onLoading();
    this.getTrackingNumberFromSession();
    this.getProcessData();
    this.getShipmentDetailsData()
  }

  getSelectedMenu(menu: string) {
    // console.log('menu:', menu);
    if (menu === 'Milestones') {
      this.getMilestoneData();
      this.getFlightsData();
    } else if (menu === 'Files') {
      this.getFilesData();
      // console.log('this.flights',this.flights)
      // console.log('this.flightsColumns',this.flightsColumns)
    } else {
      // this.clearData();
    }
  }

  // Login status
  checkLoginStatus(): void {
    const isLoggedIn = this.getCookie('isLoggedIn');
    const username = this.getCookie('username');
    if (isLoggedIn === 'true' && username) {
      this.isLogin = true;
      this.username = username;
    } else {
      this.isLogin = false;
      this.router.navigate(['/login']); 
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

  onLoading(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  // Get process data


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
        // console.log('nowStatus:', this.nowStatus);
        // console.log('processList:', this.processList);
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

  // Get shipment details

  [key: string]: any;

  General_Info: any[] = [];
  Package_Info?: any[] = [];
  Route_Info: any[] = [];
  Shipper_Info?: any[] = [];
  Consignee_Info?: any[] = [];

  getShipmentDetailsData() {
    this.mainService.getShipmentDetailsData().subscribe({
      next: (res) => {
        this.General_Info = res.General_Info.map((item: any) => ({ ...item, isCopied: false }));
        this.Package_Info = res.Package_Info.map((item: any) => ({ ...item, isCopied: false }));
        this.Route_Info = res.Route_Info.map((item: any) => ({ ...item, isCopied: false }));
        this.Shipper_Info = res.Shipper_Info.map((item: any) => ({ ...item, isCopied: false }));
        this.Consignee_Info = res.Consignee_Info.map((item: any) => ({ ...item, isCopied: false }));
      },
      error: (err) => { console.log(err) },
      complete: () => { }
    })
  }

  getFlightsData(): void {
    const column = ['Order', 'Flight No.', 'From', 'To', 'ETD', 'ATD', 'ETA', 'ATA']
    this.flightsColumns = column;
    this.mainService.getFlightsData().subscribe({
      next: (res) => {
        this.flights = res.flights;
        // console.log('getFlightsData',res.flights);
      },
      error: (err) => { console.log(err) },
      complete: () => { }
    })
  }

  getMilestoneData(): void {
    const column = ['Order', 'Milestone', 'Date and Time', 'Files']
    this.milestonesColumns = column;
    this.mainService.getMilestoneData().subscribe({
      next: (res) => {
        this.milestones = res.milestones;
        // console.log(this.milestones);
      },
      error: (err) => { console.log(err) },
      complete: () => { }
    })
  }

  getFilesData(): void {
    const column = ['Id', 'Type', 'Name', 'Download']
    this.columns = column;
    this.mainService.getFilesData().subscribe({
      next: (res) => {
        // console.log(res.Documents);
        this.fileDataSource = res.Documents;
        this.ImgDataSource = res.Images;
      },
      error: (err) => { console.log(err) },
      complete: () => { }

    })
  }

  // Windows reset to 0,0

  resetWindow(): void {
    window.scrollTo(0, 0);
  }

}
