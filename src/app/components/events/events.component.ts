import { Component } from '@angular/core';
import { CountDownComponent } from '../count-down/count-down.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule} from '@angular/router';
@Component({
    selector: 'app-events',
    imports: [CountDownComponent, RouterModule,CommonModule],
    templateUrl: './events.component.html',
    styleUrl: '../../../assets/css/style.css'
})
export class EventsComponent {

    message = '';
     imageUrl0 = 'assets/img/blog/election.png';
     imageUrl1 = 'assets/img/blog/Waada.jpg';
     imageUrl2= 'assets/img/blog/bg_1.jpg';
     imageUrl3= 'assets/img/mre/Journee_MRE1.jpg';
     imageUrl4 = 'assets/img/voitureCase.jpeg'
     imageUrl5 = 'assets/img/madrassa/Madrassa3.jpeg';



    currentPage = 1;

    nextPage(): void {
        if (this.currentPage < 2) { // total number of pages
            this.currentPage++;
        }
    }

    previousPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    goToPage(page: number): void {
        this.currentPage = page;
    }


     getDataWada(){
        let dateWada =  new  Date(Date.UTC(new Date().getUTCFullYear(), 4, 1)) ;
        let currentDate = new Date();
         if( currentDate.getMonth() >=  dateWada.getMonth() && currentDate.getDate()> dateWada.getDate()){
          return currentDate.getUTCFullYear()+1
         }
          return currentDate.getUTCFullYear()
      }







  constructor(public authService: AuthService) { }

}
