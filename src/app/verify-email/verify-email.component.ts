import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios, { AxiosError } from 'axios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  message: string = '';
  isSuccess: boolean = false;

  constructor(private route: ActivatedRoute, public router: Router) {}

  async ngOnInit() {
    // Extract token from URL
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      try {
        // Call the backend API to verify the token
        const response = await axios.post('http://localhost:4000/api/verify-token', { token });
        this.message = response.data.message;
        this.isSuccess = true;
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          this.message = error.response.data?.message || 'Verification failed. The token might be invalid or expired.';
        } else {
          this.message = 'An unexpected error occurred during verification.';
        }
        this.isSuccess = false;
      }
    } else {
      this.message = 'No token provided for verification.';
    }
  }
}