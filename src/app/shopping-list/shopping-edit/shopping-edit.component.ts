import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/indredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') private nameInput: ElementRef;
  @ViewChild('amountInput') private amountInput: ElementRef;
  @Output() onIngredientSelected: EventEmitter<Ingredient> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public addIngredient() {
    const ingredientName: string = this.nameInput.nativeElement.value;
    const ingredientAmount: number = this.amountInput.nativeElement.value;
    this.onIngredientSelected.next(new Ingredient(ingredientName, ingredientAmount));
  }
}
