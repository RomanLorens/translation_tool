import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';


import { AppComponent } from './app.component';
import { ListTranslationsComponent } from './translations/list-translations/list-translations.component';
import { TranslationsService } from './translations/translations.service';

const appRoutes: Routes = [
  { path: 'list',    component: ListTranslationsComponent },
  
];

@NgModule({
  declarations: [
    AppComponent,
    ListTranslationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    HttpModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [TranslationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
