import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { EventOverviewComponent } from './components/event-overview/event-overview.component';
import { EventListEntryComponent } from './components/event-list-entry/event-list-entry.component';
import { EventNewFormComponent } from './components/event-new-form/event-new-form.component';
import { RegisterComponent } from './components/register/register.component';

import { EventService } from './service/event.service';
import { CategoryService } from './service/category.service';
import { UserService } from './service/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    EventOverviewComponent,
    EventListEntryComponent,
    EventNewFormComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, // Ensure this is imported
    RouterModule // Ensure this is imported
  ],
  providers: [
    EventService,
    CategoryService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
