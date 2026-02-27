import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: '../../../assets/css/style.css'
})
export class ContactComponent implements OnInit, AfterViewInit {


  contact: Contact = new Contact;
  submitted = false;
  sendedOk = false;
  remainingText: number;
  registerForm!: FormGroup;

  constructor(private contactService: ContactService,
    private formBuilder: FormBuilder) {
    this.remainingText = 0;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],

    });
  }


  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  /* Leaflet Map */
  private map: L.Map | undefined;

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [29.801567, -9.549286],
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Correction pour les icônes Leaflet qui ne s'affichent pas toujours correctement avec Webpack/Angular
    const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
    const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
    const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    L.marker([29.801567, -9.549286]).addTo(this.map)
      .bindPopup('<b>Espoir du Sud</b><br>Notre siège.')
      .openPopup();
  }



  valueChange() {
    let val = this.registerForm.controls['message'].value;
    this.remainingText = val.length;
  }

  saveContact(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.contactService.create(this.contact).then(() => {
      console.log('Created new item successfully!');
      this.sendedOk = true;
    });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    this.remainingText = 0;
  }

  newContact(): void {
    this.submitted = false;
    this.contact = new Contact();
  }

}
