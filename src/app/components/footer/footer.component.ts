import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Added for ngIf/ngClass
import { ContactService } from '../../services/contact.service';
import { Email } from '../../models/email.model';
import { map } from 'rxjs/operators'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: '../../../assets/css/style.css',
  imports: [FormsModule]
})
export class FooterComponent {

  email: Email = new Email;
  emails?: Email[];
  existMail = false;
  showSuccessPopup = false;
  isSubmitting = false;
  currentYear: number = new Date().getFullYear();
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 300;
  }
  constructor(private contactService: ContactService) {
    this.retrieveTutorials();
  }

  saveEmail() {
    this.existMail = false; // Reset alert state

    if (!this.email.mail || this.email.mail.trim() === '') {
      return;
    }

    this.isSubmitting = true;

    // check if email exist:
    const emailJson = JSON.stringify(this.email);
    const emailParsed = JSON.parse(emailJson);

    if (this.emails != null) {
      for (const x of this.emails) {
        if (x.mail === emailParsed.mail) {
          this.existMail = true;
          break;
        }
      }
    }

    // Faux délai pour rendre l'action premium
    setTimeout(() => {
      this.isSubmitting = false;
      if (!this.existMail) {
        this.contactService.addNewEmail(this.email).then(() => {
          this.email = new Email();
          this.showSuccessPopup = true;
          setTimeout(() => {
            this.showSuccessPopup = false;
          }, 4000);
        });
      } else {
        setTimeout(() => {
          this.existMail = false;
        }, 4000);
      }
    }, 600);
  }

  retrieveTutorials(): void {
    this.contactService.getAllEmails().snapshotChanges().pipe(
      map(changes =>
        changes.map(ref =>
          ({ id: ref.payload.doc.id, ...ref.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.emails = data;
    });
  }

}
