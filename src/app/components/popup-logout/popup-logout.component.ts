import { Component, EventEmitter, inject, Input, output, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-logout',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './popup-logout.component.html',
})
export class PopupLogoutComponent {

  router = inject(Router);

  @Input() isLogOutPopupShow: boolean = false;
  @Input() isLogin: boolean = true;
  // isLogOutPopupShowSent = output<boolean>();
  @Output() isLogOutPopupShowSent = new EventEmitter<boolean>();

  closePopup(){
    this.isLogOutPopupShow = false;
    this.isLogOutPopupShowSent.emit(this.isLogOutPopupShow);
  }

  logOut(){
      this.isLogin = false;
      // 清除所有相關 Cookie，確保包括不同的 Path
      document.cookie = "isLoggedIn=; path=/; max-age=0";
      document.cookie = "isLoggedIn=; path=/shipment-list; max-age=0";
        document.cookie = "username=; path=/; max-age=0";
        document.cookie = "username=; path=/shipment-list; max-age=0";
        document.cookie = "trackingNumber=; path=/; max-age=0";
        // alert('Logout successful!');
        this.router.navigate(['/login']);
        // window.location.reload();
  }





}
