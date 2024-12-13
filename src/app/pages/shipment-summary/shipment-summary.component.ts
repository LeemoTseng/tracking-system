import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { processItems } from '../../interfaces/main-interface.service';
import { OtherDetailsComponent } from '../../components/other-details/other-details.component';

@Component({
  selector: 'app-shipment-summary',
  standalone: true,
  imports: [HeaderComponent, MatIconModule, CommonModule, MatRippleModule, MatTableModule, OtherDetailsComponent],
  templateUrl: './shipment-summary.component.html',

})
export class ShipmentSummaryComponent  {

  rippleColor = 'rgba(0,0,0,0.05)';
  processList: processItems[] = [
    {
      name: 'Booking Creation',
      icon: 'inventory',
      time: '2021-07-01 12:00',

    },
    {
      name: 'ETD',
      icon: 'package_2',
      flight: [{
        flight: 'BRO650',
        origin: 'TPE',
        destination: 'IAH'
      }],
      time: '2021-07-01 12:00',
      image: false,
      imgUrlList: [{
        imgUrl: 'https://www.airport-technology.com/wp-content/uploads/sites/3/2020/07/airport-technology-1.jpg',
        imgAlt: 'airport'
      }
      ],
    },
    {
      name: 'ATD',
      time: '2021-07-01 12:00',
      icon: 'box',
      image: true,

    },
    {
      name: 'ETA',
      icon: 'flight_land',
      flight: [{
        flight: 'BRO650',
        origin: 'TPE',
        destination: 'IAH'
      }],
      time: '2021-07-01 12:00',
      image: false,
      imgUrlList: [{
        imgUrl: 'https://www.airport-technology.com/wp-content/uploads/sites/3/2020/07/airport-technology-1.jpg',
        imgAlt: 'airport'
      }
      ],
    },
    {
      name: 'ATA',
      time: '2021-07-01 12:00',
      icon: 'event_available',
      image: true,

    },
  ]
  bgColor = 'rgba(0,0,0,0.05)';


}
