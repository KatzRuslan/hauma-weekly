import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey } from "../reducers/user.reducer";
export const selectFeature = createFeatureSelector(featureKey);
//
export const getUserFullname = createSelector(selectFeature, (state) => `${state?.fullname ?? ''}`);
export const getToken = createSelector(selectFeature, (state) => `${state?.token ?? ''}`);
export const getInterceptorHeaders = createSelector(getToken, (token) => {
    const date = new Date();
    const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
    return {
        Authorization: token,
        Simple: token ? '' : 'true',
        SimpleDate: token ? '' : `${utc}`
    };
});
//# sourceMappingURL=user.selectors.js.map