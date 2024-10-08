import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import axios from 'axios';
import { SpinnerComponent } from '../../shared/ui/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../shared/ui/error/error.component';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { InputTextComponent } from '../../shared/ui/input-text/input-text.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { CardComponent } from '../../shared/ui/card/card.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, 
    SpinnerComponent, 
    RouterModule, 
    CommonModule, 
    ErrorComponent, 
    ButtonComponent, 
    InputTextComponent, 
    FontAwesomeModule, 
    CardComponent],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  ngOnInit() {
    // Get the token from the URL
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.errorMessage = 'Invalid or missing token';
    }
  }

  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      const { password } = this.form.value;
      const token = this.route.snapshot.queryParamMap.get('token');
  
      try {
        // Send the new password and token to the backend API
        const response = await axios.post('http://localhost:4000/api/new-password', {
          password,
          token
        });
        this.successMessage = 'Password reset successful!';
        this.errorMessage = '';
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Axios-specific error handling
          this.errorMessage = error.response?.data?.message || 'Password reset failed. Please try again.';
        } else {
          // Fallback for other types of errors
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
        this.successMessage = '';
      } finally {
        this.isLoading = false;
      }
    }
  }
}