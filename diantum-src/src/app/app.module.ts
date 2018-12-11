/*
 * @Author: Manuel Araujo
 * @Date: 2017-07-02 13:48:24
 * @Last Modified time: 2017-07-02 13:48:24
 */
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule, Http} from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader, MissingTranslationHandler } from 'ng2-translate';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';

// Servicios
import { ValidateService } from './service/validate.service';
import { AuthService } from './service/auth.service';
import { InstanceService } from './service/instance.service';
import { ProductService } from './service/product.service';
import { ClientService } from './service/client.service';
import { LeadService } from './service/lead.service';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

// Rutas
import { DIAN_ROUTING } from './app.routes';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';

import { ProfileModule } from './components/profile/profile.module';
import { CandiesGameModule } from 'app/components/candies-game/candies-game.module';
import { SalesCyclumModule } from './components/sales-cyclum/sales-cyclum.module';
import { TeamTunningModule } from './components/team-tunning/team-tunning.module';
import { DynamicFormModule } from './components/dynamic-form/dynamic-form.module'


import { ProductComponent } from './components/product/product.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppearDirective } from './directives/appear.directive';
import { TeamTunningComponent } from './components/team-tunning/team-tunning.component';


export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

export class CustomOption extends ToastOptions {
  positionClass: 'toast-bottom-center'
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    SigninComponent,
    ProductComponent,
    NavbarComponent,
    AppearDirective,
    TeamTunningComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DIAN_ROUTING,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    NgbModule.forRoot(),
    ChartsModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    ProfileModule,
    CandiesGameModule,
    SalesCyclumModule,
    TeamTunningModule,
    DynamicFormModule
  ],
  providers: [
    Title,
    ValidateService,
    AuthService,
    ProductService,
    InstanceService,
    ClientService,
    AuthGuard,
    NotAuthGuard,
    LeadService,
    {provide: ToastOptions, useClass: CustomOption},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
