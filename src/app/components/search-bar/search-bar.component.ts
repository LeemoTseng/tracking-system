import { Component, HostListener, ViewChild } from '@angular/core';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatIconModule, MatRippleModule, MatMenuModule, MatDatepickerModule,
    MatFormFieldModule, MatNativeDateModule, FormsModule, MatButtonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  rippleColor = 'rgba(0,0,0,0.05)';

  value = 'Clear me';

  onFocus(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.showPicker?.(); 
    inputElement.focus(); 
  }
  
  startDate = '';
  endDate = '';

  // if clicked outside the search box, unfocus
  isFocused = false;

  focusSearch(): void {
    this.isFocused = true;
    console.log(this.isFocused);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isFocused) {
      return; // Skip if not focused
    }
    const target = event.target as HTMLElement;
    if (!target.closest('.searchContent')) {
      this.isFocused = false;
      console.log(this.isFocused);
    }
  }



}
