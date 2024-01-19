import { IState as IFeaturesState } from './features.interfaces';
import { featureKey as featuresFeatureKey } from '@reducers/features.reducer';
import { IState as IUserState } from './user.interfaces';
import { featureKey as userFeatureKey } from '@reducers/user.reducer';

export interface AppState {
    [featuresFeatureKey]: IFeaturesState;
    [userFeatureKey]: IUserState;
};
export interface IConfirmDialog {
    header: string;
    message: string;
    accept?: {
        label?: string;
        action?: (...args: any) => void;
    };
    reject?: {
        label?: string;
        action?: (...args: any) => void;
    };
}