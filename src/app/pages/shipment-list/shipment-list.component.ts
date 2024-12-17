import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatIcon } from '@angular/material/icon';
import { AllShipmentListComponent } from "../../components/all-shipment-list/all-shipment-list.component";

@Component({
  selector: 'app-shipment-list',
  standalone: true,
  imports: [HeaderComponent, MatIcon, AllShipmentListComponent,AllShipmentListComponent],
  templateUrl: './shipment-list.component.html',
  styles: [`
    .search input,
.search select {
  box-sizing: border-box;
}`]
})
export class ShipmentListComponent {

  menu = ['All Cargos', 'On-Going', 'Completed'];
  selectedMenu = 'All Cargos';
  isFocused = false;


  menuSelected(menu: string, $index: number): void {
    this.selectedMenu = menu;
    // console.log(this.selectedMenu);
    if (this.selectedMenu === 'Milestones') {
    } else if (this.selectedMenu === 'Files') {
    } else {
    }
  }
  focusSearch():void{
    this.isFocused = true;
    console.log(this.isFocused);
  }

  // if clicked outside the search box
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.searchContent')) {
      this.isFocused = false;
      console.log(this.isFocused);
    }
  }

}
