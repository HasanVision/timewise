import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { InputTextComponent } from '../../../shared/ui/input-text/input-text.component';
import { ErrorComponent } from '../../../shared/ui/error/error.component';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { SpinnerComponent } from '../../../shared/ui/spinner/spinner.component';
import { CardComponent } from '../../../shared/ui/card/card.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [  ReactiveFormsModule, ButtonComponent, InputTextComponent, CommonModule, ErrorComponent, SpinnerComponent, CardComponent ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  form: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }
  async onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      const { email } = this.form.value;

      try {
        const Response = await axios.post('http://localhost:4000/api/forgot-password', { email });
        this.successMessage = "Password reset link sent to your email";
        this.errorMessage = '';

      } catch (error) {
        this.errorMessage = "Failed to send password reset link";
        this.successMessage = '';

      } finally {
        this.isLoading = false;
      }

    }
  }
}

