import { Component } from '@angular/core';
import {Pages} from "./shared/pages";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public page: Pages = Pages.Recipes;
  public pages: typeof Pages = Pages;
  public myArray: string[] = ['aaa', 'bbb', 'ccc'];

  public setPage(page: Pages): void {
    this.page = page;
  }

  public logel(element: any) {
    console.log('AAA')
    console.log(element);
  }
}
