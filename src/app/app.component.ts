import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: '../assets/css/style.css',
  standalone: false
})
export class AppComponent {
  title = 'Espoir du sud';
  isMobileMenuOpen = false;

  constructor(public authService: AuthService) { }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    document.body.classList.toggle('mobile-menu-open', this.isMobileMenuOpen);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.classList.remove('mobile-menu-open');
  }

  toggleDropdown(event: Event) {
    if (!this.isMobileMenuOpen || window.innerWidth > 991) {
      return;
    }

    event.preventDefault();
    const trigger = event.currentTarget as HTMLElement | null;
    const dropdown = trigger?.closest('.dropdown');
    const dropdownMenu = dropdown?.querySelector('ul');

    if (dropdownMenu) {
      dropdownMenu.classList.toggle('dropdown-active');
    }
  }
}
