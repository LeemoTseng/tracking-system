import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table-template',
  standalone: true,
  imports: [CommonModule, MatRippleModule, MatTableModule],
  templateUrl: './table-template.component.html',
  styles: [`
    .table-overrides{
      tr{
        font-size: 16px;
      }
      &.mat-mdc-table {
      background-color: white;
      .mat-mdc-header-cell{
        border-bottom-color:#e0e0e0;
        background-color: #f5f5f5;

      }
      .mat-mdc-cell{
        border-bottom-color:#e0e0e0;
      }
    }
    }`]
})
export class TableTemplateComponent {
    @Input() dataSource:any = [];
    @Input() displayedColumns:any = [];
}
