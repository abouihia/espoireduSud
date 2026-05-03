import { Component } from '@angular/core';

@Component({
    selector: 'app-event-read-more',
    templateUrl: './event-read-more.component.html',
    styleUrl: '../../../assets/css/style.css',
    standalone: false
})
export class EventReadMoreComponent {


   getYear() {
      const now = new Date();  // declare the  object date
      const year = now.getUTCFullYear(); // get the year od the date
       //Get the day and month of the year
       const day = now.getDate();
       const month = now.getMonth() + 1;

       return (day > 1 || month > 5) ? year + 1 : year;
       }

   getEdition(){
      const dateFirsWada =  1932;
      const now = new Date();  // declare the  object date
      const year = now.getUTCFullYear(); // get the year od the date
      return  year-dateFirsWada;

   }

}
