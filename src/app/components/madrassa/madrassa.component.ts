import { Component, AfterViewInit } from '@angular/core';

declare var GLightbox: any;

@Component({
  selector: 'app-madrassa',
  standalone: false,
  templateUrl: './madrassa.component.html',
  styleUrl: './madrassa.component.css',
})
export class MadrassaComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    if (typeof GLightbox !== 'undefined') {
      GLightbox({
        selector: '.portfolio-lightbox'
      });
    }
  }

}
