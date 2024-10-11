import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-magic-link',
  template: `<div>{{message}}</div>`,
})
export class MagicLinkComponent implements OnInit {
  message = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      try {
        const response = await axios.post('http://localhost:4000/api/verify-magic-link', { token });
        localStorage.setItem('user', JSON.stringify(response.data.user));
        this.message = 'Login successful!';
        this.router.navigate(['/dashboard']);
      } catch (error) {
        this.message = 'Invalid or expired magic link.';
      }
    } else {
      this.message = 'No token provided.';
    }
  }
}