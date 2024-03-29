import { NgModule } from "@angular/core"
import { DialogFooterComponent } from "./dialog/dialog-footer/dialog-footer.component";
import { DialogComponent } from "./dialog/dialog.component";
import { DialogHeaderComponent } from "./dialog/dialog-header/dialog-header.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [DialogFooterComponent, DialogComponent, DialogHeaderComponent],
  exports: [DialogFooterComponent, DialogComponent, DialogHeaderComponent],
  imports: [MatIconModule, MatButtonModule],
})
export class DialogModule {}