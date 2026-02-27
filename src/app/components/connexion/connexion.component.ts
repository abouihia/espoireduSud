import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Membre } from '../../models/membre.model';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrl: '../../../assets/css/style.css',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule]
})
export class ConnexionComponent {

  membre: Membre = new Membre;
  registerForm!: FormGroup;
  submitted = false;
  hide = true;
  emailUser!: string;
  passwordUser!: string;

  constructor(private contactService: ContactService,
    private formBuilder: FormBuilder,
    public authService: AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) { return; }
    this.authService.SignIn(this.membre);
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  /*    ces deux methode pour la visibilité du mots de passe */
  toggleVisibility(): void {
    this.hide = !this.hide;
  }

  getIputType() {
    return this.hide ? 'password' : 'text';
  }



}
