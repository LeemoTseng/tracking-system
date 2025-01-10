import { Component, EventEmitter, HostListener, inject, Input, OnInit, output, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { LoginPopupComponent } from '../login-popup/login-popup.component';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, RouterLink, LoginPopupComponent, MatIconModule],
  templateUrl: './header.component.html',

})
export class HeaderComponent implements OnInit {

  // constructor
  constructor(private router: Router) { }

  // menu list
  menuList: any[] = [
    { name: 'Shipment Summary', routerLink: '/shipment-summary' },
    { name: 'Shipment List', routerLink: '/shipment-list/all-shipment' },
  ];
  selectedMenu: string = "";

  // initialization
  ngOnInit(): void {
    this.checkLoginStatus();
    //  Find the URL of the current page
    this.findUrl(this.router.url);
    // console.log('this.router.url',this.router.url);

    // Listen to the URL change event
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe((event: NavigationEnd) => {
    //     this.findUrl(event.urlAfterRedirects);
    //   });
  }


  // Login status from popup -> Header
  // Login status from Header -> Other Components
  loginStatus = output<boolean>();

  sendLoginStatus(isLogin: boolean) {
    this.loginStatus.emit(isLogin);
    // console.log('sendLoginStatus', isLogin);
  }

  // Login status : 
  isLogin: boolean = false; // is the user logged in
  username: string = ''; // username

  // Get login status from popup
  getIsLoginFromPopup(isLogin: boolean) {
    this.isLogin = isLogin;
    this.sendLoginStatus(isLogin);
    // console.log('getIsLoginFromPopup', isLogin);
  }

  // Check login status from cookie
  checkLoginStatus(): void {
    const isLoggedIn = this.getCookie('isLoggedIn');
    const username = this.getCookie('username');

    if (isLoggedIn === 'true' && username) {
      this.isLogin = true;
      this.username = username;
      // if the user is logged in, send the login status to the popup and other components
    } else {
      this.isOpenPopup = true;
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

  // selected item
  selectMenu(item: string) {
    this.selectedMenu = item;
  }

  // Find the URL of the current page
  findUrl(currentUrl: string) {
    const matchedMenu = this.menuList.find
      (menu => menu.routerLink === currentUrl
        || menu.routerLink === currentUrl.includes(menu.routerLink));
    this.selectedMenu = matchedMenu ? matchedMenu.name : '';
  }

  // get close the popup
  isOpenPopup: boolean = false;
  getOpenPopup(v: boolean) {
    this.isOpenPopup = v;
    console.log('getOpenPopup', v);
  }

  // open the popup
  openPopup() {
    this.selectedMenu = 'Shipment List'
    this.isLogin = false;
  }


  // logout function
  logout() {
    this.isLogin = false;
  // 清除所有相關 Cookie，確保包括不同的 Path
  document.cookie = "isLoggedIn=; path=/; max-age=0";
  document.cookie = "isLoggedIn=; path=/shipment-list; max-age=0";
  document.cookie = "username=; path=/; max-age=0";
  document.cookie = "username=; path=/shipment-list; max-age=0";
  document.cookie = "trackingNumber=; path=/; max-age=0";
    alert('Logout successful!');
    this.router.navigate(['/login']);
    // window.location.reload();
  }
  toggleLogout: boolean = false;
  showLogout() {
    this.toggleLogout = !this.toggleLogout;
    console.log(this.toggleLogout);
  }
  // Click outside the logout menu to close it
  @HostListener('document:click', ['$event'])
  closeLogoutMenu(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.login')) {
      this.toggleLogout = false;
    }
  }


}
