import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './header.component.html',

})
export class HeaderComponent implements OnInit {

  // Router
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.findUrl(this.router.url);
    // console.log('this.router.url', this.router.url);
      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.findUrl(event.urlAfterRedirects);
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

  findUrl(currentUrl:string){
    const matchedMenu = this.menuList.find(menu => menu.routerLink === currentUrl);
    console.log('matchedMenu', matchedMenu);
    this.selectedMenu = matchedMenu ? matchedMenu.name : '';
  }

}
