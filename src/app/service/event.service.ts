import { Injectable } from "@angular/core";
import { HttpClient, HttpParams  } from "@angular/common/http";

import { Event, EventCreateInput } from "../data/event";
import { Observable } from "rxjs";
import { environement } from "../../environements/environement";

@Injectable()
export class EventService {
    private eventsURL = `${environement.apiUrl}v1/events`

    constructor(private http: HttpClient) { }

    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(this.eventsURL);
    }

    createEvent(eventRequestBody: EventCreateInput): Observable<Event[]> {
        return this.http.post<Event[]>(this.eventsURL, eventRequestBody);
    }

   searchEvents(title?: string, categoryId?: string, location?: string): Observable<Event[]> {
          let params = new HttpParams();
          if (title) params = params.set('title', title);
          if (categoryId) params = params.set('categoryId', categoryId);
          if (location) params = params.set('location', location);

          return this.http.get<Event[]>(`${this.eventsURL}/search`, { params });
      }
}
