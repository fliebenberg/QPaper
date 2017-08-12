import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MdButtonModule, MdCardModule, MdInputModule, MdListModule, MdSelectModule,

} from "@angular/material";

@NgModule({
  imports: [BrowserAnimationsModule, MdButtonModule, MdCardModule, MdInputModule, MdListModule, MdSelectModule],
  exports: [BrowserAnimationsModule, MdButtonModule, MdCardModule, MdInputModule, MdListModule, MdSelectModule],
})

export class MyNgMaterialModule {};
