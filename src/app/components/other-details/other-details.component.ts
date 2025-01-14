import { Component, inject, Input, output } from '@angular/core';
import { milestonesInterface } from '../../all-interface';
import { TableTemplateComponent } from '../table-template/table-template.component';
import { ShipmentDetailComponent } from '../shipment-detail/shipment-detail.component';

@Component({
  selector: 'app-other-details',
  standalone: true,
  imports: [TableTemplateComponent,ShipmentDetailComponent],
  templateUrl: './other-details.component.html',
})
export class OtherDetailsComponent {

  menu = ['Shipment Details', 'Milestones', 'Files']
  selectedMenu = 'Shipment Details';
  sendSelectedMenu = output<string>();

  @Input() milestones: milestonesInterface[] = [];
  @Input() milestonesColumns: any[] = [];
  @Input() flights: any[] = [];
  @Input() flightsColumns: any[] = [];
  @Input() fileDataSource: any[] = [];

  @Input() ImgDataSource: any[] = [];
  @Input() columns: any[] = [];

  // shipment-details
  @Input() General_Info: any[] = [];
  @Input() Package_Info?: any[] = [];
  @Input() Route_Info: any[] = [];
  @Input() Shipper_Info?: any[] = [];
  @Input() Consignee_Info?: any[] = [];

  menuSelected(menu: string, $index: number): void {
    this.selectedMenu = menu;
    // console.log(this.selectedMenu);
    if (this.selectedMenu === 'Milestones') {
      this.sendData();
      console.log('this.milestones',this.milestones)
    } else if (this.selectedMenu === 'Files') {
      this.sendData();
    }
  }

  sendData(): void {
    this.sendSelectedMenu.emit(this.selectedMenu);
  }

  ngOnInit(): void {
    // console.log(this.selectedMenu);
  }


}
