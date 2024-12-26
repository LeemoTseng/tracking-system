import { Component, HostListener } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatIconModule, MatRippleModule, MatMenuModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  rippleColor = 'rgba(0,0,0,0.05)';

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
