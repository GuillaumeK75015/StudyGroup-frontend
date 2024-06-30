import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Event, EventCreateInput } from "../data/event";
import { Observable } from "rxjs";
import { environement } from "../../environements/environement";

@Injectable()
export class EventService {
  private eventsURL = `${environement.apiUrl}v1/events`;

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
      let params = new HttpParams().set('sort', 'dateTime,asc');
      return this.http.get<Event[]>(this.eventsURL, { params });
    }

  createEvent(eventRequestBody: EventCreateInput): Observable<Event> {
    console.log("Sending request to create event:", eventRequestBody);
    return this.http.post<Event>(this.eventsURL, eventRequestBody);
  }

  searchEvents(title: string, categoryId: string, location: string, content: string): Observable<Event[]> {
      let params = new HttpParams();
      if (title) params = params.set('title', title);
      if (categoryId) params = params.set('categoryId', categoryId);
      if (location) params = params.set('location', location);
      if (content) params = params.set('content', content);
      params = params.set('sort', 'dateTime,asc'); // Ensure sorting in search as well
      return this.http.get<Event[]>(this.eventsURL+ '/search', { params });
    }

  // Get an event by ID
  getEventById(id: string): Observable<Event> {
    console.log("Fetching event with ID:", id);
    return this.http.get<Event>(`${this.eventsURL}/${id}`);
  }

  // Add a participant to an event
  addParticipant(id: string, participant: string): Observable<Event> {
    return this.http.post<Event>(`${this.eventsURL}/${id}/participants`, null, { params: new HttpParams().set('participant', participant) });
  }

  // Remove a participant from an event
  removeParticipant(id: string, participant: string): Observable<Event> {
    return this.http.delete<Event>(`${this.eventsURL}/${id}/participants`, { params: new HttpParams().set('participant', participant) });
  }

  // Update an event
  updateEvent(id: string, eventData: { title: string; location: string; dateTime: string; content: string; categoryId: string; lastModifiedBy: string }): Observable<Event> {
    return this.http.put<Event>(`${this.eventsURL}/${id}`, eventData);
  }

  // Delete an event
  deleteEvent(id: string): Observable<void> {
    console.log("Deleting event with ID:", id);
    return this.http.delete<void>(`${this.eventsURL}/${id}`);
  }

  // Add a rating and review to an event
  addRatingReview(eventId: string, ratingReviewData: { rating: number; review: string; reviewerName: string }): Observable<Event> {
      console.log("Sending rating review request:", ratingReviewData); // Log the request body
      return this.http.post<Event>(`${this.eventsURL}/${eventId}/rating-review`, ratingReviewData);
  }


}
