import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { EventService } from '../../service/event.service';
import { Category } from '../../data/category';
import { EventCreateInput } from '../../data/event';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-event-new-form',
  templateUrl: './event-new-form.component.html',
  styleUrls: ['./event-new-form.component.css']
})
export class EventNewFormComponent implements OnInit {
  categories: Category[] = [];
  add_event_form: FormGroup;

  Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private eventService: EventService,
    private router: Router
  ) {
    this.add_event_form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      categoryId: ['', Validators.required],
      dateTime: ['', Validators.required],
      location: ['', Validators.required],
      content: ['', [Validators.required, Validators.maxLength(2500)]],
      creatorName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  get title() {
    return this.add_event_form.controls['title'];
  }

  get categoryId() {
    return this.add_event_form.controls['categoryId'];
  }

  get dateTime() {
    return this.add_event_form.controls['dateTime'];
  }

  get location() {
    return this.add_event_form.controls['location'];
  }

  get content() {
    return this.add_event_form.controls['content'];
  }

  get creatorName() {
    return this.add_event_form.controls['creatorName'];
  }

  onSubmit(): void {
      if (this.add_event_form.valid) {
          const eventInput: EventCreateInput = this.add_event_form.value;

          // Check if the event date is in the past
          const eventDate = new Date(eventInput.dateTime);
          const currentDate = new Date();
          if (eventDate < currentDate) {
              this.Toast.fire({
                  icon: "error",
                  title: "Cannot create an event with a past date."
              });
              return;
          }

          const observer: Observer<any> = {
              next: (response) => {
                  console.log("Form submitted successfully!", response);
                  this.Toast.fire({
                      icon: "success",
                      title: "Event submitted successfully"
                  });
                  this.router.navigate(['/']);
              },
              error: (err) => {
                  console.error("Error submitting form", err);
                  if (err.status === 400) {
                      this.Toast.fire({
                          icon: "error",
                          title: err.error.message || "Cannot create an event with a past date."
                      });
                  } else {
                      this.Toast.fire({
                          icon: "error",
                          title: "An error occurred. Please try again."
                      });
                  }
              },
              complete: () => {}
          };
          this.eventService.createEvent(eventInput).subscribe(observer);
      } else {
          this.Toast.fire({
              icon: "error",
              title: "Please review your event"
          });
      }
  }

   }
