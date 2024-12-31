import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [MatIconModule, MatRippleModule, FormsModule],
  templateUrl: './login-popup.component.html',
})
export class LoginPopupComponent {

  rippleColor = 'rgba(255, 255, 255, 0.1)';
  @Input() isPopupOpen: boolean = false;

  // Header -> loginPopup
  @Input() isLogin: boolean = false;

  // loginPopup -> Header
  @Output() loginChangedFromPop = new EventEmitter<boolean>();

  loginToggle() {
    this.isLogin = !this.isLogin;
    this.loginChangedFromPop.emit(this.isLogin)
    console.log('loginChangedFromPop', this.isLogin);
  }

  // Login Validation

  account = '';
  password = '';

  isValidate:boolean = false;
  errorStyle:string = '';

  onValidateAccount(account:string) {
    if (account === '') {
      console.log('email is empty');
      this.errorStyle = 'border: 1px solid red'
      console.log(this.isValidate);
      console.log(this.errorStyle);
    } else {
      this.isValidate = true;
      this.errorStyle = ''
      console.log('email is valid');
      console.log(this.isValidate);
    }
  }
  onValidatePassword(password:string) {
    if (password === '') {
      console.log('email is empty');
      this.errorStyle = 'border: 1px solid red'
      console.log(this.isValidate);
      console.log(this.errorStyle);
    } else {
      this.isValidate = true;
      this.errorStyle = ''
      console.log('email is valid');
      console.log(this.isValidate);
    }
  }

  



}
