// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-modal',
//   standalone: true,
//   imports: [],
//   templateUrl: './modal.component.html',
//   styleUrl: './modal.component.css'
// })
// export class ModalComponent {

// }
import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <div class="modal">
      <div class="modal-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .modal {
      display: block;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .modal-content {
      background-color: #fff;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
    }
  `]
})
export class ModalComponent {}