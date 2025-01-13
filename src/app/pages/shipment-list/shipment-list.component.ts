import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AllShipmentListComponent } from "../../components/all-shipment-list/all-shipment-list.component";
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { SelectedShipmentDetailsComponent } from '../../components/selected-shipment-details/selected-shipment-details.component';

@Component({
  selector: 'app-shipment-list',
  standalone: true,
  imports: [
    HeaderComponent, 
    MatIcon, 
    AllShipmentListComponent, 
    MatRippleModule, 
    MatTooltipModule, 
    MatMenuModule, 
    MatButtonModule, 
    CommonModule,
  RouterOutlet,  ],
  templateUrl: './shipment-list.component.html',
  styles: [`
    .search input,
    .search select {
      box-sizing: border-box;
    }
  `]
})
export class ShipmentListComponent {
  router = inject(Router);

  rippleColor = 'rgba(0,0,0,0.05)';
  tooltipClass = 'opacity-10';

  scrollY = 0;
  isShow = false;
  isLoading = true;

  isLogin: boolean = false;
  username: string = '';

  ngOnInit(): void {
    this.checkLoginStatus();
    this.isShow = false;
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

  // Get login status from header
  getIsLoginFromHeader(isLogin: boolean) {
    this.isLogin = isLogin;
  }



  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.scrollY = window.scrollY;
    if (this.scrollY > 300) {
      this.isShow = true;
    }
    if (this.scrollY < 300) {
      this.isShow = false;
    }
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  
}
