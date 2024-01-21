import { featureKey as featuresFeatureKey, reducer as featuresReducer } from './reducers/features.reducer';
import { featureKey as userFeatureKey, reducer as userReducer } from './reducers/user.reducer';
export const reducers = {
    [featuresFeatureKey]: featuresReducer,
    [userFeatureKey]: userReducer,
};
//# sourceMappingURL=reducers.js.map