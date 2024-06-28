import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { CategoryService } from '../../services/category.service';
import { EventCreateInput } from '../../data/event';

@Component({
  selector: 'app-event-new-form',
  templateUrl: './event-new-form.component.html',
  styleUrls: ['./event-new-form.component.css']
})
export class EventNewFormComponent implements OnInit {
  addEventForm: FormGroup;
  users = [];
  categories = [];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private categoryService: CategoryService,
    private userService: UserService
  ) {
    this.addEventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      categoryId: ['', Validators.required],
      location: ['', Validators.required],
      dateTime: ['', Validators.required],
      content: ['', [Validators.required, Validators.maxLength(2500)]],
      eventCreator: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  l

  onSubmit() {
    if (this.addEventForm.valid) {
      const eventInput: EventCreateInput = this.addEventForm.value;
      this.eventService.createEvent(eventInput).subscribe(response => {
        console.log('Event created successfully', response);
      });
    }
  }
}
