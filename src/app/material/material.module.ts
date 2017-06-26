import { NgModule } from '@angular/core';
import {MdButtonModule, MdCheckboxModule, MaterialModule} from '@angular/material';

@NgModule({
  imports: [MdButtonModule, MdCheckboxModule],
  exports: [MdButtonModule, MdCheckboxModule]
})
export class CustomMaterialModule { }

