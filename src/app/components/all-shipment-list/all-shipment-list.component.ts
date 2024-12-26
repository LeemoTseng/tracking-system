import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MainServiceService } from '../../services/main-service.service';
import { MainInterfaceService } from '../../interfaces/main-interface.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { MatRippleModule } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';




@Component({
  selector: 'app-all-shipment-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatRippleModule, PaginationComponent],
  templateUrl: './all-shipment-list.component.html',

})
export class AllShipmentListComponent implements OnInit {

  pagedItems: any[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 5;
  totalItems: number = 0;


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
          this.totalItems = this.status.length; // Use the total number of items for pagination
          this.updatePagedItems(); // Initialize first page
          // console.log('status', this.status);
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


  onPageChange(event: any): void {
    // console.log('Page event:', event);
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.updatePagedItems();
  }

  updatePagedItems(): void {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    // console.log(`Slicing from ${start} to ${end}`); // Debug slicing indices
    this.pagedItems = this.status.slice(start, end);
    // console.log('Paged items after update:', this.pagedItems); // Debug updated paged items
  }

}
