import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: '../assets/css/style.css',
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'Espoir du sud';
  isMobileMenuOpen = false;
  langDropdownOpen = false;
    lang = '';
  ngOnInit() {
    this.lang = localStorage.getItem('lang') || 'fr';
  }

  changeLang(selectedLanguage: string) {
    this.lang = selectedLanguage;
    localStorage.setItem('lang', selectedLanguage);
    this.translateService.use(selectedLanguage);
    this.langDropdownOpen = false;
  }

  constructor(public authService: AuthService, public translateService: TranslateService) {
      this.translateService .setDefaultLang('fr');
      this.translateService .use(localStorage.getItem('lang')|| 'fr');
      }

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isLangDropdown = target.closest('.lang-dropdown');
    if (!isLangDropdown) {
      this.langDropdownOpen = false;
    }
  }
}
