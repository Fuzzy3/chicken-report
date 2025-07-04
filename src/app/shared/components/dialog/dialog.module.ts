import { NgModule } from "@angular/core"
import { DialogFooterComponent } from "./dialog-footer/dialog-footer.component";
import { DialogComponent } from "./dialog.component";
import { DialogHeaderComponent } from "./dialog-header/dialog-header.component";

@NgModule({
  declarations: [DialogFooterComponent, DialogComponent, DialogHeaderComponent],
  exports: [DialogFooterComponent, DialogComponent, DialogHeaderComponent],
  imports: [],
})
export class DialogModule {}