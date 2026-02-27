import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventReadMoreComponent } from './event-read-more.component';

describe('EventReadMoreComponent', () => {
  let component: EventReadMoreComponent;
  let fixture: ComponentFixture<EventReadMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventReadMoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventReadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
