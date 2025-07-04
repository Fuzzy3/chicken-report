import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KirbyModule } from '@kirbydesign/designsystem';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KirbyModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() {
    console.log('AppComponent initialized');
  }
}
