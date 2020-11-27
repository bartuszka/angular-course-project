import { Injectable } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";

@Injectable()
export class RouterService {
  constructor(private router: Router) {}

  public navigate(url: string, activatedRoute?: ActivatedRoute): void {
    this.router.navigate([url], activatedRoute ? { relativeTo: activatedRoute } : {});
  }
}
