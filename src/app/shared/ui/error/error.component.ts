import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [NgIf],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  @Input() control: AbstractControl | null = null;

  get errorMessage(): string {
    if (this.control?.errors && (this.control.touched || this.control.dirty)) {
      if (this.control.errors['required']) {
        return 'This field is required';
      }
      if (this.control.errors['email']) {
        return 'Invalid email address';
      }
      if (this.control.errors['minlength']) {
        const requiredLength = this.control.errors['minlength'].requiredLength;
        return `Minimum length is ${requiredLength} characters`;
      }
      if (this.control.parent && this.control.parent.hasError('mismatch') && this.control === this.control.parent.get('confirmPassword')) {
        return 'Passwords do not match';
      }
    }
    return ''; // Return an empty string if there are no errors
  }
}