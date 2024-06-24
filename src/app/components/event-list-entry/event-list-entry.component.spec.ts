import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListEntryComponent } from './event-list-entry.component';

describe('EventListEntryComponent', () => {
  let component: EventListEntryComponent;
  let fixture: ComponentFixture<EventListEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventListEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
