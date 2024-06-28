import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../data/event';

@Component({
  selector: 'app-event-list-entry',
  templateUrl: './event-list-entry.component.html',
  styleUrls: ['./event-list-entry.component.css']
})
export class EventListEntryComponent {
  @Input() event!: Event;

  constructor(private router: Router) {}

  navigateToEventDetails(): void {
    this.router.navigate(['/event-details', this.event.id]);
  }
}
