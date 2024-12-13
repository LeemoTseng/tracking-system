import { Component, inject } from '@angular/core';
import { MainInterfaceService } from '../../interfaces/main-interface.service';
import { MainServiceService } from '../../services/main-service.service';
import { milestonesInterface } from '../../all-interface';
import { TableTemplateComponent } from '../table-template/table-template.component';

@Component({
  selector: 'app-milestones',
  standalone: true,
  imports: [TableTemplateComponent,],
  templateUrl: './milestones.component.html',
  styleUrl: './milestones.component.scss'
})
export class MilestonesComponent {

  menu = ['Shipment Details', 'Milestones', 'Files']
  selectedMenu = 'Shipment Details';

  mainService = inject(MainServiceService);
  processItems = inject(MainInterfaceService);
  milestones: milestonesInterface[] = [];
  flights: any[] = [];

  milestonesColumns: any[] = [];
  flightsColumns: any[] = [];

  columns: any[] = [];
  fileDataSource: any[] = [];
  ImgDataSource:any[] = [];


  menuSelected(menu: string, $index: number): void {
    this.selectedMenu = menu;
    // console.log(this.selectedMenu);
    if (this.selectedMenu === 'Milestones') {
      this.clearData();
      this.getMilestoneData();
      this.getFlightsData();
    } else if (this.selectedMenu === 'Files') {
      this.clearData();
      this.getFilesData();

    } else {
      this.clearData();
    }
  }

  ngOnInit(): void {
    console.log(this.selectedMenu);
  }

  getFlightsData(): void {
    const column = ['Order', 'Flight No.', 'From', 'To', 'ETD', 'ATD', 'ETA', 'ATA']
    this.flightsColumns = column;
    this.mainService.getFlightsData().subscribe({
      next: (res) => { this.flights = res.flights },
      error: (err) => { console.log(err) },
      complete: () => { }
    })
  }
  getMilestoneData(): void {
    const column = ['Order', 'Milestone', 'Date and Time', 'Files']
    this.milestonesColumns = column;
    this.mainService.getMilestoneData().subscribe({
      next: (res) => {
        this.milestones = res.milestones;
        // console.log(this.milestones);
      },
      error: (err) => { console.log(err) },
      complete: () => { }
    })
  }
  getFilesData(): void {
    const column = ['Id', 'Type', 'Name', 'Download']
    this.columns = column;
    this.mainService.getFilesData().subscribe({
      next: (res) => {
        // console.log(res.Documents);
        this.fileDataSource = res.Documents;
        this.ImgDataSource = res.Images;
      },
      error: (err) => { console.log(err) },
      complete: () => { }

    })
  }
  clearData(): void {
    this.milestones = [];
    this.flights = [];
    this.milestonesColumns = [];
    this.flightsColumns = [];
  }
}
