import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/indredient.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') private nameInput: ElementRef;
  @ViewChild('amountInput') private amountInput: ElementRef;

  constructor(private shoppineListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  public addIngredient() {
    const ingredientName: string = this.nameInput.nativeElement.value;
    const ingredientAmount: number = this.amountInput.nativeElement.value;
    this.shoppineListService.addIngredient(new Ingredient(ingredientName, ingredientAmount))
  }
}
