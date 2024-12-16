import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardService } from '../../services/clipboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-copied',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './copied.component.html',
})
export class CopiedComponent {
  isCopied = false;

  constructor(private clipboardService: ClipboardService) {}

  copyText(value: string) {
    this.clipboardService.copyText(value, () => {
      this.isCopied = true;
    });
    setTimeout(() => {
      this.isCopied = false;
    }, 600);
  }
}
