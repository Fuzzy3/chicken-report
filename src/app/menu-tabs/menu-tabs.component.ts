import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-menu-tabs',
  standalone: true,
  imports: [MatTabsModule, MatIconModule],
  templateUrl: './menu-tabs.component.html',
  styleUrl: './menu-tabs.component.scss'
})
export class MenuTabsComponent {

}
