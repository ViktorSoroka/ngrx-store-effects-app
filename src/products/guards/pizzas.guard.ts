import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, filter, first, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromStore from '../store';

@Injectable()
export class PizzasGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkPizzas().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false)),
    );
  }

  checkPizzas(): Observable<boolean> {
    return this.store.select(fromStore.getPizzasLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.loadPizzas());
        }
      }),
      filter(loaded => loaded),
      first()
    );
  }
}
