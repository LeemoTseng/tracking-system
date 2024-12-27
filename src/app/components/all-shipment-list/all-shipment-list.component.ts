import { Component, inject, Inject, Input, input, OnInit, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MainServiceService } from '../../services/main-service.service';
import { MainInterfaceService } from '../../interfaces/main-interface.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { MatRippleModule } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { last } from 'rxjs';




@Component({
  selector: 'app-all-shipment-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatRippleModule, PaginationComponent],
  templateUrl: './all-shipment-list.component.html',

})
export class AllShipmentListComponent implements OnInit {

  @Input() sendedSelectedMenu: string = '';

  pagedItems: any[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  ngOnInit(): void {
    this.getAllCargosData();
    // console.log('ChildSelectedMenu:', this.sendedSelectedMenu);
  }

  test() {
    // console.log('ChildSelectedMenu:', this.sendedSelectedMenu);
  }

  statusService = inject(MainServiceService);
  statusInterface = inject(MainInterfaceService);

  status: any[] = [];
  // statusProcesses: statusInterface[] = [];

  getAllCargosData() {
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
                isPassed: this.passedStatus(process.dateAndTime),
              }
              )),
            }
          })
          console.log('item:', this.status)

          this.totalItems = this.status.length; // Use the total number of items for pagination
          this.updatePagedItems(); // Initialize first page
        }
      },
      error: (err) => { console.log(err) },
      complete: () => { }
    })
  }

  getOnGoingData(){
    this.sendedSelectedMenu = 'On Going';
    
  }


  passedStatus(item: any): any {
    const nowDate = new Date();
    if (item) {
      const processDate = new Date(item);
      const diff = processDate.getTime() - nowDate.getTime();
      if (diff <= 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

lastStatus(item: any): any {
  if (!Array.isArray(item)) {
    console.error('lastStatus: item is not an array:', item);
    return 'Invalid Data';
  }

  // 從後向前搜尋
  for (let i = item.length - 1; i >= 0; i--) {
    const process = item[i];
    if (process.isPassed === true) {
      return process.status; // 找到最後一個 true 的項目，返回 status
    }
  }

  return 'Unknown'; // 如果沒有找到符合條件的項目
}




  // flightTo(item: any): string {
  //   const nowDate = new Date();
  //   let closestPastStatus: string = ''; // 最近的過去狀態
  //   let maxPastDiff = -Infinity; // 最大的過去差值

  //   // 遍歷 process 的有效日期
  //   item.processes.forEach((process: { status: string; dateAndTime: string }) => {
  //     if (process.dateAndTime) {
  //       const processDate = new Date(process.dateAndTime);
  //       const diff = processDate.getTime() - nowDate.getTime();

  //       if (diff <= 0) {
  //         // 更新最近的過去狀態
  //         if (diff > maxPastDiff) {
  //           maxPastDiff = diff;
  //           closestPastStatus = process.status;
  //         }
  //       }
  //     }
  //   });

  //   // 如果所有日期都在過去，返回最近的過去狀態
  //   return closestPastStatus || 'ATA';
  // }




  formatDate(dateString: string): string {
    if (!dateString) {
      return '-'; // Fallback for empty dates
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '-'; // Fallback for invalid dates
    }

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
    console.log('Paged items after update:', this.pagedItems); // Debug updated paged items

  }

}
