import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Commercant } from '../../models/commercant.model';
import { Contact } from '../../models/contact.model';
import { Email } from '../../models/email.model';
import { Membre } from '../../models/membre.model';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  imports: [CommonModule, FormsModule]
})
export class AdminComponent implements OnInit {

  commercant: Commercant = new Commercant();
  commercants: Commercant[] = [];
  membres: Membre[] = [];
  contacts: Contact[] = [];
  emails: Email[] = [];

  activeTab: string = 'overview';
  searchQuery: string = '';

  constructor(private contactService: ContactService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchAllCommercant();
    this.fetchAllMembres();
    this.fetchAllContacts();
    this.fetchAllEmails();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.searchQuery = ''; // Reset search query on tab change
    this.cdr.detectChanges();
  }

  fetchAllCommercant() {
    this.contactService.getAllCommercant().snapshotChanges().pipe(
      map(changes =>
        changes.map(ref =>
          ({ id: ref.payload.doc.id, ...ref.payload.doc.data() })
        )
      )
    ).subscribe({
      next: (data) => {
        this.commercants = data;
        console.log("Commercants loaded successfully:", this.commercants);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error loading commercants:", err);
      }
    });
  }

  fetchAllMembres() {
    this.contactService.getAllMembre().snapshotChanges().pipe(
      map(changes =>
        changes.map(ref =>
          ({ uid: ref.payload.doc.id, ...ref.payload.doc.data() })
        )
      )
    ).subscribe({
      next: (data) => {
        this.membres = data;
        console.log("Membres loaded successfully:", this.membres);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error loading membres:", err);
      }
    });
  }

  fetchAllContacts() {
    this.contactService.getAllContact().snapshotChanges().pipe(
      map(changes =>
        changes.map(ref =>
          ({ id: ref.payload.doc.id, ...ref.payload.doc.data() })
        )
      )
    ).subscribe({
      next: (data) => {
        this.contacts = data;
        console.log("Contacts loaded successfully:", this.contacts);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error loading contacts:", err);
      }
    });
  }

  fetchAllEmails() {
    this.contactService.getAllEmails().snapshotChanges().pipe(
      map(changes =>
        changes.map(ref =>
          ({ id: ref.payload.doc.id, ...ref.payload.doc.data() })
        )
      )
    ).subscribe({
      next: (data) => {
        this.emails = data;
        console.log("Emails loaded successfully:", this.emails);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error loading emails:", err);
      }
    });
  }

  // Search Filter Getters
  get filteredCommercants(): Commercant[] {
    if (!this.searchQuery) return this.commercants;
    const query = this.searchQuery.toLowerCase().trim();
    return this.commercants.filter(item => 
      (item.Nom && item.Nom.toLowerCase().includes(query)) ||
      (item.Prenom && item.Prenom.toLowerCase().includes(query))
    );
  }

  get filteredMembres(): Membre[] {
    if (!this.searchQuery) return this.membres;
    const query = this.searchQuery.toLowerCase().trim();
    return this.membres.filter(item => 
      (item.firstName && item.firstName.toLowerCase().includes(query)) ||
      (item.lastName && item.lastName.toLowerCase().includes(query)) ||
      (item.email && item.email.toLowerCase().includes(query)) ||
      (item.villageOrigine && item.villageOrigine.toLowerCase().includes(query))
    );
  }

  get filteredContacts(): Contact[] {
    if (!this.searchQuery) return this.contacts;
    const query = this.searchQuery.toLowerCase().trim();
    return this.contacts.filter(item => 
      (item.name && item.name.toLowerCase().includes(query)) ||
      (item.email && item.email.toLowerCase().includes(query)) ||
      (item.sujet && item.sujet.toLowerCase().includes(query)) ||
      (item.message && item.message.toLowerCase().includes(query))
    );
  }

  get filteredEmails(): Email[] {
    if (!this.searchQuery) return this.emails;
    const query = this.searchQuery.toLowerCase().trim();
    return this.emails.filter(item => 
      (item.mail && item.mail.toLowerCase().includes(query))
    );
  }

  // Visual Helper Methods
  getInitials(item: Commercant): string {
    const p = item.Prenom ? item.Prenom.trim().charAt(0) : '';
    const n = item.Nom ? item.Nom.trim().charAt(0) : '';
    return (p + n).toUpperCase() || '?';
  }

  getAvatarColor(item: Commercant): string {
    const name = `${item.Prenom || ''}${item.Nom || ''}`;
    return this.generateColorFromString(name);
  }

  getMemberInitials(item: Membre): string {
    const f = item.firstName ? item.firstName.trim().charAt(0) : '';
    const l = item.lastName ? item.lastName.trim().charAt(0) : '';
    return (f + l).toUpperCase() || '?';
  }

  getMemberAvatarColor(item: Membre): string {
    const name = `${item.firstName || ''}${item.lastName || ''}`;
    return this.generateColorFromString(name);
  }

  getContactInitials(item: Contact): string {
    if (!item.name) return '?';
    const parts = item.name.trim().split(' ');
    if (parts.length > 1) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return parts[0].charAt(0).toUpperCase();
  }

  getContactAvatarColor(item: Contact): string {
    return this.generateColorFromString(item.name || '');
  }

  private generateColorFromString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      'linear-gradient(135deg, #22c55e, #15803d)', // Green
      'linear-gradient(135deg, #0ea5e3, #0369a1)', // Blue
      'linear-gradient(135deg, #f59e0b, #b45309)', // Amber
      'linear-gradient(135deg, #7c3aed, #5b21b6)', // Purple
      'linear-gradient(135deg, #ec4899, #be185d)', // Pink
      'linear-gradient(135deg, #6366f1, #4338ca)'  // Indigo
    ];
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }

}
