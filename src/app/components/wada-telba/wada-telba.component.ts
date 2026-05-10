import { Component } from '@angular/core';

@Component({
  selector: 'app-wada-telba',
  standalone: false,
  templateUrl: './wada-telba.component.html',
  styleUrl: './wada-telba.component.css',
})
export class WadaTelbaComponent {
  isCommuniqueExpanded = false;

  toggleCommunique() {
    this.isCommuniqueExpanded = !this.isCommuniqueExpanded;
  }
}

