import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';

// IMPORT HTTP CLIENT MODULE
import { HttpClientModule } from '@angular/common/http';
// IMPORT FORMS MODULE FOR WORKING WITH FORM INPUT
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // USE HTTP CLIENT MODULE
    HttpClientModule,
    // USE FORMS MODULE
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
