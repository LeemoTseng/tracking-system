import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MainServiceService } from '../../services/main-service.service';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatRippleModule],
  templateUrl: './login-popup.component.html',
})
export class LoginPopupComponent implements OnInit {
  userData = inject(MainServiceService).getUserData();
  constructor(private router: Router, private location: Location) {}


  @Input() isPopup: boolean = false;
  @Input() isLogin: boolean = false;
  loginStatusEmit = output<boolean>();
  openPopup = output<boolean>();

  rippleColor = 'rgba(255, 255, 255, 0.1)';
  account = '';
  password = '';
  isValidate: boolean = true; // Is input valid or not
  isError: boolean = false; // If there is an error
  userList: any[] = [];

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.userData.subscribe({
      next: (res: any) => {
        if (res) {
          this.userList = res.accounts.map((user: any) => ({
            account: user.account,
            password: user.password,
          }));
          console.log('this.userList', this.userList);
        } else {
          console.error('No data found.');
        }
      },
      error: (err) => console.error('err', err),
      complete: () => { },
    });
  }

  submitLogin() {
    if (!this.account.trim() || !this.password.trim()) {
      this.isValidate = false;
      this.isError = true;
      this.isLogin = false;
      console.log('Please fill in all fields.');
      return;
    }

    // Check if the user is valid
    const validUser = this.userList.find(
      (user) => user.account === this.account && user.password === this.password
    );

    if (validUser) {
      this.isLogin = true;
      this.loginStatusEmit.emit(this.isLogin);
      console.log('Login successful!');
      // Close the popup
      // this.togglePopup();
      if (this.location.path() === '/login') {
        this.router.navigate(['/shipment-list']);
        
      } else {
        this.router.navigate(['/shipment-list']);
        window.location.reload();

      }
      // Store login state in Cookie
      document.cookie = `isLoggedIn=true; path=/; max-age=3600`; // Cookie 有效期為 1 小時
      document.cookie = `username=${this.account}; path=/; max-age=3600`;

      this.router.navigate(['/shipment-list']); // Redirect to shipment list page
    } else {
      console.log('Invalid account or password.');
      this.isError = true;
    }
  }

  isOpenPopup: boolean = true;
  togglePopup() {
    const currentRoute = this.router.url;
    if (currentRoute === '/shipment-list'){
      // 導向登入頁
      this.router.navigate(['/shipment-summary']);
    } else{
      window.location.reload();
    }

    this.isOpenPopup = !this.isOpenPopup;
    this.openPopup.emit(this.isOpenPopup);
    console.log('sendOpenPopup', this.isOpenPopup);
  }
  

}
