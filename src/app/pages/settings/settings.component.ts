import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;
  currentUser: any;
  errorMessage: string = '';
  successMessage: string = '';
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private commonModule: CommonModule) {
    this.form = this.fb.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [Validators.minLength(6)]),
    })
  }

  ngOnInit(): void {
    this.authService.fetchCurrentUser().subscribe(
      (user) => {
        console.log("Fetching user data", user);
        this.currentUser = user;
        this.form.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
      },
      (error ) => {
        this.errorMessage = 'An error occurred while fetching user data';
      }
    )
  }
  async onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      const { firstName, lastName, password } = this.form.value;
      try {
        const response = await axios.put('http://localhost:4000/api/update-user', {
          firstName,
          lastName,
          password,
        }, {
          // withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Make sure you're sending the JWT token
            
          },
          
        });
        this.successMessage = 'Settings updated successfully!';
        this.errorMessage = '';
        console.log(localStorage.getItem('accessToken'));
      } catch (error) {
        this.errorMessage = 'An error occurred while updating settings.';
        this.successMessage = '';
      } finally {
        this.isLoading = false;
      }
    }
  }
}
