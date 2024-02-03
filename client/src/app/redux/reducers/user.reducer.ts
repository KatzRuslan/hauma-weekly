import { createReducer, on } from '@ngrx/store';
import { adapter } from './../adapter';
import { SessionsActions } from '@actions/sessions.actions';
import { IState } from '@shared/interfaces/user.interfaces';

export const featureKey = 'user';
export const initialState: IState = null as unknown as IState;
export const reducer = createReducer(
    initialState,
    on(SessionsActions.signInSuccess, (state, { id, fullname, token, role }) => ({ ...state, ...{ id, fullname, token, role }})),
    on(SessionsActions.signOut, () => null as unknown as IState),
)