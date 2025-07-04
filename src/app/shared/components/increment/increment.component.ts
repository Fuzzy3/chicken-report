import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent, IconModule } from '@kirbydesign/designsystem';

@Component({
  selector: 'app-increment',
  imports: [IconModule, ButtonComponent],
  templateUrl: './increment.component.html',
  styleUrl: './increment.component.scss',
  standalone: true
})
export class IncrementComponent {
  @Output() add = new EventEmitter<void>();
  @Output() subtract = new EventEmitter<void>();
  

}
