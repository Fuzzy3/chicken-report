import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-count',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './count.component.html',
  styleUrl: './count.component.scss'
})
export class CountComponent {

  public width: SafeStyle;
  private _minimumDigits: number = 1;

  @Input()
  public set minimumDigits(digits: number) {
    this._minimumDigits = digits;
    this.width = this.calcWidth(digits);
  }

  public get minimumDigits(): number {
    return this._minimumDigits;
  }

  @Input()
  public count: number | undefined | null;

  @Input() postText: string;

  
  private calcWidth(minDigits: number): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle('min-width: ' + minDigits * 24 + 'px;');
  }

  constructor(private sanitizer: DomSanitizer) {}
}
