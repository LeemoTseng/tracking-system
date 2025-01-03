import { Component, inject, Input, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MainInterfaceService, processItems } from '../../interfaces/main-interface.service';
import { MainServiceService } from '../../services/main-service.service';
import { MatRippleModule } from '@angular/material/core';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-tracking-details',
  standalone: true,
  imports: [MatIconModule, MatRippleModule, LoadingComponent],
  templateUrl: './tracking-details.component.html',
  styleUrl: './tracking-details.component.scss'
})
export class TrackingDetailsComponent {

  rippleColor = 'rgba(0,0,0,0.05)';
  isLoading = false;
  sendDetails:processItems[] =[]

  @Input() details: { generalInfo?: any, packageInfo?: any, routeInfo?: any, shipperInfo?: any, status?: any[], consigneeInfo?: any } = {};
  get generalInfo() {return this.details?.generalInfo || {};}
  get packageInfo() {return this.details?.packageInfo || {};}
  get routeInfo() {return this.details?.routeInfo || {};}
  get shipperInfo() {return this.details?.shipperInfo || {};}
  get statusList() {return this.details?.status || [];}
  get consigneeInfo() {return this.details?.consigneeInfo || {};}


  ngOnInit(): void {
    this.onLoading();
    this.getProcessData();

  }

  test() {
    // console.log('res', this.sendDetails);
  }

  processService = inject(MainServiceService);
  processInterface = inject(MainInterfaceService);


  bgColor = 'rgba(0,0,0,0.05)';

  processList: processItems[] = [];
  nowStatus: string = 'Booking Creation';


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

  isCompleted(status: string): boolean {
    const nowDate = new Date();
    const statuses = this.processList.map((item) => item.status);
    const currentIndex = statuses.indexOf(this.nowStatus);
    const itemIndex = statuses.indexOf(status);

    const process = this.processList[itemIndex];
    if (process) {
      const processDate = new Date(process.dateAndTime);
      return itemIndex < currentIndex || processDate < nowDate;
    }

    return false;
  }

  // loading
  onLoading(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }

}
