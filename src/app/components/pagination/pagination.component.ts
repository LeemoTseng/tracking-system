import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './pagination.component.html',
  styles: [`

 .mat-mdc-paginator{
      background-color: white;
    }
.mat-mdc-paginator-touch-target{
      background-color: white;
    
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
padding-top: 0px;
padding-bottom: 0px;
}

  `]
})
export class PaginationComponent {
  @Input() length!: number;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50];
  @Output() page = new EventEmitter<PageEvent>();

  onPageChange(event: PageEvent): void {
    this.page.emit(event);
  }

}
