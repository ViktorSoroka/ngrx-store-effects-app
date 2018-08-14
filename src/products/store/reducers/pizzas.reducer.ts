import { Pizza } from '../../models/pizza.model';
import * as fromPizzas from '../actions/pizzas.action';

export interface PizzasState {
  entities: { [id: string]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzasState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(state = initialState, action: fromPizzas.PizzasAction): PizzasState {
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      const data = action.payload;

      const entities = data.reduce((acc: { [id: string]: Pizza }, pizza: Pizza) => {
        return {
          ...acc,
          [pizza.id]: pizza
        };
      }, {});

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }
  }

  return state;
}

export const getPizzasLoading = (state: PizzasState) => state.loading;
export const getPizzasLoaded = (state: PizzasState) => state.loaded;
export const getPizzasEntities = (state: PizzasState) => state.entities;
