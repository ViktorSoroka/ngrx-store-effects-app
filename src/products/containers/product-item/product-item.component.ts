import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as fromStore from '../../store';
import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';

@Component({
  selector: 'product-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['product-item.component.scss'],
  templateUrl: 'product-item.component.html',
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;
  visualise$: Observable<Pizza>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.pizza$ = this.store.select(fromStore.getSelectedPizza).pipe(
      tap((pizza: Pizza = null) => {
        const pizzaExists = pizza && pizza.toppings;
        const toppings = pizzaExists ? pizza.toppings.map(({ id }) => id) : [];

        this.store.dispatch(new fromStore.SelectToppings(toppings));
      }),
    );
    this.toppings$ = this.store.select(fromStore.getAllToppings);
    this.visualise$ = this.store.select(fromStore.getVisualisePizza);
  }

  onSelect(event: number[]) {
    this.store.dispatch(new fromStore.SelectToppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new fromStore.CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new fromStore.UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');

    if (remove) {
      this.store.dispatch(new fromStore.RemovePizza(event));
    }
  }
}
