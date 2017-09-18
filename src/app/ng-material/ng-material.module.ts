import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MdButtonModule, MdCardModule, MdInputModule, MdListModule, MdSelectModule, MdTabsModule, MdTooltipModule

} from "@angular/material";

@NgModule({
  imports: [BrowserAnimationsModule, MdButtonModule, MdCardModule, MdInputModule, MdListModule, MdSelectModule,
            MdTabsModule, MdTooltipModule],
  exports: [BrowserAnimationsModule, MdButtonModule, MdCardModule, MdInputModule, MdListModule, MdSelectModule,
            MdTabsModule, MdTooltipModule],
})

export class MyNgMaterialModule {};
