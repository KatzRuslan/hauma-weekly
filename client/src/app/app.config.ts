import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
//
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
//
import { reducers } from '@redux/reducers';
import { effects } from '@redux/effects';
//
import { routes } from './app.routes';
import { ConfigService } from '@services/config.service';
import { InterceptorService } from '@services/interceptor.service';
import { ConfirmationService } from 'primeng/api';

const appInitializer = (configService: ConfigService) => {
    return () => configService.load();
}

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
        importProvidersFrom(
            BrowserAnimationsModule,
            HttpClientModule,
            StoreModule.forRoot(reducers),
            EffectsModule.forRoot(effects),
            StoreDevtoolsModule.instrument({ maxAge: 50 }),
        ),
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializer,
            deps: [ConfigService],
            multi: true
        },
        provideRouter(routes),
        ConfirmationService,
    ]
};
