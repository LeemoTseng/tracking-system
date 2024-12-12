import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { TableTemplateComponent } from '../../components/table-template/table-template.component';
import { milestonesInterface } from '../../all-interface';
import { MainServiceService } from '../../services/main-service.service';
import { MainInterfaceService } from '../../interfaces/main-interface.service';
import { processItems } from '../../interfaces/main-interface.service';





@Component({
  selector: 'app-shipment-summary',
  standalone: true,
  imports: [HeaderComponent, MatIconModule, CommonModule, MatRippleModule, MatTableModule, TableTemplateComponent],
  templateUrl: './shipment-summary.component.html',

})
export class ShipmentSummaryComponent implements OnInit {

  mainService = inject(MainServiceService);
  processItems = inject(MainInterfaceService);

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

  milestonesColumns = ['Order', 'Milestone', 'Date and Time', 'Files'];
  flightsColumns = ['Order','Flight No.', 'From', 'To', 'ETD','ATD','ETA','ATA'];
  bgColor = 'rgba(0,0,0,0.05)';


  milestones: milestonesInterface[] = [];
  flights: any[] = [];

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.mainService.getFlightsData().subscribe({
      next: (res) => { this.flights = res.flights;console.log(this.flights)},
      error: (err) => { console.log(err) },
      complete: () => { console.log('complete') }
    })
    this.mainService.getMilestoneData().subscribe({
      next: (res) => {
        this.milestones = res.milestones;
        console.log(this.milestones);
      },
      error: (err) => { console.log(err) },
      complete: () => { console.log('complete') }
    })
  }

  test() {
    console.log(this.milestones);
  }


}
