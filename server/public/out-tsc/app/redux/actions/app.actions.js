import { createActionGroup, emptyProps, props } from '@ngrx/store';
export const AppActions = createActionGroup({
    source: 'App',
    events: {
        'Empty App Event': emptyProps(),
        'Show Confirm Dialog': props(),
    }
});
//# sourceMappingURL=app.actions.js.map