import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { interval, Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

import { Time } from '../../models/time.model';
@Component({
    imports: [],
    selector: 'app-count-down',
    templateUrl: './count-down.component.html',
    styleUrl: './count-down.component.css'
})
export class CountDownComponent  {



   diffInMonthsAndDays(start , end ){
      if (end < start) [start, end] = [end, start];
      let months =(end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

      // If the end day is before the start day, the last month is not complete
      if (end.getDate() < start.getDate()) {
          months--;
      }

    // Date after adding full months
      const anchor = new Date(start);
      anchor.setMonth(anchor.getMonth() + months);

      const days = Math.floor(
          (end.getTime() - anchor.getTime()) / (1000 * 60 * 60 * 24)
        );

        return{ months, days}
     }


   calculateDiff(){
         let dateWada =  new  Date(Date.UTC(new Date().getUTCFullYear(), 4, 1)) ;
         let currentDate = new Date();
         if( currentDate.getMonth() >  dateWada.getMonth()){
            let dateWada =  new  Date(Date.UTC(new Date().getUTCFullYear()+1, 4, 1)) ;
            return this.diffInMonthsAndDays(currentDate, dateWada);
         }else{
           return this.diffInMonthsAndDays(currentDate, dateWada);
         }


    }



}
