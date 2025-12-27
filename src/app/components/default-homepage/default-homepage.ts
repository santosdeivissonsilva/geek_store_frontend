import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-homepage',
  imports: [],
  templateUrl: './default-homepage.html',
  styleUrl: './default-homepage.scss',
})
export class DefaultHomepage {
  @Input() user: string = "";
  @Input() cart: string = "";
  @Output("navigateToUserPage") onNavigateToUserPage = new EventEmitter();
  @Output("navigateToCartPage") onNavigateToCartPage = new EventEmitter();
  @Output("navigateToProductsPage") onNavigateToProductsPage = new EventEmitter();

  navigateToUserPage(){
    this.onNavigateToUserPage.emit();
  }

  navigateToCartPage(){
    this.onNavigateToCartPage.emit();
  }

  navigateToProductsPage(){
    this.onNavigateToProductsPage.emit();
  }
}
