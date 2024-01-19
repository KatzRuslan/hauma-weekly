import { ActionReducerMap } from '@ngrx/store';
import { featureKey as featuresFeatureKey, reducer as featuresReducer } from './reducers/features.reducer';
import { featureKey as userFeatureKey, reducer as userReducer } from './reducers/user.reducer';
import { AppState } from '@interfaces/app.interfaces';

export const reducers: ActionReducerMap<AppState> = {
    [featuresFeatureKey]: featuresReducer,
    [userFeatureKey]: userReducer,
};
