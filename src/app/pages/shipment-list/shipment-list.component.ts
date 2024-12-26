import { Component, HostListener, input } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatIcon } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { AllShipmentListComponent } from "../../components/all-shipment-list/all-shipment-list.component";
import { MatRippleModule } from '@angular/material/core';
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shipment-list',
  standalone: true,
  imports: [HeaderComponent, MatIcon, AllShipmentListComponent, AllShipmentListComponent, MatRippleModule, MatTooltipModule, MatMenuModule, MatButtonModule],
  templateUrl: './shipment-list.component.html',
  styles: [`
    .search input,
.search select {
  box-sizing: border-box;
}
#cdk-overlay-0{
  background-color: #ffffff;
 
}
#mat-menu-panel-0{
  background-color: #ffffff;
}




`]
})
export class ShipmentListComponent {

  rippleColor = 'rgba(0,0,0,0.05)';
  tooltipClass='opacity-10';

  menuItems = ['All Cargos', 'On-Going', 'Completed'];
 selectedMenu = 'All Cargos';
  isFocused = false;

  scrollY = 0;
  isShow = false;

  menuSelected(menuItems: string, $index: number): void {
    this.selectedMenu = menuItems;
    // console.log(this.selectedMenu);
    if (this.selectedMenu === 'Milestones') {
    } else if (this.selectedMenu === 'Files') {
    } else {
    }
  }
  focusSearch(): void {
    this.isFocused = true;
    console.log(this.isFocused);
  }

  // if clicked outside the search box, unfocus

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isFocused) {
      return; // Skip if not focused
    }
    const target = event.target as HTMLElement;
    if (!target.closest('.searchContent')) {
      this.isFocused = false;
      console.log(this.isFocused);
    }
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

  scrollToTop(){
    window.scrollTo(0, 0);
  }


}
