import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICompleteRegistration, ICredential, IRegistration } from '@shared/interfaces/user.interfaces';

export const SessionsActions = createActionGroup({
    source: 'Sessions',
    events: {
        'Empty Sessions Event': emptyProps(),
        'Sign In': props<{ credentials: ICredential; callback: (error?: any) => void }>(),
        'Sign In Success': props<{ id: string; fullname: string; token: string; role: string }>(),
        'Sign Out': emptyProps(),
        'Registration': props<IRegistration>(),
        'CompleteRegistration': props<ICompleteRegistration>()
    }
});
