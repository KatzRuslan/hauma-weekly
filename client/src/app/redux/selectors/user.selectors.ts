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
    console.log(date.valueOf());
    // console.log(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
    console.log(new Date(utc).valueOf());
    console.log();
    console.log();
    console.log();
    return {
        Authorization: token,
        Simple: token ? '' : 'true',
        SimpleDate: token ? '' : `${utc}`
    };
});
