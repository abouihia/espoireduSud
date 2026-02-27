import { Component, OnInit } from '@angular/core';
import { Membre } from '../../models/membre.model';
import { ContactService } from '../../services/contact.service';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../_helpers';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['../../../assets/css/style.css', './membre.component.css'],
  imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class MembreComponent implements OnInit {


  membre: Membre = new Membre;
  registerForm!: FormGroup;
  submitted = false;
  hide = true;
  hideConfirm = true;



  constructor(private contactService: ContactService,
    private formBuilder: FormBuilder, public authService: AuthService, private route: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      villageOrigine: ['', Validators.required],
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }



  village: any = [
    'Ait Brahim ou Youssef',
    'Afergoula',
    'Aouja',
    'Bourjaylat',
    'Sbouy',
    'ElFeid',
    'Boungaref',
    'Lmarhjoub',
    'Taglmoust',
    'AAmor'
  ];


  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }




  /*    ces deux methode pour la visibilité du mots de passe */
  toggleVisibility(): void {
    this.hide = !this.hide;
  }

  toggleConfirmVisibility(): void {
    this.hideConfirm = !this.hideConfirm;
  }

  redirectTo(): void {
    this.route.navigate(['Accueil']);
  }

  getIputType() {
    return this.hide ? 'password' : 'text';
  }

  getConfirmInputType() {
    return this.hideConfirm ? 'password' : 'text';
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.registerForm.controls['villageOrigine'].value)

    if (this.registerForm.invalid) { return; }
    // voir comment améliorer ça.
    this.membre.villageOrigine = this.registerForm.controls['villageOrigine'].value
    this.authService.SignUp(this.membre);
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }







































}
