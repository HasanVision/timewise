import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { AuthService } from '../../services/auth.service';
import { CardComponent } from '../../shared/ui/card/card.component';
import { InputTextComponent } from '../../shared/ui/input-text/input-text.component';
import { LabelComponent } from '../../shared/ui/label/label.component';
import { Router } from '@angular/router';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipComponent } from '../../shared/ui/tooltip/tooltip.component';
import { UpdateSecondaryEmailComponent } from './update-secondary-email/update-secondary-email.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ForgotPasswordComponent } from "../auth/forgot-password/forgot-password.component";


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    CardComponent,
    InputTextComponent,
    LabelComponent,
    TooltipComponent,
    UpdateSecondaryEmailComponent,
    UpdatePasswordComponent,
    ForgotPasswordComponent
],
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
      primaryEmail: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [Validators.minLength(6)]),
    })
  }

  ngOnInit(): void {
    this.authService.fetchCurrentUser().subscribe(
      (user) => {
        // console.log("Fetching user data", user);
        this.currentUser = user;
        this.form.patchValue({
          firstname: user.firstname,
          lastname: user.lastname,
          primaryEmail: user.primaryEmail,
        });
      },
      (error) => {
        console.error("Error fetching user data:", error);  // Log the error
        this.errorMessage = 'An error occurred while fetching user data';
      }
    )
  }
 
  async onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      const { firstname, lastname,primaryEmail, password } = this.form.value;
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axios.put('http://localhost:4000/api/update-user', {
          firstname,
          lastname,
          primaryEmail,
          password,
        }, {
          // withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Make sure you're sending the JWT token
            
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
