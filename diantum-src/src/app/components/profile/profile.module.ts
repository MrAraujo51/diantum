import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateLoader, TranslateStaticLoader, MissingTranslationHandler } from 'ng2-translate';

import { ProfileComponent } from './profile.component'
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { ProfileResolver } from './profile-resolver.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeysPipe } from './keys.pipe';
import { AuthGuard } from 'app/guards/auth.guard';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { Http } from '@angular/http';

const profileRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
        title: 'Diantum - Mi area'
    },
    resolve: {
      profile: ProfileResolver
    },
    children: [
      {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'user',
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      }
    ]
  }
]);

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    profileRouting,
    DynamicFormModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
  ],
  declarations: [
    ProfileComponent,
    UserComponent,
    AdminComponent,
    ClientComponent,
    KeysPipe
  ],
  providers: [
    ProfileResolver
  ]
})
export class ProfileModule { }
