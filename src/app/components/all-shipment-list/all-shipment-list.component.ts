import { Component, inject, Inject, Input, input, OnInit, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MainServiceService } from '../../services/main-service.service';
import { MainInterfaceService } from '../../interfaces/main-interface.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { MatRippleModule } from '@angular/material/core';
import { LoadingComponent } from '../loading/loading.component';
// import { PageEvent } from '@angular/material/paginator';
// import { last } from 'rxjs';




@Component({
  selector: 'app-all-shipment-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatRippleModule, PaginationComponent, LoadingComponent, LoadingComponent],
  templateUrl: './all-shipment-list.component.html',

})
export class AllShipmentListComponent implements OnInit {

  @Input() sendedSelectedMenu: string = '';
  ngOnChanges(changes: SimpleChanges): void {
    this.checkLoginStatus();
    if (this.isLogin) {
      // console.log('changes:', changes['sendedSelectedMenu'].currentValue);
      if (changes['sendedSelectedMenu'].currentValue === 'All Cargos') {
        this.onLoading();
        this.getAllCargosData();
      }
      if (changes['sendedSelectedMenu'].currentValue === 'On-Going') {
        this.onLoading();
        this.getOnGoingData();
      }
      if (changes['sendedSelectedMenu'].currentValue === 'Completed') {
        this.onLoading();
        this.getCompletedData();
      }
    }
    else {
      this.isLoading = false;

    }
    // Perform any additional actions when sendedSelectedMenu changes
  }

  pagedItems: any[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  ngOnInit(): void {
    this.getAllCargosData();
    // console.log('ChildSelectedMenu:', this.sendedSelectedMenu);
  }

  isLoading = true;
  onLoading(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
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
          this.currentPage = 0;
          // console.log('item:', this.status)
          this.totalItems = this.status.length; // Use the total number of items for pagination
          this.updatePagedItems(); // Initialize first page
        }
      },
      error: (err) => { console.log(err) },
      complete: () => { }
    })
  }

  getOnGoingData() {
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
          this.currentPage = 0;
          this.status = this.status.filter((item) => {
            return this.lastStatus(item.processes) !== 'ATA';
          })
          console.log('onGoingItem:', this.status)
          this.totalItems = this.status.length; // Use the total number of items for pagination
          this.updatePagedItems(); // Initialize first page
        }
      },
      error: (err) => { console.log(err) },
      complete: () => { console.log('complete') }
    })
  }

  getCompletedData() {
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
          this.currentPage = 0;
          this.status = this.status.filter((item) => {
            return this.lastStatus(item.processes) === 'ATA';
          })
          // console.log('onGoingItem:', this.status)
          this.totalItems = this.status.length; // Use the total number of items for pagination
          this.updatePagedItems(); // Initialize first page
        }
      },
      error: (err) => { console.log(err) },
      complete: () => { console.log('complete') }
    })
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
    if (event.pageSize !== this.itemsPerPage) {
      this.currentPage = 0; // 重置到第一頁
    } else {
      this.currentPage = event.pageIndex;
    }
    this.itemsPerPage = event.pageSize;
    this.updatePagedItems();
  }

  updatePagedItems(): void {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    // console.log(`Slicing from ${start} to ${end}`); // Debug slicing indices
    this.pagedItems = this.status.slice(start, end);
  }

  // Login status : 
  isLogin: boolean = false; // is the user logged in
  username: string = 'User'; // username

  // Check login status from cookie
  checkLoginStatus(): void {
    const isLoggedIn = this.getCookie('isLoggedIn');
    const username = this.getCookie('username');

    if (isLoggedIn === 'true' && username) {
      this.isLogin = true;
      // if the user is logged in, send the login status to the popup and other components
      console.log(`username, ${username}`);
    } else {
      // this.isOpenPopup = true;
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
