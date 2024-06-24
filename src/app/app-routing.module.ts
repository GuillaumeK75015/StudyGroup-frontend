import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventOverviewComponent } from './components/event-overview/event-overview.component';
import { EventNewFormComponent } from './components/event-new-form/event-new-form.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'home', component: EventOverviewComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'add-event', component: EventNewFormComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
