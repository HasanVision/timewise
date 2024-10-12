import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { InputTextComponent } from '../../../shared/ui/input-text/input-text.component';
import { LabelComponent } from '../../../shared/ui/label/label.component';
import { AuthService } from '../../../services/auth.service'; 
import axios, { AxiosError } from 'axios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputTextComponent,
    LabelComponent,
    CommonModule
  ],
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  form: FormGroup;
    currentUser: any;
    isLoading: boolean = false;
    errorMessage: string = '';
    successMessage: string = '';

  constructor (private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required], ),
    
    });
  }
  ngOnInit(): void {
    this.authService.fetchCurrentUser().subscribe(
      (user) => {
        
        this.currentUser = user;
        console.log("Fetching user data", user);
        this.form.patchValue({
          currentPassword: user.password,
          newPassword: '',
          confirmPassword: '',
        })
      },
      (error) => {
        console.error("Error fetching user data", error);
        this.errorMessage = 'Error fetching user data';
      }
    );
  }
  async onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      const { password, newPassword } = this.form.value;
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axios.put('http://localhost:4000/api/update-password', {
          password,
          newPassword,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.successMessage = response.data.message;
        this.errorMessage = '';
      } catch (error) {
        // Use AxiosError for type assertion
        if (error instanceof AxiosError) {
          if (error.response) {
            console.error('Error response data:', error.response.data);
            this.errorMessage = error.response.data.message || 'An error occurred while updating the password';
          } else if (error.request) {
            console.error('Error request:', error.request);
            this.errorMessage = 'No response from server';
          } else {
            console.error('Error message:', error.message);
            this.errorMessage = 'Error: ' + error.message;
          }
        } else {
          // Handle any other unknown errors
          this.errorMessage = 'An unknown error occurred';
        }
        this.successMessage = '';
      } finally {
        this.isLoading = false;
      }
    }
  }
}