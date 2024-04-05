import { NgModule } from "@angular/core"
import { DialogFooterComponent } from "./dialog-footer/dialog-footer.component";
import { DialogComponent } from "./dialog.component";
import { DialogHeaderComponent } from "./dialog-header/dialog-header.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [DialogFooterComponent, DialogComponent, DialogHeaderComponent],
  exports: [DialogFooterComponent, DialogComponent, DialogHeaderComponent],
  imports: [MatIconModule, MatButtonModule],
})
export class DialogModule {}