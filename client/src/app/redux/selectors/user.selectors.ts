import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey } from '@reducers/user.reducer';
import { IState } from '@shared/interfaces/user.interfaces';

export const selectFeature = createFeatureSelector<IState>(featureKey);
//
export const getUserFullname = createSelector(
    selectFeature, (state): string => `${state?.fullname ?? ''}`
);
export const getToken = createSelector(
    selectFeature, (state): string => `${state?.token ?? ''}`
);
export const getInterceptorHeaders = createSelector(getToken, (token) => {
    const date = new Date();
    const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
    return {
        Authorization: token,
        Simple: token ? '' : 'true',
        SimpleDate: token ? '' : `${utc}`
    };
});
export const isAdmin = createSelector(
    selectFeature, (state): boolean => state?.role === 'admin'
);
