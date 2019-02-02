import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@fancydraw/shared';
import { ShellComponent } from './shell/shell.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [ShellComponent],
  declarations: [ShellComponent]
})
export class ShellModule {
}
