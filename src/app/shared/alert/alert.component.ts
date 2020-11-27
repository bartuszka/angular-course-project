import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AppErorr } from "./error.service";
import { Subject } from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() public error: AppErorr;
  @Output() public alertClosed: Subject<void> = new Subject();

  public onClose(): void {
    this.alertClosed.next();
    this.alertClosed.complete();
  }
}
