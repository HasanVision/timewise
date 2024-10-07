import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { ErrorComponent } from '../../shared/ui/error/error.component';
import { InputTextComponent } from '../../shared/ui/input-text/input-text.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    InputTextComponent,
     ButtonComponent,
      ButtonComponent,
       ErrorComponent,
        FontAwesomeModule,
         CommonModule,
          RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  isPasswordVisible: boolean = false;
  isRegisterPage: boolean = false;

  constructor (private fb: FormBuilder, private library: FaIconLibrary) {
    this.library.addIcons(faEye, faEyeSlash);
    
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
