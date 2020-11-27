import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { AuthGuardService } from "../auth/auth-guard.service";
import { RecipeResolverService } from "./reslovers/recipe-resolver.service";
import { NoRecipeSelectedComponent } from "./no-recipe-selected/no-recipe-selected.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";

export const recipeRoutes: Routes = [
  { path: '',
    component: RecipesComponent,
    canActivate: [AuthGuardService],
    resolve: { authData: RecipeResolverService },
    children: [
      { path: '', component: NoRecipeSelectedComponent, pathMatch: 'full' },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent }
    ]},
]

@NgModule({
  imports: [
    RouterModule.forChild(recipeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule {}
