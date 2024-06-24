import { Component, Input } from '@angular/core';
import { Event } from '../../data/event';

@Component({
  selector: 'app-event-list-entry',
  templateUrl: './event-list-entry.component.html',
  styleUrls: ['./event-list-entry.component.css']
})

export class EventListEntryComponent  {
  @Input()
  event!:Event;
}
