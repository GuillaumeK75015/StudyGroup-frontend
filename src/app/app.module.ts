import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { EventOverviewComponent } from './components/event-overview/event-overview.component';
import { EventListEntryComponent } from './components/event-list-entry/event-list-entry.component';
import { EventNewFormComponent } from './components/event-new-form/event-new-form.component';

import { EventService } from './service/event.service';
import { CategoryService } from './service/category.service';
import { EventDetailsComponent } from './components/event-details/event-details.component'; // Ensure correct path

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    EventOverviewComponent,
    EventListEntryComponent,
    EventNewFormComponent,
    EventDetailsComponent // Add EventDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    EventService,
    CategoryService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
