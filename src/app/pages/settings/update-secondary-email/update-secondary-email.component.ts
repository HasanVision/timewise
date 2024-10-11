import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { InputTextComponent } from '../../../shared/ui/input-text/input-text.component';
import { LabelComponent } from '../../../shared/ui/label/label.component';
import { AuthService } from '../../../services/auth.service'; // Assuming you have an AuthService
import axios from 'axios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-secondary-email',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputTextComponent,
    LabelComponent,
    CommonModule
  ],
  templateUrl: './update-secondary-email.component.html',
  styleUrls: ['./update-secondary-email.component.css']
})
export class UpdateSecondaryEmailComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;
  currentUser: any;
  errorMessage: string = '';
  successMessage: string = '';
  isEmailVerified: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      secondaryEmail: new FormControl('', [
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
    });
  }

  ngOnInit(): void {
    // Fetch the current user data and populate the form
    this.authService.fetchCurrentUser().subscribe(
      (user) => {
        console.log("User data", user);
        this.currentUser = user;
        this.isEmailVerified = !!user.secondaryEmailVerified;
        
        this.form.patchValue({
          secondaryEmail: user.secondaryEmail || '', 
        });
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
      const { secondaryEmail } = this.form.value;
      const token = localStorage.getItem('accessToken');

      try {
        const response = await axios.put('http://localhost:4000/api/update-secondary-email', {
          secondaryEmail,
        }, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        this.successMessage = 'Secondary email updated successfully!';
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = 'An error occurred while updating the secondary email.';
        this.successMessage = '';
      } finally {
        this.isLoading = false;
      }
    }
  }
}