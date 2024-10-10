import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ErrorComponent } from '../../../shared/ui/error/error.component';
import { InputTextComponent } from '../../../shared/ui/input-text/input-text.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { RouterModule , Router} from '@angular/router';
import axios from 'axios';
import { SpinnerComponent } from '../../../shared/ui/spinner/spinner.component';
import { CardComponent } from "../../../shared/ui/card/card.component";
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; 
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextComponent,
    ButtonComponent,
    ErrorComponent,
    FontAwesomeModule,
    CommonModule,
    RouterModule,
    SpinnerComponent,
    CardComponent
],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
})
export class LoginComponent {
  form: FormGroup;
  isPasswordVisible: boolean = false;
  isRegisterPage: boolean = false;
  loginError: string | null = null;
  isLoading: boolean = false;
  isSuccessful: boolean = false;


  constructor(private fb: FormBuilder, private library: FaIconLibrary, private router: Router, private authService: AuthService) {
    this.library.addIcons(faEye, faEyeSlash, faGoogle);

    this.form = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;  
      const { email, password } = this.form.value;
      try {
        // console.log('Logging in user:', email, password);
        const response = await axios.post('http://localhost:4000/api/login', {
          email,
          password,
        });
        this.isSuccessful = true;

        const token = response.data.accessToken;
        console.log('Access token:', token);
    
        // Store user data in localStorage
        localStorage.setItem('accessToken', token);
        this.authService.login(response.data.user)
        console.log('User logged in:', response.data.user);
    
        this.loginError = null;
    
        // Navigate to the dashboard
        this.router.navigate(['/dashboard']);
      } catch (error: unknown) {
        // Handle Axios-specific errors
        if (axios.isAxiosError(error)) {
          this.loginError = error.response?.data.message || 'Invalid email or password. Please try again.';
        } else {
          // Handle generic errors
          this.loginError = 'An unexpected error occurred during login. Please try again.';
        }
      } finally {
        this.isLoading = false;
      }
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  handleGoogleAuth() {
    window.location.href = 'http://localhost:4000/auth/google'; 
  }
  resendEmail() {
    const email = this.form.get('email')?.value; 
    if (email) {
      axios.post('http://localhost:4000/api/resend-verification', { email })
        .then(response => {
          console.log('Verification email resent successfully', response);
        })
        .catch(error => {
          console.error('Error resending verification email', error);
        });
    } else {
      console.error('Email is missing, cannot resend verification email.');
    }
  }

}