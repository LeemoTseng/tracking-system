import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainServiceService } from '../../services/main-service.service';



@Component({
  selector: 'app-shipment-detail',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatListModule],
  templateUrl: './shipment-detail.component.html',
  styles: [`
    mat-list mat-list-item{
      padding: 0;
      padding-top: 5px;
      margin: 0;
      height:fit-content;
    }
    p{
      margin: 0;
    }
    `]

})
export class ShipmentDetailComponent {
  [key: string]: any;
  // mainService = inject(MainServiceService)
  ngOnInit(): void {
    // this.getShipmentDetailsData();
  }

  @Input() General_Info: any[] = [];
  @Input() Package_Info?: any[] = [];
  @Input() Route_Info: any[] = [];
  @Input() Shipper_Info?: any[] = [];
  @Input() Consignee_Info?: any[] = [];

  // getShipmentDetailsData() {
  //   this.mainService.getShipmentDetailsData().subscribe({
  //     next: (res) => {
  //       this.General_Info = res.General_Info.map((item: any) => ({ ...item, isCopied: false }));
  //       this.Package_Info = res.Package_Info.map((item: any) => ({ ...item, isCopied: false }));
  //       this.Route_Info = res.Route_Info.map((item: any) => ({ ...item, isCopied: false }));
  //       this.Shipper_Info = res.Shipper_Info.map((item: any) => ({ ...item, isCopied: false }));
  //       this.Consignee_Info = res.Consignee_Info.map((item: any) => ({ ...item, isCopied: false }));

  //     },
  //     error: (err) => { console.log(err) },
  //     complete: () => { }
  //   })
  // }

  copyText(section: string, index: number) {
    const sectionData = this[section];
    const item = sectionData[index];

    // 複製到剪貼簿
    navigator.clipboard.writeText(item.value).then(() => {
      console.log(item.value);

      // 更新當前項目的 isCopied 為 true
      this[section] = sectionData.map((entry: any, i: number) => ({
        ...entry,
        isCopied: i === index,
      }));
        console.log('isCopied', this[section][index].isCopied)


      // 2 秒後重置 isCopied 為 false
      setTimeout(() => {
        this[section][index].isCopied = false;
      }, 600);
    });
  }




}
