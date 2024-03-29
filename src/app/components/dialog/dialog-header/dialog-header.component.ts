import { Component, EventEmitter, Input, Output } from '@angular/core';
 

@Component({
  selector: 'app-dialog-header',
  standalone: false,
  templateUrl: './dialog-header.component.html',
  styleUrl: './dialog-header.component.scss'
})
export class DialogHeaderComponent {
  
  @Input()
  dialogTitle: string;
  
  @Input()
  showClose: boolean = true;
  
  @Output()
  onClose: EventEmitter<void> = new EventEmitter();
  
  close() {
    this.onClose.emit();
  }
}
