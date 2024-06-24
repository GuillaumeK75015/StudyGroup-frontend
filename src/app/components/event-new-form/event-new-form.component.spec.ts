import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventNewFormComponent } from './event-new-form.component';

describe('EventNewFormComponent', () => {
  let component: EventNewFormComponent;
  let fixture: ComponentFixture<EventNewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventNewFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventNewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
