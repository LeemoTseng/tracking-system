import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { LoginPopupComponent } from '../../components/login-popup/login-popup.component';






@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatIconModule,MatRippleModule,FooterComponent, RouterLink, LoginPopupComponent],
  templateUrl: './login.component.html',

})

export class LoginComponent {
rippleColor = 'rgba(225,225,225,0.2)';
isPopupOpen:boolean = false;

}
