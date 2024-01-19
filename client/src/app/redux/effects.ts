import { AppEffects } from './effects/app.effects';
import { SessionsEffects } from '@effects/sessions.effects';
import { ArticlesEffects } from './effects/articles.effects';

export const effects = [AppEffects, ArticlesEffects, SessionsEffects];
