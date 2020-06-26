import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../models/recipe.mode.";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  @Output() onRecipeSelected: EventEmitter<Recipe> = new EventEmitter();

  public recipes: Recipe[] = [
    new Recipe('Shakshuka', 'Easy, healthy breakfast (or any time of day) recipe in Israel and other parts of the Middle East and North Africa.', 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg'),
    new Recipe('Grilled Turkish-Style Chicken Wings', 'An improved setup for skewers brings these grilled wings closer to the heat, while a marinade based on Turkish hot pepper paste infuses them with roasted-chili flavor.', 'https://www.seriouseats.com/2019/07/20190618-grilled-turkish-chicken-wings-vicky-wasik-13-1500x1125.jpg'),
    new Recipe('Garlic Butter Sauteed Zucchini', 'Sautéed zucchini is a quick, easy, and healthy side dish. It’s delicious, too.', 'https://www.inspiredtaste.net/wp-content/uploads/2018/12/Sauteed-Zucchini-Recipe-1-1200.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public selectRecipe(selectedRecipe: Recipe): void {
    this.onRecipeSelected.next(selectedRecipe);
  }
}
