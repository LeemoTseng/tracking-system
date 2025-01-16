import { Component, inject, Inject, Input, input, OnInit, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MainServiceService } from '../../services/main-service.service';
import { MainInterfaceService } from '../../interfaces/main-interface.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { MatRippleModule } from '@angular/material/core';
import { LoadingComponent } from '../loading/loading.component';
import { Router, RouterLink } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SelectedShipmentDetailsComponent } from '../selected-shipment-details/selected-shipment-details.component';
// import { PageEvent } from '@angular/material/paginator';
// import { last } from 'rxjs';


@Component({
  selector: 'app-all-shipment-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatRippleModule,
    PaginationComponent, SearchBarComponent, LoadingComponent,
    RouterLink, SelectedShipmentDetailsComponent,
    LoadingComponent, LoadingComponent, RouterLink],
  templateUrl: './all-shipment-list.component.html',
  styles: [`
    .search input,
    .search select {
      box-sizing: border-box;
    }
  `]

})
export class AllShipmentListComponent implements OnInit {
  constructor() { }
  router = inject(Router);

  statusService = inject(MainServiceService);
  statusInterface = inject(MainInterfaceService);

  status: any[] = [];
  // statusProcesses: statusInterface[] = [];

  menuItems = ['All Cargos', 'On-Going', 'Completed'];
  private _selectedMenu: string = 'All Cargos';
  // selectedMenu: string = 'All Cargos';
  // @Input() sendedSelectedMenu: string = '';

  get selectedMenu(): string {
    return this._selectedMenu;
  }

  set selectedMenu(value: string) {
    this._selectedMenu = value;
    this.handleMenuChange(value);
  }



  // Perform any additional actions when sendedSelectedMenu changes

  pagedItems: any[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  isLoading = false;

  // Login status : 
  isLogin: boolean = false; // is the user logged in
  username: string = ''; // username

  ngOnInit(): void {
    this.checkLoginStatus();
    // console.log('this.isLogin',this.isLogin)
    if (this.isLogin) {
      this.getAllCargosData();
      this.onLoading();
    }
  }

  onLoading(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  // get login status from cookie
  checkLoginStatus(): void {
    const isLoggedIn = this.getCookie('isLoggedIn');
    const username = this.getCookie('username');
    if (isLoggedIn === 'true' && username) {
      this.isLogin = true;
      this.username = username;
    } else {
      this.isLogin = false;
    }
  }

  // Get Cookie
  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      console.log('parts:', parts)
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }



  // get data
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
          // console.log('onGoingItem:', this.status)
          this.totalItems = this.status.length; // Use the total number of items for pagination
          this.updatePagedItems(); // Initialize first page
        }
      },
      error: (err) => { console.log(err) },
      complete: () => { }
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
      complete: () => { }
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

  // Pagination

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


  // Menu  Selected
  menuSelected(menuItems: string, $index: number): void {
    this.selectedMenu = menuItems;
  }

  handleMenuChange(value: string): void {
    if (this.isLogin) {
      // console.log('User is logged in');
      if (value === 'All Cargos') {
        this.onLoading();
        this.getAllCargosData();
      }
      if (value === 'On-Going') {
        this.onLoading();
        this.getOnGoingData();
      }
      if (value === 'Completed') {
        this.onLoading();
        this.getCompletedData();
      }
    } else {
      this.isLoading = false;
      // console.log('User is not logged in');
    }
  }



}