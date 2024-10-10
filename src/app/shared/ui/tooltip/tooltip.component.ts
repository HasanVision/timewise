import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css'
})
export class TooltipComponent {
@Input() text!: string;
@Input() tooltip!: string;
isVisible: boolean = false;

@HostListener('mouseenter') onMouseEnter() {
  this.isVisible = true;
}

@HostListener('mouseleave') onMouseLeave() {
  this.isVisible = false;
}
}
