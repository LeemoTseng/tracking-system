import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
selector: 'app-login-popup',
  standalone: true,
  imports: [MatIconModule, MatRippleModule, RouterLink],
  templateUrl: './login-popup.component.html',
})
export class LoginPopupComponent {

  rippleColor= 'rgba(255, 255, 255, 0.1)';
  isPopupOpen = false;

  // Header -> loginPopup
  @Input() isLogin: boolean = false;
  
  // loginPopup -> Header
  @Output() loginChangedFromPop = new EventEmitter<boolean>();
  
  loginToggle(){
    this.isLogin = !this.isLogin;
    this.loginChangedFromPop.emit(this.isLogin)
    console.log('loginChangedFromPop', this.isLogin);
  }

}
