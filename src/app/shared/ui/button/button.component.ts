import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() label: string = ''; // Default label
  @Input() type: 'button' | 'submit' | 'reset' = 'button'; // Button type
  @Input() disabled: boolean = false; // Disabled state
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary' ; // Variant for styling
  @Input() size: 'small' | 'medium' | 'large' = 'medium'; // Size of the button
  @Input() icon: string = ''; // Icon name
  @Input() iconPosition: 'left' | 'right' = 'left'; // Icon position
  @Input() fullWidth: boolean = false; // Button width
}
