import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';

export interface ProductsState {
  pizzas: fromPizzas.PizzasState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer,
};

export const getProductsState = createFeatureSelector<ProductsState>('products');

export const getPizzasState = createSelector(
  getProductsState,
  (state: ProductsState) => state.pizzas
);

export const getPizzasEntities = createSelector(getPizzasState, fromPizzas.getPizzasEntities);
export const getPizzas = createSelector(getPizzasEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});
export const getPizzasLoading = createSelector(getPizzasState, fromPizzas.getPizzasLoading);
export const getPizzasLoaded = createSelector(getPizzasState, fromPizzas.getPizzasLoaded);
