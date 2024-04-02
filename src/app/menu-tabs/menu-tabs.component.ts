import { AfterViewInit, Component, ContentChild, ContentChildren, Query, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule } from '@angular/platform-browser';

@Component({
  selector: 'app-menu-tabs',
  standalone: true,
  imports: [MatTabsModule, MatIconModule, HammerModule],
  templateUrl: './menu-tabs.component.html',
  styleUrl: './menu-tabs.component.scss'
})
export class MenuTabsComponent implements AfterViewInit {
  @ViewChild(MatTabGroup) group: MatTabGroup;
  @ViewChildren(MatTab) tabs: QueryList<MatTab>;
  tab_num = 0;
  selected = 0;
  
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  ngAfterViewInit(){
    this.tab_num = this.tabs.length
    console.log(this.group)
  }

  swipe(eType: string, event: Event){
    event.preventDefault();
    console.log(eType);
    if(eType === this.SWIPE_ACTION.RIGHT && this.selected > 0){
      console.log("movin left")
      this.selected--;
    }
    else if(eType === this.SWIPE_ACTION.LEFT && this.selected < this.tab_num){
      console.log("movin right")
      this.selected++;
    }
    console.log(this.selected)
  }
}
