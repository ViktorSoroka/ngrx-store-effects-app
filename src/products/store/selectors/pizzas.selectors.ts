import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';
import * as fromToppings from '../selectors/toppings.selectors';
import { Pizza } from '../../models/pizza.model';

export const getPizzasState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.pizzas,
);

export const getPizzasEntities = createSelector(getPizzasState, fromPizzas.getPizzasEntities);

export const getSelectedPizza = createSelector(
  getPizzasEntities,
  fromRoot.getRouterState,
  (entities, router): Pizza => {
    return router.state && entities[router.state.params.pizzaId];
  },
);

export const getPizzas = createSelector(getPizzasEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getVisualisePizza = createSelector(
  getSelectedPizza,
  fromToppings.getToppingEntities,
  fromToppings.getSelectedToppings,
  (pizza, allToppings, selectedToppings): Pizza => {
    const toppings = selectedToppings.map(id => allToppings[id]);

    return {
      ...pizza,
      toppings,
    };
  },
);

export const getPizzasLoading = createSelector(getPizzasState, fromPizzas.getPizzasLoading);

export const getPizzasLoaded = createSelector(getPizzasState, fromPizzas.getPizzasLoaded);
