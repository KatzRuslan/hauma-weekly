import { createActionGroup, emptyProps, props } from '@ngrx/store';
export const SessionsActions = createActionGroup({
    source: 'Sessions',
    events: {
        'Empty Sessions Event': emptyProps(),
        'Sign In': props(),
        'Sign In Success': props(),
        'Sign Out': emptyProps()
    }
});
//# sourceMappingURL=sessions.actions.js.map