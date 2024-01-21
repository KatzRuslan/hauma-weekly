import { createReducer, on } from '@ngrx/store';
import { SessionsActions } from "../actions/sessions.actions";
export const featureKey = 'user';
export const initialState = null;
export const reducer = createReducer(initialState, on(SessionsActions.signInSuccess, (state, { id, fullname, token }) => ({ ...state, ...{ id, fullname, token } })), on(SessionsActions.signOut, () => null));
//# sourceMappingURL=user.reducer.js.map