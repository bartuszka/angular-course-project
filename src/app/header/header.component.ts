import {Component, EventEmitter, Output} from "@angular/core";
import {Pages} from "../shared/pages";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public pages: typeof Pages = Pages;
  @Output() public onPageSelected: EventEmitter<Pages> = new EventEmitter();

  public goToPage(page: Pages): void {
    this.onPageSelected.next(page);
  }
}
