import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { InputTextComponent } from '../../shared/ui/input-text/input-text.component';
import { ErrorComponent } from "../../shared/ui/error/error.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, InputTextComponent, ErrorComponent, FontAwesomeModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  isRegisterPage: boolean = true;
  registerError: string | null = null;

  constructor(private fb: FormBuilder, private library: FaIconLibrary) {
    this.library.addIcons(faEye, faEyeSlash);

    this.form = this.fb.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, {
      validators: this.passwordsMatchValidator // Attach the custom validator
    });
  }

  // Define the custom validator as a method
  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.form.valid) {
        const { firstname, lastname, email, password } = this.form.value;

        try {
            console.log('Registering user:', firstname, lastname, email, password);
            const response = await axios.post('http://localhost:4000/api/register', {
                firstName: firstname,
                lastName: lastname,
                email,
                password
            });
            console.log('Registration successful:', response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Registration failed:', error.response?.data); // Log detailed error response
                this.registerError = error.response?.data?.message || 'Registration failed. Please try again.';
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    }
}
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
}