import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AlertComponent,
    DropdownDirective,
    PlaceholderDirective,
  ],
  exports: [
    DropdownDirective,
    PlaceholderDirective,
  ]
})
export class SharedModule {}
