import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { ErrorComponent } from '../../shared/ui/error/error.component';
import { InputTextComponent } from '../../shared/ui/input-text/input-text.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { RouterModule , Router} from '@angular/router';
import axios from 'axios';


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
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Use `styleUrls` (plural)
})
export class LoginComponent {
  form: FormGroup;
  isPasswordVisible: boolean = false;
  isRegisterPage: boolean = false;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private library: FaIconLibrary, private router: Router) {
    this.library.addIcons(faEye, faEyeSlash);

    this.form = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  // Mark `onSubmit` as `async` to use `await`
  async onSubmit() {
    if (this.form.valid) {
        const { email, password } = this.form.value;
        try {
            console.log('Logging in user:', email, password);
            const response = await axios.post('http://localhost:4000/api/login', {
                email,
                password,
            });
            console.log('Login successful:', response.data);

            // Store user data in localStorage or token if using JWT
            localStorage.setItem('user', JSON.stringify(response.data.user));
            // Or if your backend provides a token:
            // localStorage.setItem('token', response.data.token);

            this.loginError = null; // Clear any previous errors
            
            // Redirect to a different route, e.g., dashboard
            this.router.navigate(['/dashboard']);
        } catch (error) {
            console.error('Error logging in:', error);
            this.loginError = 'Invalid email or password. Please try again.';
        }
    }
}

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}