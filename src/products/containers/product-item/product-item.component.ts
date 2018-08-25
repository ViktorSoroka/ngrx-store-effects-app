import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as fromStore from '../../store';
import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  templateUrl: 'product-item.component.html',
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;
  visualize$: Observable<Pizza>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.pizza$ = this.store.select(fromStore.getSelectedPizza).pipe(
      tap((pizza: Pizza = null) => {
        const pizzaExists = pizza && pizza.toppings;
        const toppings = pizzaExists ? pizza.toppings.map(({ id }) => id) : [];

        this.store.dispatch(new fromStore.selectToppings(toppings));
      }),
    );
    this.toppings$ = this.store.select(fromStore.getAllToppings);
    this.visualize$ = this.store.select(fromStore.getVisulalizePizza);
  }

  onSelect(event: number[]) {
    this.store.dispatch(new fromStore.selectToppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new fromStore.createPizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new fromStore.updatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');

    if (remove) {
      this.store.dispatch(new fromStore.removePizza(event));
    }
  }
}
