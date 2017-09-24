import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';


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
  ],
  providers: [TranslationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
