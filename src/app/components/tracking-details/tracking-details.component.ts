import { Component, inject, Input, input, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { processItems } from '../../interfaces/main-interface.service';
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

  // processes contents

  @Input() isCompleted!: boolean;
  @Input() processList: processItems[] = [];
  @Input() nowStatus: string = '';
  @Input() milestones: any[] = [];
  @Input() General_Info: any[] = [];
  @Input() Route_Info: any[] = [];

  ngOnInit(): void {
    this.onLoading();
    console.log(this.milestones)
  }

  test() {
    // console.log('isCompleted', this.isCompleted);
    // console.log('processList', this.processList);
    // console.log('nowStatus', this.nowStatus);
  }

  // loading
  onLoading(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }

}
