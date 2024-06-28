import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../service/event.service';
import { CategoryService } from '../../service/category.service';
import { Event } from '../../data/event';
import { Category } from '../../data/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event?: Event;
  newParticipant: string = '';
  updateEventForm: FormGroup;
  ratingReviewForm: FormGroup;
  categories: Category[] = [];
  showUpdateForm: boolean = false;
  canModify: boolean = false;
  eventPassed: boolean = false;

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
    private route: ActivatedRoute,
    private eventService: EventService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.updateEventForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      dateTime: ['', Validators.required],
      content: ['', Validators.required],
      categoryId: ['', Validators.required],
      lastModifiedBy: ['', Validators.required]
    });

    this.ratingReviewForm = this.fb.group({
      reviewerName: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      review: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getEventDetails();
    this.loadCategories();
  }

  getEventDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(id).subscribe(event => {
        this.event = event;
        const currentTime = new Date().getTime();
        this.eventPassed = new Date(event.dateTime).getTime() < currentTime;
        this.canModify = !this.eventPassed;
        this.updateEventForm.patchValue({
          title: event.title,
          location: event.location,
          dateTime: event.dateTime,
          content: event.content,
          categoryId: event.category.id,
          lastModifiedBy: ''
        });
      });
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    }, err => {
      console.error("Error loading categories", err);
    });
  }

  addParticipant(): void {
    if (this.newParticipant && this.event) {
      this.eventService.addParticipant(this.event.id, this.newParticipant).subscribe(updatedEvent => {
        this.event = updatedEvent;
        this.newParticipant = '';
      });
    }
  }

  removeParticipant(participant: string): void {
    if (this.event) {
      this.eventService.removeParticipant(this.event.id, participant).subscribe(updatedEvent => {
        this.event = updatedEvent;
      });
    }
  }

  deleteEvent(): void {
    if (this.event) {
      if (this.eventPassed) {
        this.Toast.fire({
          icon: "error",
          title: "Cannot delete an event that has already passed."
        });
        return;
      }
      if (confirm("Are you sure you want to delete this event?")) {
        this.eventService.deleteEvent(this.event.id).subscribe({
          next: () => {
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error("Error deleting event", err);
            this.Toast.fire({
              icon: "error",
              title: "An error occurred. Please try again."
            });
          }
        });
      }
    }
  }

  onUpdateSubmit(): void {
    if (this.updateEventForm.valid && this.event) {
      if (this.eventPassed) {
        this.Toast.fire({
          icon: "error",
          title: "Cannot update an event that has already passed."
        });
        return;
      }
      const { title, location, dateTime, content, categoryId, lastModifiedBy } = this.updateEventForm.value;
      this.eventService.updateEvent(this.event.id, { title, location, dateTime, content, categoryId, lastModifiedBy }).subscribe({
        next: (updatedEvent) => {
          this.event = updatedEvent;
          this.Toast.fire({
            icon: "success",
            title: "Event updated successfully"
          });
        },
        error: (err) => {
          console.error("Error updating event", err);
          this.Toast.fire({
            icon: "error",
            title: "An error occurred. Please try again."
          });
        }
      });
    }
  }

  onRatingReviewSubmit(): void {
    if (this.ratingReviewForm.valid && this.event) {
      const { rating, review, reviewerName } = this.ratingReviewForm.value;
      this.eventService.addRatingReview(this.event.id, { rating, review, reviewerName }).subscribe({
        next: (updatedEvent) => {
          this.event = updatedEvent;
          this.Toast.fire({
            icon: "success",
            title: "Review submitted successfully"
          });
        },
        error: (err) => {
          console.error("Error submitting review", err);
          this.Toast.fire({
            icon: "error",
            title: "An error occurred. Please try again."
          });
        }
      });
    }
  }


  toggleUpdateForm(): void {
    this.showUpdateForm = !this.showUpdateForm;
  }
}
