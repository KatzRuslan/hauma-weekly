import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IConfirmDialog } from '@shared/interfaces/app.interfaces';

export const AppActions = createActionGroup({
    source: 'App',
    events: {
        'Empty App Event': emptyProps(),
        'Show Confirm Dialog': props<IConfirmDialog>(),
    }
});