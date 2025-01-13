import { Component, inject, Input, input, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MainInterfaceService, processItems } from '../../interfaces/main-interface.service';
import { MainServiceService } from '../../services/main-service.service';
import { MatRippleModule } from '@angular/material/core';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-tracking-details',
  standalone: true,
  imports: [MatIconModule, MatRippleModule, LoadingComponent],
  templateUrl: './tracking-details.component.html',
  styleUrl: './tracking-details.component.scss'
})
export class TrackingDetailsComponent {

  rippleColor = 'rgba(0,0,0,0.05)';
  isLoading = false;
  // sendDetails:processItems[] =[]

  // get data from shipment-summary
  // isCompleted = input<boolean>();
  // processList = input<processItems[]>();

  @Input() isCompleted!: boolean;
  @Input() processList: processItems[] = [];

  // details = input({ generalInfo: {}, packageInfo: {}, routeInfo: {}, shipperInfo: {}, status: [], consigneeInfo: {} });
  // @Input() details: { generalInfo?: any, packageInfo?: any, routeInfo?: any, shipperInfo?: any, status?: any[], consigneeInfo?: any } = {};


  ngOnInit(): void {
    this.onLoading();
    // this.getProcessData();
    // console.log('isCompleted', this.isCompleted);

  }

  test() {
    console.log('isCompleted', this.isCompleted);
    console.log('processList', this.processList);
    // console.log('res', this.sendDetails);
  }

  // loading
  onLoading(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }

}
