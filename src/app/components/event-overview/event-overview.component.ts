import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../service/event.service';
import { CategoryService } from '../../service/category.service';
import { Event } from '../../data/event';
import { Category } from '../../data/category';

@Component({
  selector: 'app-event-overview',
  templateUrl: './event-overview.component.html',
  styleUrls: ['./event-overview.component.css']
})
export class EventOverviewComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  categories: Category[] = [];
  filterForm: FormGroup;
  showPastEvents = true;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private categoryService: CategoryService
  ) {
    this.filterForm = this.fb.group({
      title: [''],
      categoryId: [''],
      location: [''],
      content: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadEvents();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.filterEvents();
    });
  }

  onSubmit(): void {
    const { title, categoryId, location, content } = this.filterForm.value;
    this.eventService.searchEvents(title, categoryId, location, content).subscribe(events => {
      this.events = events;
      this.filterEvents();
    });
  }

  toggleShowPastEvents(): void {
    this.showPastEvents = !this.showPastEvents;
    this.filterEvents();
  }

  filterEvents(): void {
    const now = new Date();
    this.filteredEvents = this.events.filter(event => {
      const isPastEvent = new Date(event.dateTime) < now;
      return this.showPastEvents || !isPastEvent;
    });
  }
}
