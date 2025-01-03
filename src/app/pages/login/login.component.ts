import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { LoginPopupComponent } from '../../components/login-popup/login-popup.component';
import { FormsModule } from '@angular/forms';
import { SearchTrackingNumComponent } from '../../components/search-tracking-num/search-tracking-num.component';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule,
    MatIconModule, MatRippleModule,
    FooterComponent, RouterLink,
    LoginPopupComponent, FormsModule,],
  templateUrl: './login.component.html',

})

export class LoginComponent {
  rippleColor = 'rgba(225,225,225,0.2)';
  isPopup: boolean = false;
  trackingNumber: string = '';
  router = inject(Router)
  isValid: boolean = true;
  alertMessage: string = '';

  ngOnInit() {
    this.checkLoginStatus();
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

  // Route to shipment summary page
  routeToSummary() {
    if (this.isValid) {
      document.cookie = `trackingNumber=${this.trackingNumber}`;
      this.router.navigate(['/shipment-summary']);
      // window.location.reload();
    } else {
      this.isValid = false;
      this.alertMessage = 'Tracking number must be a number';
    }


  }
  checkValid(e: any) {
    if (e.target.value === '') {
      this.isValid = false;
      this.alertMessage = 'the tracking number cannot be empty';
    } else if (this.trackingNumber !== Number(this.trackingNumber).toString()) {
      this.isValid = false;
      this.alertMessage = 'Tracking number must be a number';
    } else {
      this.isValid = true;
      this.alertMessage = '';
    }
  }


}
