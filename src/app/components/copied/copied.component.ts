import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-copied',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <mat-icon>
    (click)="copyText(item.MAWB_No)"
    style="width: 24px; height: 24px"
    class="text-[18px] p-1 pt-[5pt] text-blackColor/60 hover:text-blackColor/90 cursor-pointer"
    >content_copy</mat-icon>
    @if (isCopied) {
    <p
      class="absolute -top-1/2 -right-16 bg-blackColor/30 text-sm text-white px-2 py-1 w-fit rounded-md"
    >
      Copied!
    </p>
    }`,
})
export class CopiedComponent {

  copyText(value: string) {
    navigator.clipboard.writeText(value).then(() => {
      console.log(value);
    });
    this.isCopied = true;
    setTimeout(() => {
      this.isCopied = false;
    }, 600);
  }

  isCopied = false;
}

