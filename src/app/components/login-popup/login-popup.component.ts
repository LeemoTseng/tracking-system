import { Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [MatIconModule, MatRippleModule],
  templateUrl: './login-popup.component.html',
})
export class LoginPopupComponent {

  rippleColor= 'rgba(255, 255, 255, 0.1)';

  closePopup(){
    console.log('Closing popup');
    
  }


}
