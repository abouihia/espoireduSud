import { Component , OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-event-read-more',
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './event-read-more.component.html',
    styleUrl: './event-read-more.component.css'
})
export class EventReadMoreComponent  implements OnInit, OnDestroy{


    targetDate!: Date;
    days: number = 0;
    hours: number = 0;
    minutes: number = 0;
    seconds: number = 0;
    private timerId: any;

    // Custom date calculator fields
    customDate: string = '';
    customResult: { days: number; hours: number; minutes: number; seconds: number; isPast: boolean } | null = null;
    private customTimerId: any;

    ngOnInit(): void {
        this.updateTargetDate();
        this.startCountdown();
    }

    ngOnDestroy(): void {
        if (this.timerId) {
            clearInterval(this.timerId);
        }
        if (this.customTimerId) {
            clearInterval(this.customTimerId);
        }
    }

    private updateTargetDate(): void {
        const eventYear = this.getYear();
        // Event is May 1st at 11:00 AM local time (May is month index 4)
        this.targetDate = new Date(eventYear, 4, 1, 11, 0, 0);
    }

    private startCountdown(): void {
        this.calculateTime();
        this.timerId = setInterval(() => {
            this.calculateTime();
        }, 1000);
    }

    private calculateTime(): void {
        const now = new Date().getTime();
        const difference = this.targetDate.getTime() - now;

        if (difference <= 0) {
            this.days = 0;
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
            if (this.timerId) {
                clearInterval(this.timerId);
            }
            return;
        }

        this.days = Math.floor(difference / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((difference % (1000 * 60)) / 1000);
    }

    getYear(): number {
      const now = new Date();
      const year = now.getFullYear();
      const day = now.getDate();
      const month = now.getMonth() + 1;

      // Event is May 1st. If we are past May 1st, show next year.
      return (month > 5 || (month === 5 && day > 1)) ? year + 1 : year;
    }

    getEdition(): number {
      const dateFirstWada =  1932;
      return this.getYear() - dateFirstWada;
    }

    onCustomDateChange(): void {
        if (this.customTimerId) {
            clearInterval(this.customTimerId);
            this.customTimerId = null;
        }

        if (!this.customDate) {
            this.customResult = null;
            return;
        }

        this.calculateCustomTime();
        this.customTimerId = setInterval(() => {
            this.calculateCustomTime();
        }, 1000);
    }

    private calculateCustomTime(): void {
        if (!this.customDate) return;

        const target = new Date(this.customDate);
        const now = new Date();
        const difference = target.getTime() - now.getTime();
        const absoluteDiff = Math.abs(difference);

        const days = Math.floor(absoluteDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((absoluteDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((absoluteDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((absoluteDiff % (1000 * 60)) / 1000);

        this.customResult = {
            days,
            hours,
            minutes,
            seconds,
            isPast: difference < 0
        };
    }

}
