import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { LoginPopupComponent } from '../../components/login-popup/login-popup.component';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatIconModule,MatRippleModule,FooterComponent, RouterLink, LoginPopupComponent],
  templateUrl: './login.component.html',

})

export class LoginComponent {
rippleColor = 'rgba(225,225,225,0.2)';
isPopup:boolean = false;

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



}
