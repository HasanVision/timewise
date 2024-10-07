import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorComponent],
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() label: string = ''; // Input label
  @Input() type: string = 'text'; // Input type (e.g., text, email, password)
  @Input() placeholder: string = ''; // Placeholder text
  @Input() name: string = ''; // Name of the input field
  @Input() control: AbstractControl | null = null; // Accepts AbstractControl or null
  @Input() icon: string = ''; // Icon name
  @Input() iconPosition: 'left' | 'right' = 'left'; // Icon position
  @Input() fullWidth: boolean = false; // Full width input
  @Input() required: boolean = false; // Required field
  @Input() id: string = `input-${Math.random().toString(36).substr(2, 9)}`; // Unique ID for the input

  value: string = ''; // Internal value of the input
  disabled: boolean = false;

  // Methods required by ControlValueAccessor
  onChange = (value: string) => {};
  onTouched = () => {};

  // Implement required methods for ControlValueAccessor
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: any): void {
    const value = event.target.value;
    this.value = value;
    this.onChange(value); 
  }


  get showError(): boolean {
    if (!this.control) {
      return false;
    }
  
    const controlHasError = this.control.invalid && (this.control.touched || this.control.dirty);
  
    if (this.control.parent && this.control.parent.hasError('mismatch') && this.control === this.control.parent.get('confirmPassword')) {
      return this.control.touched || this.control.dirty;
    }
  
    return controlHasError;
  }
}
