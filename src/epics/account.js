import { ofType } from 'redux-observable';
import { mapTo } from 'rxjs/operators';

export const createAccount = (action$, state$, { getJSON }) => action$.pipe(
  ofType('CREATE_ACCOUNT'),
  mapTo({ type: 'DONE' })
);
