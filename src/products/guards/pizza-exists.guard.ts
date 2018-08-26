import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, filter, first, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromStore from '../store';

@Injectable()
export class PizzaExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkPizzas().pipe(
      switchMap(() => {
        const id = route.params.pizzaId;

        return this.store.select(fromStore.getPizzasEntities).pipe(
          map(entities => Boolean(entities[id])),
          first()
        );
      }),
      catchError(() => of(false)),
    );
  }

  checkPizzas(): Observable<boolean> {
    return this.store.select(fromStore.getPizzasLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadPizzas());
        }
      }),
      filter(loaded => loaded),
      first()
    );
  }
}
