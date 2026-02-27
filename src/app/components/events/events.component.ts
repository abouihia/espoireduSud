import { Component } from '@angular/core';
import { CountDownComponent } from '../count-down/count-down.component';

import { AuthService } from '../../services/auth.service';
import { RouterModule} from '@angular/router';
@Component({
    selector: 'app-events',
    imports: [CountDownComponent, RouterModule],
    templateUrl: './events.component.html',
    styleUrl: '../../../assets/css/style.css'
})
export class EventsComponent {

    message = '';
     imageUrl = 'assets/img/blog/Waada.jpg';
     imageUrl1= 'assets/img/blog/bg_1.jpg';
     imageUrl2= 'assets/img/mre/Journee_MRE1.jpg';
     imageUrl3= 'assets/img/mre/Journee_MRE4.jpg'

     dateWadaa = new Date().getUTCFullYear();



  constructor(public authService: AuthService) { }

}
