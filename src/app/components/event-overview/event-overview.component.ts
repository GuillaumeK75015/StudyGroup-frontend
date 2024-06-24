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
  categories: Category[] = [];
  filterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private categoryService: CategoryService
  ) {
    this.filterForm = this.fb.group({
      title: [''],
      categoryId: [''],
      location: ['']
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
    });
  }

  onSubmit(): void {
    const { title, categoryId, location } = this.filterForm.value;
    this.eventService.searchEvents(title, categoryId, location).subscribe(events => {
      this.events = events;
    });
  }
}
