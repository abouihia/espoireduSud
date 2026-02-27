import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrl: '../../../assets/css/style.css',
    imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule]
})
export class ForgotPasswordComponent {

  submitted = false;
  registerForm!: FormGroup;
  emailUser! : string;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      emailUser: ['', [Validators.required, Validators.email]],
    });
  }
  onSubmit(){
    console.log(this.emailUser);
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {  return; }
    this.authService.ForgotPassword(this.emailUser);
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

}
