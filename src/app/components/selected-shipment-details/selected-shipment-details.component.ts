import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../footer/footer.component';
import { TrackingDetailsComponent } from '../tracking-details/tracking-details.component';
import { OtherDetailsComponent } from '../other-details/other-details.component';

@Component({
  selector: 'app-selected-shipment-details',
  standalone: true,
  imports: [HeaderComponent, MatIconModule,FooterComponent,
    TrackingDetailsComponent,OtherDetailsComponent,RouterLink
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
  searchResult:any = [];


  ngOnInit(): void {
    this.isShow = false;
    this.checkLoginStatus();
    this.onLoading();
  }

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

  onLoading(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }


}
