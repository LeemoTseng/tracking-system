import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MainServiceService } from '../../services/main-service.service';
import { MainInterfaceService } from '../../interfaces/main-interface.service';
import { statusInterface } from '../../all-interface';




@Component({
  selector: 'app-all-shipment-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  templateUrl: './all-shipment-list.component.html',

})
export class AllShipmentListComponent implements OnInit {

  ngOnInit(): void {
    this.getStatusData();
    // console.log('status', this.status);
  }


  statusService = inject(MainServiceService);
  statusInterface = inject(MainInterfaceService);

  status: any[] = [];
  // statusProcesses: statusInterface[] = [];

  getStatusData() {
    this.statusService.getAllShipmentListData().subscribe({
      next: (res) => {
        if (res && res.status) {
          this.status = res.status;
          this.status = this.status.map((item) => {
            return {
              ...item,
              processes: item.processes.map((process: any) => ({
                ...process,
                formattedDate: this.formatDate(process.dateAndTime),
              })),
            }
          })
          this.status.forEach((item) => {
            const statusNow = this.flightTo(item);
            // console.log('Current status:', statusNow);
          });
          console.log('status', this.status);
        }


      },
      error: (err) => { console.log(err) },
      complete: () => { }
    })
  }


  flightTo(item: any): string {
    const nowDate = new Date();
    let closestStatus: string = '';
    let maxDiff = -Infinity;

    item.processes.forEach((process: { status: string; dateAndTime: string }) => {
      const processDate = new Date(process.dateAndTime);
      const diff = processDate.getTime() - nowDate.getTime();

      if (diff <= 0 && diff > maxDiff) {
        maxDiff = diff;
        closestStatus = process.status;
      }
    });

    if (closestStatus) {
      return closestStatus;
    } else {
      console.log('not found', item);
      return 'Not Available';
    }
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



}
