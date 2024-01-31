import { createActionGroup, emptyProps, props } from '@ngrx/store';
export const ArticleActions = createActionGroup({
    source: 'Article',
    events: {
        'Empty Article Event': emptyProps(),
        'Get Authors': emptyProps(),
        'Get Authors Success': props(),
        'Add Author': props(),
        'Add Author Success': props(),
        //
        'Get Categories': emptyProps(),
        'Get Categories Success': props(),
        'Add Category': props(),
        'Add Category Success': props(),
        //
        'Get Article Types': emptyProps(),
        'Get Article Types Success': props(),
        'Add Article Type': props(),
        'Add Article Type Success': props(),
        //
        'Get Articles': emptyProps(),
        'Get Articles Success': props(),
        'Add Article': props(),
        'Add Article Success': props(),
        'Add Parsed Articles': props(),
        'Add Parsed Articles Success': props(),
        'Update Article': props(),
        'Update Article Success': props(),
        'Remove Article': props(),
        'Remove Article Success': props(),
        'Download Articles': emptyProps(),
        'Get Articles From Excel': props(),
        'Get Articles From Excel Success': props(),
        //
        'Get Tags': emptyProps(),
        'Get Tags Success': props(),
        'Add Tag': props(),
        'Add Tag Success': props(),
        //
        'Get Sources': emptyProps(),
        'Get Sources Success': props(),
        'Add Source': props(),
        'Add Source Success': props(),
    }
});
//# sourceMappingURL=article.actions.js.map