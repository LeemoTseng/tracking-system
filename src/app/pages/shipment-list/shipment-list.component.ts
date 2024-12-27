import { Component, HostListener, input } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AllShipmentListComponent } from "../../components/all-shipment-list/all-shipment-list.component";
import { MatRippleModule } from '@angular/material/core';
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-shipment-list',
  standalone: true,
  imports: [HeaderComponent, MatIcon, AllShipmentListComponent, AllShipmentListComponent, MatRippleModule, MatTooltipModule, MatMenuModule, MatButtonModule, SearchBarComponent],
  templateUrl: './shipment-list.component.html',
  styles: [`
    .search input,
.search select {
  box-sizing: border-box;
}

`]
})
export class ShipmentListComponent {

  rippleColor = 'rgba(0,0,0,0.05)';
  tooltipClass = 'opacity-10';

  menuItems = ['All Cargos', 'On-Going', 'Completed'];
  selectedMenu:string = 'All Cargos';

  scrollY = 0;
  isShow = false;

  ngOnInit(): void {
    this.isShow = false;

  }


  menuSelected(menuItems: string, $index: number): void {
    this.selectedMenu = menuItems;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.scrollY = window.scrollY;
    if (this.scrollY > 300) {
      this.isShow = true;
    }
    if (this.scrollY < 300) {
      this.isShow = false;
    }

  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }


}
