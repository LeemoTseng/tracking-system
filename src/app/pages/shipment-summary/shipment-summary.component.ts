import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MainInterfaceService, processItems } from '../../interfaces/main-interface.service';
import { OtherDetailsComponent } from '../../components/other-details/other-details.component';
import { MainServiceService } from '../../services/main-service.service';

@Component({
  selector: 'app-shipment-summary',
  standalone: true,
  imports: [HeaderComponent, MatIconModule, CommonModule,
    MatRippleModule, MatTableModule, OtherDetailsComponent,
  ],
  templateUrl: './shipment-summary.component.html',

})
export class ShipmentSummaryComponent implements OnInit {

  rippleColor = 'rgba(0,0,0,0.05)';

  ngOnInit(): void {
    this.getProcessData();
  }

  // Header -> this component
  isLogin: boolean = false;
  loginSituation(isLogin: boolean) {
    this.isLogin = isLogin;
    console.log('Summary isLogin:', this.isLogin);
  }

  processService = inject(MainServiceService);
  processInterface = inject(MainInterfaceService);

  bgColor = 'rgba(0,0,0,0.05)';

  processList: processItems[] = [];
  nowStatus: string = 'Booking Creation';

  getProcessData() {
    this.processService.getShipmentSummaryData().subscribe({
      next: (res) => {
        this.processList = res.status[0].processes;
        this.processList = this.processList.map((item: any) => {
          return {
            ...item,
            formattedDate: this.formatDate(item.dateAndTime),
          }
        });
        // console.log('processList', this.processList);
        this.nowStatus = this.getClosestStatus();
        // console.log('nowStatus:', this.nowStatus);

      },
      error: (err) => { console.log(err) },
      complete: () => { }
    })

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


  username: string = '';
  // Login status
  checkLoginStatus(): void {
    const isLoggedIn = this.getCookie('isLoggedIn');
    const username = this.getCookie('username');
    if (isLoggedIn === 'true' && username) {
      this.isLogin = true;
      this.username = username;
    } else {
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





}
