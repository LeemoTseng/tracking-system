import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { OtherDetailsComponent } from '../../components/other-details/other-details.component';
import { TrackingDetailsComponent } from '../../components/tracking-details/tracking-details.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoadingComponent } from '../../components/loading/loading.component';
import { SearchTrackingNumComponent } from '../../components/search-tracking-num/search-tracking-num.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shipment-summary',
  standalone: true,
  imports: [HeaderComponent, MatIconModule, CommonModule,
    MatRippleModule, MatTableModule, OtherDetailsComponent,
    TrackingDetailsComponent, FormsModule, CommonModule,
    SearchTrackingNumComponent, FooterComponent, FooterComponent, RouterOutlet],
  templateUrl: './shipment-summary.component.html',
  animations:[]
})
export class ShipmentSummaryComponent  {

  trackingNumber:string = '';

  rippleColor = 'rgba(0,0,0,0.05)';
  isValidTrackingNumber:boolean = false;
  isLoading = true;
  searchResult:any = [];
  alertMessage:string = '';
  // loading
  onLoading(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  ngOnInit():void{
     this.onLoading();
     this.getTrackingNumberFromSession();
  }

  // Header -> this component
  isLogin: boolean = false;
  loginSituation(isLogin: boolean) {
    this.isLogin = isLogin;
    // console.log('Summary isLogin:', this.isLogin);
  }
  username: string = '';
  // Check login status from cookie
  checkLoginStatus(): void {
    const isLoggedIn = this.getCookie('isLoggedIn');
    const username = this.getCookie('username');
    if (isLoggedIn === 'true' && username) {
      this.isLogin = true;
      this.username = username;
    } else {
      // this.isLogin = false;
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

  getIsValidTrackingNumberOutput(v:boolean){
    this.isValidTrackingNumber = v;
    // console.log('isValidTrackingNumber:', this.isValidTrackingNumber);
  }


  getAlertMessageOutput(v: string) {
    this.alertMessage = v;
    // console.log('alertMessage received in parent:', this.alertMessage);
  }

  getTrackingNumberFromSession(): void {
    const storedTrackingNumber = sessionStorage.getItem('trackingNumber');
    if (storedTrackingNumber) {
      this.trackingNumber = storedTrackingNumber; // 從 Session Storage 中讀取
      console.log('trackingNumber:', this.trackingNumber);
    }
  }

}
