import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MainServiceService } from '../../services/main-service.service';
import { CopiedComponent } from "../copied/copied.component";

@Component({
  selector: 'app-shipment-detail',
  standalone: true,
  imports: [MatIconModule, CommonModule, CopiedComponent],
  templateUrl: './shipment-detail.component.html',

})
export class ShipmentDetailComponent {

  isCopied = false;
  mainService = inject(MainServiceService)


  ngOnInit(): void {
    this.getShipmentDetailsData();
  }

  shipmentDetails: any[] = [];

  getShipmentDetailsData() {
    this.mainService.getShipmentDetailsData().subscribe({
      next: (res) => {
        this.shipmentDetails = [res]; // as array
        console.log(this.shipmentDetails)
      },
      error: (err) => { console.log(err) },
      complete: () => { }
    })
  }


  copyText(value: string) {
    navigator.clipboard.writeText(value).then(() => {
      console.log(value);
    });
    this.isCopied = true;
    setTimeout(() => {
      this.isCopied = false;
    }, 600);
  }

}
