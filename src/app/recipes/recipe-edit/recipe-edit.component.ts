import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Recipe } from "../models/recipe.mode.";
import { RecipeService } from "../recipe.service";
import { Ingredient } from "../../shared/indredient.model";
import { RouterService } from "../../shared/router-service";

enum Modes {
  Edit = 'Edit',
  New = 'New'
}

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  public recipe: Recipe;
  public refipeForm: FormGroup;
  public recipeImage: string;
  public showImageErrorMessage: boolean = false;
  public mode: Modes;
  public modes: typeof Modes = Modes;
  private formIngredients: FormArray;
  private defaultImage: string = 'https://cdn.newseasonsmarket.com/wp-content/uploads/2015/11/Homepage-Recipe-Text.png';

  constructor(private routerService: RouterService, private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((recipe: Recipe) => {
      this.mode = recipe['id'] ? Modes.Edit : Modes.New ;

      if (this.mode === Modes.Edit) {
        this.recipe = this.recipeService.getRecipeById(recipe['id']);
      }
    });

    this.setDefaultImage();
    this.initializeForm();
  }

  public getIngredientControls(): AbstractControl[] {
    return (<FormArray>this.refipeForm.get('ingredients')).controls;
  }

  public addIngredient(ingredient?: Ingredient): void {
    const createdFormGroup: FormGroup = new FormGroup({
      'name': new FormControl(ingredient ? ingredient.name : null, Validators.required),
      'amount': new FormControl(ingredient ? ingredient.amount : null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    this.formIngredients.push(createdFormGroup);
  }

  public removeIngredient(index: number): void {
    this.formIngredients.removeAt(index);
  }

  public onSubmit() {
    const newRecipe: Recipe = { ...this.refipeForm.value, id: this.getId(), image: this.recipeImage }
    this.mode === Modes.New ? this.recipeService.addRecipe(newRecipe) : this.recipeService.editRecipe(this.recipe.id, newRecipe);
    this.routerService.navigate(this.mode === Modes.New ? `../${newRecipe.id}` : `../../${newRecipe.id}`, this.route);
  }

  public addImage(): void {
    this.recipeImage = this.refipeForm.get('image').value;
  }
p
  public onImageError(): void {
    this.setDefaultImage();
    this.showImageErrorMessage = true;
  }

  public onImageLoad(): void {
    this.showImageErrorMessage = false;
  }

  public onGoBack(): void {
    let redirectUrlPath: string;
    if (this.mode === Modes.New) {
      redirectUrlPath = this.recipeService.getRecipes().length ? `/recipes${this.recipeService.getRecipes()[0].id}` : '/recipes';
    } else {
      redirectUrlPath = '../';
    }
    this.routerService.navigate(redirectUrlPath, this.route);
  }

  private setDefaultImage(): void {
    this.recipeImage = this.defaultImage;
  }

  private initializeForm() {
    this.refipeForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'image': new FormControl(this.defaultImage, Validators.required),
      'ingredients': new FormArray([])
    });

    this.formIngredients = <FormArray>this.refipeForm.get('ingredients');

    if (this.mode === Modes.Edit) {
      let {id, ingredients, ...formData} = this.recipe ? this.recipe : null;
      this.refipeForm.setValue({ ...formData,  ingredients: []});
      this.recipeImage = formData.image;

      for (let i=0; i<ingredients.length; i++) {
        const currentIngredient: Ingredient = ingredients[i];
        this.addIngredient(currentIngredient);
      }
    }
  }

  private getId(): string {
    if (this.mode === Modes.Edit) {
      return this.recipe.id;
    } else {
      const initialId = (+Math.random().toFixed(6) * 1000000) + '';
      return this.recipeService.doesContainId(initialId) ? this.getId() : initialId;
    }
  }
}
