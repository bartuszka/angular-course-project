import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver, ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { AuthService } from "./auth/auth.service";
import { AppErorr, ErrorService } from "./shared/alert/error.service";
import { Subscription } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { AlertComponent } from "./shared/alert/alert.component";
import { PlaceholderDirective } from "./shared/placeholder/placeholder.directive";
import { Store } from "@ngrx/store";
import * as fromApp from "./auth/store/auth.reducer";
import * as authActions from "./auth/store/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private errorsSubscription: Subscription;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private errorService: ErrorService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AuthState>
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new authActions.AutoLogin());

    this.errorsSubscription = this.errorService.error$.pipe(
      filter(Boolean),
      tap((error: AppErorr) => {
        this.showErrorAlert(error.code, error.message);
      })
    ).subscribe();
  }

  private showErrorAlert(code: number, message: string) {
    const alertComponentFactory: ComponentFactory<AlertComponent> = this.componentFactoryResolver
      .resolveComponentFactory(AlertComponent);
    const hostViewContainerRef: ViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef: ComponentRef<AlertComponent> = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.error = { code, message };
    componentRef.instance.alertClosed.subscribe(() => {
      hostViewContainerRef.clear();
      this.store.dispatch(new authActions.ClearError());
    });
  }
}
