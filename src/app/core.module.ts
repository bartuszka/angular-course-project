import { NgModule } from "@angular/core";
import { RecipeService } from "./recipes/recipe.service";
import { DataStorageService } from "./shared/data-storage.service";
import { RecipeResolverService } from "./recipes/reslovers/recipe-resolver.service";
import { AuthService } from "./auth/auth.service";
import { ErrorService } from "./shared/alert/error.service";
import { RouterService } from "./shared/router-service";
import { AuthGuardService } from "./auth/auth-guard.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/auth-interceptor";

@NgModule({
  providers: [
    RecipeService,
    DataStorageService,
    RecipeResolverService,
    AuthService,
    ErrorService,
    RouterService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
})
export class CoreModule {}
