import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { FooterComponent } from './components/footer/footer.component';

import { BsModalService } from "ngx-bootstrap/modal";
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


import { NgxPayPalModule } from 'ngx-paypal';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import {TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { provideTranslateService } from '@ngx-translate/core';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FooterComponent,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule, // for firestore
    NgxPayPalModule,
    HttpClientModule,
     TranslateModule.forRoot() // ✅ REQUIRED

  ],
  providers: [BsModalService,

    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'fr'
    })
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
