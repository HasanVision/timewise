
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-secondary-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify-secondary-email.component.html',
  styleUrl: './verify-secondary-email.component.css'
})
export class VerifySecondaryEmailComponent implements OnInit {
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router , ) {}

  ngOnInit(): void {
    this.isLoading = true;

    // Get the token from the URL query parameter
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.errorMessage = 'Invalid verification link';
      this.isLoading = false;
      return;
    }

    // Send the token to the backend for verification
    axios.post('http://localhost:4000/api/verify-secondary-email', { token })
      .then(response => {
        this.successMessage = 'Thank you for verifying your secondary email!';
        this.errorMessage = '';
      })
      .catch(error => {
        this.errorMessage = 'Failed to verify email. The token might be invalid or expired.';
        this.successMessage = '';
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
