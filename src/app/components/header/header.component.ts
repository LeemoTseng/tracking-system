import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './header.component.html',

})
export class HeaderComponent implements OnInit {

  // router = Router
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.detectUrl(this.router.url);
    this.router.events.subscribe(() => {
      this.detectUrl(this.router.url); 
    });
  }

  menuList: any[] = [
    {
      name: 'Shipment Summary',
      routerLink: '/shipment-summary'
    }, {
      name: 'Shipment List',
      routerLink: '/shipment-list'
    },
  ]

  selectedMenu: string = ""
  selectMenu(item: string) {
    this.selectedMenu = item
  }

  detectUrl(currentUrl:string){
    const matchedMenu = this.menuList.find(menu => menu.routerLink === currentUrl);
    this.selectedMenu = matchedMenu ? matchedMenu.name : '';
  }

}
